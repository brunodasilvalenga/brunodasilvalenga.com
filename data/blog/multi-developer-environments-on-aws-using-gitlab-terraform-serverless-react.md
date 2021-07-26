---
title: Multi developer environments on AWS using Gitlab + Terraform + Serverless + React
date: '2020-05-06'
tags: ['serverless', 'gitlab', 'terraform', 'react', 'aws']
draft: false
summary: 'How you can deploy your applications and separate them by developer using Terraform and Gitlab CI.'
---

# Multi developer environments on AWS using Gitlab + Terraform + Serverless + React

Photo by tian kuan on Unsplash

We are using Gitlab to deploy our applications directly to AWS through pipelines. If you never heard about Gitlab ([https://about.gitlab.com/stages-devops-lifecycle/](https://about.gitlab.com/stages-devops-lifecycle/)), please feel free to read the Gitlab’s white papers and understand more about the tools. Maybe you are wondering why we don’t use Github/Actions to deploy our applications, and I’ll answer you with a simple reason: Runners ([https://docs.gitlab.com/ee/ci/runners/](https://docs.gitlab.com/ee/ci/runners/)).

In this project, we used a front-end application based on React and deployed on CloudFront + S3. Also, a backend application based on the Serverless framework deployed on API Gateway. Both were simple applications that were consuming some 3rd party API and a database in Dynamo DB.

![](/static/images/blog/multi-developer-environments-on-aws-using-gitlab-terraform-serverless-react/1_pYbWbcDpvZ7Ezb6VvYMUQg.png)

Sometimes we would like to test some new feature that is being developed using our workspace the Development on AWS. It is very simple when we have a small team, and it is easy to do internal management, but sometimes we start to face some problems because another developer would like to test his new feature as well and this would cause confusion, as the second developer would need to merge/rebase the code and that would mean more time and nowadays time is money. 🤑

We can fix that problem creating a new workspace on AWS for each developer and we can share the resources between them or have one resource per developer, in this case, we will share the resources between the developer since we’re looking for cost optimisation as well.

Let’s look at some code. We’re using Terraform and a concept called workspaces if you never heard about that you may check our blog post talking about Terraform Workspaces.
[**Terraform Workspaces 101**
*The art of deploying the same stack multiple times without duplication*medium.com](https://medium.com/dnx-labs/terraform-workspaces-101-f8e1a5054547)

## Terraform — Deploy Infrastructure as Code (IaC)

### Frontend — Cloud Front + S3 Bucket

```
resource "aws_s3_bucket" "app" {
  bucket = "${var.org_name}-${local.workspace["app_app_name"]}-${local.workspace["environment_name"]}"
  acl    = "private"
}

module "app" {
  source = "git::https://github.com/DNXLabs/terraform-aws-static-app.git?ref=1.1.1"

  name            = "${local.workspace["app_app_name"]}"
  s3_bucket_id    = "${aws_s3_bucket.app.id}"
  hostnames       = ["${local.workspace["app_hostname"]}"]
  certificate_arn = "${data.aws_acm_certificate.domain_host_us.arn}"
  hosted_zone     = "${local.workspace["app_hosted_zone"]}"
}
```

### Backend — API Gateway

```
resource "aws_api_gateway_domain_name" "services_gateway" {
  domain_name              = "${local.workspace["services_gateway_hostname"]}"
  regional_certificate_arn = "${data.aws_acm_certificate.domain_host.arn}"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

data "aws_route53_zone" "services_selected" {
  name = "${local.workspace["services_gateway_hosted_zone"]}"
}

resource "aws_route53_record" "services_hostname" {
  count   = local.workspace["services_gateway_create_domain"] ? 1 : 0
  name    = "${aws_api_gateway_domain_name.services_gateway.domain_name}"
  type    = "A"
  zone_id = "${data.aws_route53_zone.services_selected.zone_id}"

  alias {
    evaluate_target_health = true
    name                   = "${aws_api_gateway_domain_name.services_gateway.regional_domain_name}"
    zone_id                = "${aws_api_gateway_domain_name.services_gateway.regional_zone_id}"
  }
}
```

### Variables

```
variable "aws_account_id" {}
variable "aws_role" {}

variable "org_name" {
  default = "example"
}

locals {
  env = {
    nonprod-ap-southeast-2-dev = {
      environment_name       = "dev"
      account_name           = "nonprod"
      ecs_platform_workspace = "nonprod-ap-southeast-2-dev"
      certificate_domain = "*.dev.cloud.example.com.au"
      hosted_zone        = "dev.cloud.example.com.au"

      #app
      app_app_name    = "app"
      app_hostname    = "app.dev.cloud.example.com.au"
      app_hosted_zone = "dev.cloud.example.com.au"

      #api-gateway
      api_gateway_hostname      = "api.dev.cloud.example.com.au"
      api_gateway_hosted_zone   = "dev.cloud.example.com.au"
      api_gateway_create_domain = true

      alarm_sns_topics = []
    }

    # dev:example-bruno-valenga (123041)
    # DEV01
    nonprod-ap-southeast-2-dev-123041 = {
      environment_name       = "dev"
      account_name           = "nonprod"
      ecs_platform_workspace = "nonprod-ap-southeast-2-dev"
      certificate_domain = "*.dev.cloud.example.com.au"
      hosted_zone        = "dev.cloud.example.com.au"

      #app
      app_app_name    = "app-123041"
      app_hostname    = "app-123041.dev.cloud.example.com.au"
      app_hosted_zone = "dev.cloud.example.com.au"

      #api-gateway
      api_gateway_hostname      = "api-123041.dev.cloud.example.com.au"
      api_gateway_hosted_zone   = "dev.cloud.example.com.au"
      api_gateway_create_domain = true

      alarm_sns_topics = []
    }

    # dev:example-homer-simpson (1235123)
    # DEV02
    nonprod-ap-southeast-2-dev-1235123 = {
      environment_name       = "dev"
      account_name           = "nonprod"
      ecs_platform_workspace = "nonprod-ap-southeast-2-dev"
      certificate_domain = "*.dev.cloud.example.com.au"
      hosted_zone        = "dev.cloud.example.com.au"

      #app
      app_app_name    = "app-1235123"
      app_hostname    = "app-1235123.dev.cloud.example.com.au"
      app_hosted_zone = "dev.cloud.example.com.au"

      #api-gateway
      api_gateway_hostname      = "api-1235123.dev.cloud.example.com.au"
      api_gateway_hosted_zone   = "dev.cloud.example.com.au"
      api_gateway_create_domain = true

      alarm_sns_topics = []
    }

    prod-ap-southeast-2-default = {
      environment_name       = "prod"
      account_name           = "prod"
      ecs_platform_workspace = "prod-ap-southeast-2-default"
      certificate_domain = "*.example.com.au"
      hosted_zone        = "prod.cloud.example.com.au"

      #app
      app_app_name    = "app"
      app_hostname    = "app.prod.cloud.example.com.au"
      app_hosted_zone = "prod.cloud.example.com.au"

      #api-gateway
      api_gateway_hostname      = "api.example.com.au"
      api_gateway_hosted_zone   = "prod.cloud.example.com.au"
      api_gateway_create_domain = false

      alarm_sns_topics = []
    }
  }

  workspace = "${local.env[terraform.workspace]}"
}
```

We’re using our
**Terraform** modules to create most of the resources. All the code and tools that we’re using is
**Open Source **so if you want to check this out, you will find all the terraform modules and tools
that we’ve on this link: [https://modules.dnx.one/](https://modules.dnx.one/).

Look’s nice but how we know each developer and deploy the code in the right workspace?

Gitlab provides us with many environment variables that we can use ([https://docs.gitlab.com/ee/ci/variables/predefined_variables.html](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)) in this case we’ll use on the pipeline. The variable we can use to separate the environments could be the **GITLAB_USER_ID.**

### Gitlab CI

```

image: dnxsolutions/musketeers:1.1.0
services:
  - docker:18.03.1-ce-dind # needs to match gitlab runner version
variables:
  DOCKER_HOST: "tcp://docker:2375"

stages:
  - plan-developer
  - apply-developer
  - destroy-developer
  - plan-dev
  - apply-dev
  - plan-prod
  - apply-prod

"terraform plan developer":
  stage: plan-developer
  tags: [example_runner, docker]
  variables:
    AWS_ACCOUNT_ID: 000000000000 #NONPROD
    AWS_ROLE: ci-deploy
    WORKSPACE: nonprod-ap-southeast-2-dev-${USER_ID}
  artifacts:
    paths:
      - .terraform-plan-*
  script:
    - terraform init 
    - terraform plan
  only:
    refs:
      - web
    variables:
      - $USER_ID

"terraform apply developer":
  stage: apply-developer
  when: manual
  tags: [example_runner, docker]
  variables:
    AWS_ACCOUNT_ID: 000000000000 #NONPROD
    AWS_ROLE: ci-deploy
    WORKSPACE: nonprod-ap-southeast-2-dev-${USER_ID}
  dependencies:
    - "terraform plan developer"
  script:
    - terraform init 
    - terraform apply
  only:
    refs:
      - web
    variables:
      - $USER_ID

"terraform destroy developer":
  stage: destroy-developer
  when: manual
  tags: [example_runner, docker]
  variables:
    AWS_ACCOUNT_ID: 000000000000 #NONPROD
    AWS_ROLE: ci-deploy
    WORKSPACE: nonprod-ap-southeast-2-dev-${DESTROY_USER_ID}
  script:
    - terraform init
    - terraform destroy
  only:
    refs:
      - web
    variables:
      - $DESTROY_USER_ID
      
"terraform plan dev":
  stage: plan-dev
  tags: [example_runner, docker]
  variables:
    AWS_ACCOUNT_ID: 000000000000 #NONPROD
    AWS_ROLE: ci-deploy
    WORKSPACE: nonprod-ap-southeast-2-dev
  artifacts:
    paths:
      - .terraform-plan-*
  script:
    - terraform init
    - terraform plan
  except:
    refs:
      - web
    variables:
      - $USER_ID

"terraform apply dev":
  stage: apply-dev
  when: manual
  tags: [example_runner, docker]
  variables:
    AWS_ACCOUNT_ID: 000000000000 #NONPROD
    AWS_ROLE: ci-deploy
    WORKSPACE: nonprod-ap-southeast-2-dev
  dependencies:
    - "terraform plan dev"
  script:
    - terraform init 
    - terraform apply
  only:
    - master
  except:
    refs:
      - web
    variables:
      - $USER_ID

"terraform plan prod":
  stage: plan-prod
  tags: [example_runner, docker]
  variables:
    AWS_ACCOUNT_ID: 000000000000 #PROD
    AWS_ROLE: ci-deploy
    WORKSPACE: prod-ap-southeast-2-default
  artifacts:
    paths:
      - .terraform-plan-*
  script:
    - terraform init
    - terraform plan
  dependencies:
    - "terraform apply dev"
  except:
    refs:
      - web
    variables:
      - $USER_ID

"terraform apply prod":
  stage: apply-prod
  when: manual
  tags: [example_runner, docker]
  variables:
    AWS_ACCOUNT_ID: 000000000000 #PROD
    AWS_ROLE: ci-deploy
    WORKSPACE: prod-ap-southeast-2-default
  dependencies:
    - "terraform plan prod"
    - "terraform apply dev"
  script:
    - terraform init
    - terraform apply
  only:
    - master
  except:
    refs:
      - web
    variables:
      - $USER_ID
```

In this case, we set the pipeline to run the stage developer just when we deploy a variable called DEVELOPER_ID. This variable is the **GITLAB_USER_ID **that we found before and you can grab this on your Gitlab’s profile account ([https://gitlab.com/profile](https://gitlab.com/profile)) and get the **User ID** field. Now that we have our developer’s user id, we can run our pipeline to create the user workspace using Terraform:

![Run Pipeline — Gitlab CI](/static/images/blog/multi-developer-environments-on-aws-using-gitlab-terraform-serverless-react/1_ul78U7dxq3zg7Nz9wROS7w.png)_Run Pipeline — Gitlab CI_

The result will be:

![Pipeline Running - Gitlab CI](/static/images/blog/multi-developer-environments-on-aws-using-gitlab-terraform-serverless-react/1_bkmGgBrx2d3dcT2SmTjN3g.png)_Pipeline Running - Gitlab CI_

We can use the Gitlab CI to apply our code using terraform and creating the new developer just when we set the variable **USER_ID**.

Now that we have our workspace deployed, let's move on and create our pipeline for our applications.

```

image: dnxsolutions/musketeers:1.1.1-ecr
services:
  - docker:18.03.1-ce-dind # needs to match gitlab runner version
variables:
  DOCKER_HOST: tcp://docker:2375/
  DOCKER_DRIVER: overlay2
  BUILD_VERSION: $CI_COMMIT_SHORT_SHA
  AWS_ROLE: ci-deploy
  AWS_DEFAULT_REGION: ap-southeast-2

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - package.json
    - package-lock.json

stages:
  - install
  - build
  - test
  - deploy-developer
  - deploy-dev
  - deploy-prod

# ------------------------------------------------------------------------------
# CONTINUOUS INTEGRATION
# ------------------------------------------------------------------------------
libraries:
  tags: [example_runner, docker]
  stage: install
  script:
    - make install
  only:
    - master
    - merge_requests
  cache:
    policy: push
  retry: 2
  artifacts:
    paths:
      - .cache/Cypress/
      - node_modules/
      - package.json
      - package-lock.json
    expire_in: 30 minutes

build:
  tags: [example_runner, docker]
  when: on_success
  stage: build
  script:
    - make build
  only:
    - master
    - merge_requests
  cache:
    policy: push
  retry: 2
  artifacts:
    paths:
      - build/

test:
  tags: [example_runner, docker]
  when: on_success
  stage: test
  script:
    - make test
  after_script:
    - bash <(curl -s https://codecov.io/bash) -t ${CODECOV_TOKEN} -s .cov
  only:
    - master
    - merge_requests
  cache:
    policy: push
  artifacts:
    paths:
      - build/

# ------------------------------------------------------------------------------
# CONTINUOUS DELIVERY
# ------------------------------------------------------------------------------
# -------------
# DEPLOY STAGE
# -------------

'Deploy Developer':
  tags: [example_runner, docker]
  when: on_success
  stage: deploy-developer
  variables:
    AWS_ENV: dev-${GITLAB_USER_ID}
    AWS_ACCOUNT_ID: 000000000000
    S3_BUCKET_NAME: example-app-${GITLAB_USER_ID}-dev
    APP_NAME: app-${GITLAB_USER_ID}
  script:
    - make deploy
  only:
    - merge_requests
  cache:
    policy: push
  artifacts:
    paths:
      - build/
  environment:
    name: app-react/developer-${GITLAB_USER_ID}
    url: https://app-${GITLAB_USER_ID}.dev.cloud.example.com.au

'Deploy Dev':
  tags: [example_runner, docker]
  when: on_success
  stage: deploy-dev
  variables:
    AWS_ENV: staging
    AWS_ACCOUNT_ID: 000000000000
    S3_BUCKET_NAME: example-app-dev
    APP_NAME: app
    CYPRESS_BASE_URL: https://app.dev.cloud.example.com.au
  script:
    - make deploy integration-test
  only:
    - master
  cache:
    policy: push
  artifacts:
    paths:
      - build/
  environment:
    name: app-react/development-qa
    url: https://app.dev.cloud.example.com.au

'Deploy Prod':
  tags: [example_runner, docker]
  when: manual
  stage: deploy-prod
  variables:
    AWS_ENV: prod
    AWS_ACCOUNT_ID: 000000000000
    S3_BUCKET_NAME: example-app-prod
    APP_NAME: app
  script:
    - make deploy release
  only:
    - master
  cache:
    policy: push
  artifacts:
    paths:
      - build/
  environment:
    name: app-react/prod
    url: https://app.prod.cloud.example.com.au
```

As we’re creating the API Gateway by developer we want each developer to have their own subdomain so we will use an **API Gateway Custom Domain Name** to have an endpoint pointing to the right API Gateway:

[https://api-**GITLAB_USER_ID**.dev.cloud.example.com.au/](https://api-GITLAB_USER_ID.dev.cloud.example.com.au/)

We also will change a bit our Serverless pipeline to grab the **GITLAB_USER_ID **and use inside for our code as an environment variable.

![](/static/images/blog/multi-developer-environments-on-aws-using-gitlab-terraform-serverless-react/1_pYbWbcDpvZ7Ezb6VvYMUQg.png)

```

image: dnxsolutions/musketeers:1.1.1-ecr

services:
  - docker:18.03.1-ce-dind # needs to match gitlab runner version

variables:
  DOCKER_HOST: tcp://docker:2375/
  DOCKER_DRIVER: overlay2
  AWS_DEFAULT_REGION: ap-southeast-2
  AWS_HOSTED_ZONE: dev.cloud.example.com.au
  AWS_ROLE: ci-deploy
  API_ENV: dev
  API_NAME: ${CI_PROJECT_NAME}
  API_VERSION: v1
  API_BASE_PATH: api
  API_BASE_SUBDOMAIN: api

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - package.json
    - package-lock.json

stages:
  - install
  - tests
  - deploy-developer
  - deploy-nonprod
  - deploy-prod

# ------------------------------------------------------------------------------
# CONTINUOUS INTEGRATION
# ------------------------------------------------------------------------------

libraries:
  tags: [example_runner, docker]
  stage: install
  script:
    - make install
  only:
    - master
    - merge_requests
  cache:
    policy: pull-push
  retry: 2
  artifacts:
    untracked: true

"unit-tests":
  tags: [example_runner, docker]
  when: on_success
  stage: tests
  script:
    - make test
  after_script:
    - bash <(curl -s https://codecov.io/bash) -t ${CODECOV_TOKEN} -s .cov
  only:
    - master
    - merge_requests
  cache:
    policy: pull-push
  dependencies:
    - libraries

# ------------------------------------------------------------------------------
# CONTINUOUS DELIVERY
# ------------------------------------------------------------------------------

# DEPLOY TO DEVELOPER ENVIRONMENT
"deploy developer":
  tags: [example_runner, docker]
  when: on_success
  allow_failure: true
  stage: deploy-developer
  variables:
    AWS_ACCOUNT_ID: 000000000000
    AWS_ACM_CERTIFICATE: "arn:aws:acm:us-east-1:000000000000:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    AWS_API_DOMAIN_NAME: ${API_BASE_SUBDOMAIN}-${GITLAB_USER_ID}.dev.cloud.example.com.au
    AWS_HOSTED_ZONE: dev.cloud.example.com.au
    AWS_ENV: dev-${GITLAB_USER_ID}
  script:
    - make deploy
  only:
    - merge_requests
  cache:
    policy: pull-push
  environment:
    name: ${CI_PROJECT_NAME}/developer/${GITLAB_USER_ID}
    url: https://${AWS_API_DOMAIN_NAME}/${API_BASE_PATH}

# DEPLOY TO NON-PROD SHARED ENVIRONMENT
"deploy nonprod":
  tags: [example_runner, docker]
  when: on_success
  stage: deploy-nonprod
  variables:
    AWS_ACCOUNT_ID: 000000000000
    AWS_ACM_CERTIFICATE: "arn:aws:acm:us-east-1:000000000000:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    AWS_API_DOMAIN_NAME: ${API_BASE_SUBDOMAIN}.dev.cloud.example.com.au
    AWS_HOSTED_ZONE: dev.cloud.example.com.au
    AWS_ENV: dev
  script:
    - make deploy
  only:
    - master
  cache:
    policy: pull-push
  environment:
    name: ${CI_PROJECT_NAME}/nonprod
    url: https://${AWS_API_DOMAIN_NAME}/${API_BASE_PATH}

# DEPLOY TO PRODUCTION ENVIRONMENT AND GENERATE RELEASE
"deploy prod":
  tags: [example_runner, docker]
  when: manual
  stage: deploy-prod
  variables:
    AWS_ACCOUNT_ID: 000000000000
    AWS_ACM_CERTIFICATE: "arn:aws:acm:ap-southeast-2:000000000000:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    AWS_API_DOMAIN_NAME: ${API_BASE_SUBDOMAIN}.example.com.au
    AWS_HOSTED_ZONE: prod.cloud.example.com.au
    AWS_ENV: prod
    API_ENV: prod
  script:
    - make deploy
  after_script:
    - make release
  only:
    - master
  cache:
    policy: pull-push
  environment:
    name: ${CI_PROJECT_NAME}/prod
    url: https://${AWS_API_DOMAIN_NAME}/${API_BASE_PATH}
```

Now when the developer does a commit into Gitlab the pipeline will trigger and grab the code that he is developing and deploy into his workspace on AWS.

I hope that this article could be useful for you. Let me know in the comments if you have some doubts about that.
