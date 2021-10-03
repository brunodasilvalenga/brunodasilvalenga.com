---
title: "How to install Python Libraries to run on AWS Lambda functions"
date: '2021-10-03'
tags: ['serverless', 'python', 'docker', 'libs', 'lambda', 'aws']
draft: false
summary: "A big problem when compiling Python libraries to use in our Lambda on AWS is using our computer (windows/macox/Linux) to assemble it. We starting to facing some issues because when you install a python package using pip, for example, Python knows that our machine has some libs that don't need to be recompiled because our machine will offer it to our library."
layout: PostLayout
---

A big problem when compiling Python libraries to use in our Lambda on AWS is using our computer (windows/macox/Linux) to assemble it. We starting to facing some issues because when you install a python package using pip, for example, Python knows that our machine has some libs that don't need to be recompiled because our machine will offer it to our library.

When we use Lambda, it can be a big issue because AWS's lambda image to run our function doesn't provide the same lib's that our machine offers us.

AWS uses some runtimes to run our Lambda, and you can check it out [here](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html). Also, you can set up a customise runtime, but I'll not cover it now.

So, how to solve this problem?

With a simple tool called Docker 😎

If you don't know what's Docker or never used it before, please leave this page now and read: [What is a Container?](https://www.docker.com/resources/what-container) ASAP.

We will use a docker image called lambic/lambda that replicates all the environment runtime where our Lambda runs. The developers define this docker image as a sandboxed local environment that almost identically replicates the live AWS Lambda environment, including installed software and libraries, file structure and permissions, environment variables, context objects and behaviours, and even the user and running process are the same.

They provide a lot of runtimes, not just for Python. You will find runtimes for all the Languages that Lambda offers you. You can check all the [runtimes here](https://github.com/lambci/docker-lambda).

Let's code.
The difference:
When we install some package, for example, **Pillow** using our computer with a simple pip install:

```bash
$ pip3 install Pillow
```

After installing the library in a specific local folder, we can see the library source code on the *.venv* local folder. We can see a standard package, but if we deploy it into our lambda function, we face some problems because our lambda runtime doesn't provide some libs.

```bash
$ ~/Projects/lambdas/img/.venv/lib/python3.8/site-packages/PIL > master ❯ l
total 3640
drwxr-xr-x  102 brunodasilvalenga  staff   3.2K Oct  3 11:56 .
drwxr-xr-x   28 brunodasilvalenga  staff   896B Oct  3 11:56 ..
-rw-r--r--    1 brunodasilvalenga  staff   2.9K Aug 10  2020 BdfFontFile.py
-rw-r--r--    1 brunodasilvalenga  staff    14K Aug 10  2020 BlpImagePlugin.py
-rw-r--r--    1 brunodasilvalenga  staff    14K Aug 10  2020 BmpImagePlugin.py
-rw-r--r--    1 brunodasilvalenga  staff   1.5K Aug 10  2020 BufrStubImagePlugin.py
-rw-r--r--    1 brunodasilvalenga  staff   2.7K Aug 10  2020 ContainerIO.py
-rw-r--r--    1 brunodasilvalenga  staff   1.6K Aug 10  2020 CurImagePlugin.py
-rw-r--r--    1 brunodasilvalenga  staff   2.2K Aug 10  2020 DcxImagePlugin.py
-rw-r--r--    1 brunodasilvalenga  staff   5.3K Aug 10  2020 DdsImagePlugin.py
-rw-r--r--    1 brunodasilvalenga  staff    12K Aug 10  2020 EpsImagePlugin.py
.
.
.

```

And if we install the Python package using the docker image that we commented on before? Let's try:

```bash
docker run -it -w /work -v $(pwd):/work lambci/lambda:build-python3.8 "source .venv/bin/activate && pip3 install -r requirements.txt"
```

We can see that our folder contains different content, like this package libs.

```bash
$ ~/Projects/lambdas/img/.venv/lib/python3.8/site-packages/PIL/.libs > master ❯ l
total 8664
drwxr-xr-x   13 brunodasilvalenga  staff   416B Aug 10  2020 .
drwxr-xr-x  103 brunodasilvalenga  staff   3.2K Oct  3 11:57 ..
-rwxr-xr-x    1 brunodasilvalenga  staff   1.2M Aug 10  2020 libfreetype-69f25d5e.so.6.17.1
-rwxr-xr-x    1 brunodasilvalenga  staff   245K Aug 10  2020 libjpeg-3b10b538.so.9.3.0
-rwxr-xr-x    1 brunodasilvalenga  staff   442K Aug 10  2020 liblcms2-a6801db4.so.2.0.8
-rwxr-xr-x    1 brunodasilvalenga  staff   212K Aug 10  2020 liblzma-6cd627ed.so.5.2.4
-rwxr-xr-x    1 brunodasilvalenga  staff   480K Aug 10  2020 libopenjp2-b3d7668a.so.2.3.1
-rwxr-xr-x    1 brunodasilvalenga  staff   277K Aug 10  2020 libpng16-bedcb7ea.so.16.37.0
-rwxr-xr-x    1 brunodasilvalenga  staff   646K Aug 10  2020 libtiff-bd1961ca.so.5.5.0
-rwxr-xr-x    1 brunodasilvalenga  staff   583K Aug 10  2020 libwebp-3a2aeecf.so.7.0.5
-rwxr-xr-x    1 brunodasilvalenga  staff    29K Aug 10  2020 libwebpdemux-e9ec482e.so.2.0.6
-rwxr-xr-x    1 brunodasilvalenga  staff    57K Aug 10  2020 libwebpmux-40630b44.so.3.0.4
-rwxr-xr-x    1 brunodasilvalenga  staff    86K Aug 10  2020 libz-a147dcb0.so.1.2.3
```

What happened here? Our docker image doesn't provide some SO lib's and Python needs them to compile the library. So Python will compile the libs for us and offer them like Python libs and not more SO libs.

If we update our Lambda with the new packages, we can see that our problem with lib packages was solved 🙌.