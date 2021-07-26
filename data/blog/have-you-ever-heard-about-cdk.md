---
title: Have you ever heard about CDK?
date: '2021-07-26'
tags: ['aws', 'cdk', 'ec2', 'alb', 'asg', 'typescript', 'iac']
draft: false
summary: AWS Cloud Development Kit (CDK) lets you define your cloud infrastructure as code in one of five supported languages. The CDK allows you to use your expertise in programming languages to create code infrastructure by provisioning resources using AWS CloudFormation. Let's build a superpower EC2 Construct.
layout: PostLayout
authors: ['default']
---

Have you heard about Cloud Development Kit or CDK? [Yes, No]

The AWS Cloud Development Kit (CDK), lets you define your cloud infrastructure as code in one of five supported programming languages. It is intended for moderately to highly experienced AWS users.

In this blog post, you will see how to create your CDK Construct and why you should do that.

For using CDK, we should know first what is Infrastructure as Code (IaC). If you never heard about it before, I will leave here some documentation ([https://containersonaws.com/introduction/infrastructure-as-code/#:~:text=) Infrastructure](https://containersonaws.com/introduction/infrastructure-as-code/#:~:text=Infrastructure)) that provides more information about the concepts behind it. To summarize, IaC manages infrastructure (Machine, Load Balancers, Network, Services) using configuration files. So basically, instead of going to the console and creating all the resources that your application requires, we can write few lines of code, and it will provide everything for us.

You're probably wondering, but this is nothing new. There are tools like Terraform, Cloud Formation, Ansible or even bash script to do this simply and clearly. And yes, you are right, and they play their role very well. The only difference between them and the CDK is that the CDK allows you to use your expertise in programming languages to create code infrastructure by provisioning resources using AWS CloudFormation. AWS CDK supports (TypeScript, JavaScript, Python, Java, C#/.Net, and Go). In addition, developers can use one of the supported programming languages to define reusable cloud components known as Constructs, and today we are going to build a superpower EC2 Construct.

Let's code!

First of all, we need to set up our environment. In my case, I will use a docker image using the same principles from [3Musketeers](https://3musketeers.io/) (if you don't know what's, I will recommend you to have a look, it is pretty nice 😉).

Dockerfile

```docker
ARG AWS_CDK_VERSION=1.111.0

FROM node:12-alpine

RUN apk -v --no-cache --update add \
    python3 \
    ca-certificates \
    groff \
    less \
    bash \
    make \
    curl \
    wget \
    zip \
    git \
    && \
    update-ca-certificates && \
    pip3 install awscli && \
    npm install -g aws-cdk@${AWS_CDK_VERSION} && \
    rm -rf /var/cache/apk/*

WORKDIR /work

CMD ["cdk"]
```

Let's build the image:

```bash
$ docker build -t my-cdk-image:1.11.0 .
```

Now, let's get into the docker container. As the Docker is stateless, we are going to share our folder using volumes:

```bash
$ docker run --rm -it -v $(pwd):/work my-cdk-image:1.11.0 bash
```

Create the CDK project

1. First let’s create a project folder called cdk-ec2-construct:

   ```bash
   $ mkdir cdk-ec2-construct
   $ cd cdk-ec2-construct
   ```

2. Now create your CDK application:

   ```bash
   $ cdk init app --language=typescript
   Applying project template app for typescript
   # Welcome to your CDK TypeScript project!

   This is a blank project for TypeScript development with CDK.

   The `cdk.json` file tells the CDK Toolkit how to execute your app.

   ## Useful commands

    * `npm run build`   compile typescript to js
    * `npm run watch`   watch for changes and compile
    * `npm run test`    perform the jest unit tests
    * `cdk deploy`      deploy this stack to your default AWS account/region
    * `cdk diff`        compare deployed stack with current state
    * `cdk synth`       emits the synthesized CloudFormation template

   Executing npm install...
   ✅ All done!
   ```

Exploring the files, we can see that the CLI has done a massive step for us, creating all the structure of folders and initial base files.

We will find our stack file in:

`/lib/cdk-ec2-construct-stack.ts`

And the main entrypoint of the application are in:

`/bin/cdk-ec2-construct.ts`

Let's start creating our Construct, aka module, which we will use within our Stack to make as much EC2 we want.

First, let's create our Construct file `/lib/cdk-ec2-construct.ts`:

```javascript
export class CdkEc2Construct extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your Construct goes here
  }
}
```

Now, as we are using Typescript, we are going to write down our interface to our props.

```javascript
interface ICdkEc2Props {
  VpcId: string
  ImageName: string
  CertificateArn: string
  InstanceType: string
  InstanceIAMRoleArn: string
  InstancePort: number
  HealthCheckPath: string
  HealthCheckPort: string
  HealthCheckHttpCodes: string
}
```

Getting some real data from our Account.

```javascript
// Get VPC
const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
  vpcId: props.VpcId,
})

// Get AMI
const ami = ec2.MachineImage.lookup({
  name: props.ImageName,
})
```

Creating the Load Balancer.

```javascript
// Create Load Balancer
this.loadBalancer = new elbv2.ApplicationLoadBalancer(this, `ApplicationLoadBalancerPublic`, {
  vpc,
  internetFacing: true
})

// Creating the listener
const httpsListener = this.loadBalancer.addListener('ALBListenerHttps', {
  certificates: elbv2.ListenerCertificate.fromArn(props.CertificateArn)),
  protocol: elbv2.ApplicationProtocol.HTTPS,
  port: 443
})
```

Creating the Auto Scaling Group.

```javascript
// Creating ASG
const autoScalingGroup = new autoscaling.AutoScalingGroup(this, 'AutoScalingGroup', {
  vpc, // VPC value that we got before.
  instanceType: new ec2.InstanceType(props.InstanceType),
  machineImage: ami, // Image value that we got before.
  allowAllOutbound: true,
  role: iam.Role.fromRoleArn(this, 'IamRoleEc2Instance', props.InstanceIAMRoleArn),
  healthCheck: autoscaling.HealthCheck.ec2(),
})
```

Including scripts in the user data:

```javascript
// Instaling the SSM Agent on the Machine.
autoScalingGroup.addUserData(
  'sudo yum install -y https://s3.region.amazonaws.com/amazon-ssm-region/latest/linux_amd64/amazon-ssm-agent.rpm'
)
autoScalingGroup.addUserData('sudo systemctl enable amazon-ssm-agent')
autoScalingGroup.addUserData('sudo systemctl start amazon-ssm-agent')
// Including a sample HTML page on our Apache server.
autoScalingGroup.addUserData('echo "Hello Wolrd" > /var/www/html/index.html')
```

Now that we have almost everything in place, we need to create the connection between our Load Balancer and our Auto Scaling group, and we can do that by adding a Target Group to our Load Balancer.

```javascript
// Adding ASG with target
httpsListener.addTargets('TargetGroup', {
  port: props.InstancePort,
  protocol: elbv2.ApplicationProtocol.HTTP,
  targets: [autoScalingGroup], //Reference of our Austo Scaling group.
  healthCheck: {
    path: props.HealthCheckPath,
    port: props.HealthCheckPort,
    healthyHttpCodes: props.HealthCheckHttpCodes,
  },
})
```

Also, we will expose our Load Balancer as read-only, so we will be able to access it from our Stack.

```javascript
export class CdkEc2Construct extends cdk.Construct {
	readonly loadBalancer: elbv2.ApplicationLoadBalancer

  constructor(scope: cdk.Construct, id: string, props: ICdkEc2Props) {
	.
	.
	.
	}
}
```

Now, our construct should be look like this:

```javascript
import * as cdk from '@aws-cdk/core'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2'
import * as targets from '@aws-cdk/aws-elasticloadbalancingv2-targets'
import * as autoscaling from '@aws-cdk/aws-autoscaling'
import * as acm from '@aws-cdk/aws-certificatemanager'
import * as iam from '@aws-cdk/aws-iam'

interface ICdkEc2Props {
  VpcId: string
  ImageName: string
  CertificateArn: string
  InstanceType: string
  InstanceIAMRoleArn: string
  InstancePort: number
  HealthCheckPath: string
  HealthCheckPort: string
  HealthCheckHttpCodes: string
}

export class CdkEc2Construct extends cdk.Construct {
  readonly loadBalancer: elbv2.ApplicationLoadBalancer

  constructor(scope: cdk.Construct, id: string, props: ICdkEc2Props) {
    super(scope, id)

    // Get VPC
    const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
      vpcId: props.VpcId,
    })

    // Get AMI
    const ami = ec2.MachineImage.lookup({
      name: props.ImageName,
    })

    // Create Load Balancer
    this.loadBalancer = new elbv2.ApplicationLoadBalancer(this, `ApplicationLoadBalancerPublic`, {
      vpc,
      internetFacing: true,
    })

    // Creating the listener
    const httpsListener = this.loadBalancer.addListener('ALBListenerHttps', {
      certificates: elbv2.ListenerCertificate.fromArn(props.CertificateArn),
      protocol: elbv2.ApplicationProtocol.HTTPS,
      port: 443,
      sslPolicy: elbv2.SslPolicy.TLS12,
    })

    // Creating ASG
    const autoScalingGroup = new autoscaling.AutoScalingGroup(this, 'AutoScalingGroup', {
      vpc, // VPC value that we got before.
      instanceType: new ec2.InstanceType(props.InstanceType),
      machineImage: ami, // Image value that we got before.
      allowAllOutbound: true,
      role: iam.Role.fromRoleArn(this, 'IamRoleEc2Instance', props.InstanceIAMRoleArn),
      healthCheck: autoscaling.HealthCheck.ec2(),
    })

    // Instaling the SSM Agent on the Machine.
    autoScalingGroup.addUserData(
      'sudo yum install -y https://s3.region.amazonaws.com/amazon-ssm-region/latest/linux_amd64/amazon-ssm-agent.rpm'
    )
    autoScalingGroup.addUserData('sudo systemctl enable amazon-ssm-agent')
    autoScalingGroup.addUserData('sudo systemctl start amazon-ssm-agent')
    // Including a sample HTML page on our Apache server.
    autoScalingGroup.addUserData('echo "Hello Wolrd" > /var/www/html/index.html')

    // Grouping the ASG with target
    httpsListener.addTargets('TargetGroup', {
      port: props.InstancePort,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [autoScalingGroup], //Reference of our Auto Scaling group.
      healthCheck: {
        path: props.HealthCheckPath,
        port: props.HealthCheckPort,
        healthyHttpCodes: props.HealthCheckHttpCodes,
      },
    })
  }
}
```

We have built our construct, let’s create our Stack, for that, we will edit the file: `/lib/cdk-ec2-construct-stack.ts`

```javascript
import * as cdk from '@aws-cdk/core'
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';

import { CdkEc2Construct } from '../lib/cdk-ec2-construct.ts';

export class SampleAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id)

    const app = new CdkEc2Construct(this, 'EC2Test', {
      VpcId: "vpc-123456890123";
      ImageName: "Amazon 2 Linux";
      CertificateArn: "rn:aws:acm:us-east-1:123456789:certificate/be12312-ecad-3123-1231s-123ias9123";
      InstanceType: "t3.micro";
      InstanceIAMRoleArn: "arn:aws:iam::123456789:role/ec2-role";
      InstancePort: 80;
      HealthCheckPath: "/";
      HealthCheckPort: "80";
      HealthCheckHttpCodes: "200";
    })

    const route53_hosted_zone = route53.HostedZone.fromLookup(this, 'MyZone', {
      domainName: 'labs2.dnx.host'
    })

    new route53.ARecord(this, 'AliasRecord', {
      zone: route53_hosted_zone,
      target: route53.RecordTarget.fromAlias(new alias.LoadBalancerTarget(app.loadBalancer)),
      recordName: 'cdk.labs2.dnx.host'
    })

  }
}
```

We should be able to deploy our Stack. To do that, we will just need to run a simple command. After that, the framework will take care of everything for us, build the code, create a Cloud Formation file, deploy the Cloud Formation, and monitor it for us.

```bash
$ cdk deploy
```

If you already know Terraform or Cloud Formation, you may be wondering, but is it just that? Isn't it missing resources? Where are the Security Groups? Where are all the extra settings needed to deploy a framework like this?

So, this is the magic that the CDK brings to us. As there is a library behind all the methods and functions, it sees all the dependencies and automatically creates the missing resources for us, connecting them so that everything has a connection and with as little access as possible, leaving what is necessary for the correct functioning between the resources. An example of that is the instance's Security Group. As we marked that the EC2 instance listens on port 80, only port 80 will be added to the Security Group as an ingress value.

Thanks for reading it, if you have any question, please leave in the comments below.
