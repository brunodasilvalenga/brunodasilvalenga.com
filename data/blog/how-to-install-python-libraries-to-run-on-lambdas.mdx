---
title: How to install Python Libraries to run on Lambda\'s
date: '2020-05-06'
tags: ['serverless', 'gitlab', 'terraform', 'react', 'aws']
draft: true
summary: 'How to install Python Libraries to run on Lambdas'
---

# How to install Python Libraries to run on Lambda's

A big problem when we're compiling Python libraries to use in our Lambda on AWS is we're using our computer (windows/macox/linux) to compile it. we starting to facing some issues because when you install a python package using pip for example, python knows that our machine has some libs that doesn't need to be compile again because out machine will offer it to our library.
When we use lambda it can be a big issue because the lambda image that AWS is using to run our function doesn't provide the same lib's that our machine provides us. AWS are using some runtimes to run our Lambda and you can check it out here (https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html), also you can setup a customise runtime but I'll not cover it now.
So, how to solve this problem? With a simple tool called Docker 😎
If you don't know what's docker or never used it before, please leave this page now and read: What is a Container? ASAP.
We gonna use a docker image called lambci/lambda that replicates all the environment runtime where our Lambda runs. The developers defines this docker image as a sandboxed local environment that replicates the live AWS Lambda environment almost identically - including installed software and libraries, file structure and permissions, environment variables, context objects and behaviors - even the user and running process are the same.
They provide a lot of runtimes, no just for Python, you will find runtimes for all the Languages that Lambda offers you. You can check all the runtimes here. 
Let's code.
The difference:
When we install some package for example "NAME OF PACKE" using our computer with a simple pip install:
CODE BAHS INSTALL PIP INSTALL
After we install the library in a specify local folder we can see the library source code on XXX folder. As we can see normal package but if we deploy it into our lambda function we starting to facing some problems because our lambda runtime doenst provide some libs.
PICTURE LAMBDA ERROR
And if we install the Python package using our docker image that we commented before? Let's try:
PICTURE RUNNING PYTHON WITH DOKCER IMAGE
We can see that our folder contains a different content, like this package libs. 
PICTURE FOLDER WIHT LIBS
What happened here? How our docker image doenst provide some SO lib's and python needs them to compile the library, python will compile the libs for us and provide it as a python libs and not more SO libs.
If we update our lambda with the fresh packages we can see that our problem with lib packages was solved 🙌.
PICTURE LAMBDA SUCCESS