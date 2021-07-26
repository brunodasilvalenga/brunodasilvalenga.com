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

![](https://cdn-images-1.medium.com/max/2000/1*SYy4KGSFpLvepUz4lS46UQ.png)

Sometimes we would like to test some new feature that is being developed using our workspace the Development on AWS. It is very simple when we have a small team, and it is easy to do internal management, but sometimes we start to face some problems because another developer would like to test his new feature as well and this would cause confusion, as the second developer would need to merge/rebase the code and that would mean more time and nowadays time is money. 🤑

We can fix that problem creating a new workspace on AWS for each developer and we can share the resources between them or have one resource per developer, in this case, we will share the resources between the developer since we’re looking for cost optimisation as well.

Let’s look at some code. We’re using Terraform and a concept called workspaces if you never heard about that you may check our blog post talking about Terraform Workspaces.
[**Terraform Workspaces 101**
*The art of deploying the same stack multiple times without duplication*medium.com](https://medium.com/dnx-labs/terraform-workspaces-101-f8e1a5054547)

## Terraform — Deploy Infrastructure as Code (IaC)

### Frontend — Cloud Front + S3 Bucket

<iframe src="https://medium.com/media/2bd7f0796357596e3d596f92daf0d489"></iframe>

### Backend — API Gateway

<iframe src="https://medium.com/media/caa9dc35c0fb4e6d10f90efe895dc6a1"></iframe>

### Variables

<iframe src="https://medium.com/media/09d68c83d8fadde917c8eee89ac8e421"></iframe>> We’re using our
**Terraform** modules to create most of the resources. All the code and tools that we’re using is
**Open Source **so if you want to check this out, you will find all the terraform modules and tools
that we’ve on this link: [https://modules.dnx.one/](https://modules.dnx.one/).

Look’s nice but how we know each developer and deploy the code in the right workspace?

Gitlab provides us with many environment variables that we can use ([https://docs.gitlab.com/ee/ci/variables/predefined_variables.html](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)) in this case we’ll use on the pipeline. The variable we can use to separate the environments could be the **GITLAB_USER_ID.**

### Gitlab CI

<iframe src="https://medium.com/media/9c285dfaac71720bf50e99f5201b8144"></iframe>

In this case, we set the pipeline to run the stage developer just when we deploy a variable called DEVELOPER_ID. This variable is the **GITLAB_USER_ID **that we found before and you can grab this on your Gitlab’s profile account ([https://gitlab.com/profile](https://gitlab.com/profile)) and get the **User ID** field. Now that we have our developer’s user id, we can run our pipeline to create the user workspace using Terraform:

![Run Pipeline — Gitlab CI](https://cdn-images-1.medium.com/max/2560/1*ul78U7dxq3zg7Nz9wROS7w.png)_Run Pipeline — Gitlab CI_

The result will be:

![Pipeline Running - Gitlab CI](https://cdn-images-1.medium.com/max/2752/1*bkmGgBrx2d3dcT2SmTjN3g.png)_Pipeline Running - Gitlab CI_

We can use the Gitlab CI to apply our code using terraform and creating the new developer just when we set the variable **USER_ID**.

Now that we have our workspace deployed, let's move on and create our pipeline for our applications.

<iframe src="https://medium.com/media/868d3177f737c470e41e1aba313bbba8"></iframe>

As we’re creating the API Gateway by developer we want each developer to have their own subdomain so we will use an **API Gateway Custom Domain Name** to have an endpoint pointing to the right API Gateway:

[https://api-**GITLAB_USER_ID**.dev.cloud.example.com.au/](https://api-GITLAB_USER_ID.dev.cloud.example.com.au/)

We also will change a bit our Serverless pipeline to grab the **GITLAB_USER_ID **and use inside for our code as an environment variable.

![](https://cdn-images-1.medium.com/max/4232/1*pYbWbcDpvZ7Ezb6VvYMUQg.png)

<iframe src="https://medium.com/media/a49a016aae5d36613f348c7ab04f5230"></iframe>

Now when the developer does a commit into Gitlab the pipeline will trigger and grab the code that he is developing and deploy into his workspace on AWS.

I hope that this article could be useful for you. Let me know in the comments if you have some doubts about that.
