---
title: Sample APi with Deno
excerpt: This is simple api built with Deno, in an effort to learn and explore Deno.
Tools: ['Deno']
---


# Deno Sample API
This is a practice code to, try out deno to build a backend api and consume it in a Front-end app.


### To run and generate lock file

> deno run --allow-net --alow-read --lock-write --lock=lock.json mod.ts

### To build and run docker image from file
> docker build Path -t TagName

> eg docker build . -t TagName/space-api  ---> we are passing path as current directory and docker will find the docker file.

### To map port 
> docker run -it -p PORTINIMAGE:PORTOUTSIDE IMAGENAME
> -it --> gives access to running container

### To publish image
> docker push IMAGE
> eg docker push username/tagname  --- here username/tagname is image tagname

### To ssh to aws instance, if you have one
> ssh -i "key-pair" ec2Instance
> -i flag indicates the identity file 
