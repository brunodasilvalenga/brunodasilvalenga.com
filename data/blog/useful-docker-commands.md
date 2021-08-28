---
title: Docker commands for your daily workflow
date: '2021-08-28'
tags: ['docker']
draft: false
summary:  If you are looking for a list of useful docker commands that can make your development workflow easier, then this blog post might be just what you need! I hope these serve as a helpful guide to some Docker commands that will help you along the way.
images: []
layout: PostSimple
---

# Docker commands for your daily workflow

Docker is an open-source project that automates the deployment of applications inside software containers. It’s especially useful for DevOps engineers, programmers, and developers because it allows them to package their code into a standardized unit for software development. This post covers some useful docker commands you can use in your daily work, so if you are looking for some commands to help with your development workflow, this blog post might be just what you need!

This post is not meant to be a full reference to Docker, just a few commonly used commands that you might find useful as an introduction only. You can use them while working with Docker or on your own server when debugging something.

## Execute commands inside of container

```bash
docker exec -i -t id_do_container /bin/bash
```

## Run the container ignoring the default entrypoint

```bash
docker run -it --entrypoint "/bin/bash" image_name
```

## Build a docker image

```bash
docker build -t image_name:0.1 .
```

## Clean containers with exited status

```bash
$ docker ps
$ docker ps -a
$ docker rm $(docker ps -qa --no-trunc --filter "status=exited")
```

## Clean docker images
```bash
$ docker images
$ docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
$ docker images | grep "none"
$ docker rmi $(docker images | grep "none" | awk '/ / { print $3 }')
```

## Clean docker images ignore filter by name

```bash
docker rmi $(docker images | grep -v "<name>" | awk '{print $3}')
```

## Remove networks

```bash
$ docker network ls
$ docker network ls | grep "bridge"
$ docker network rm $(docker network ls | grep "bridge" | awk '/ / { print $1 }')
```

## Delete volumes

```bash
$ docker volume rm $(docker volume ls -qf dangling=true)
$ docker volume ls -qf dangling=true | xargs -r docker volume rm
```

## Mapping your folder to container

```bash
$ docker run -it -v "$(pwd)":/app -w /app image:tag
```

In this blog post, I've covered some of the most useful commands you can use on a daily basis to help with your development workflow.

Let me know in the comments below what commands are you using or if there’s anything else you would like me to cover on the next blog post 🙂