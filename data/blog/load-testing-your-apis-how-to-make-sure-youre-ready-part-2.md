---
title: "Load Testing Your API's - How to make sure you are Ready?! - [Part 2]"
date: '2021-10-04'
tags: ['load-testing','k6','api']
draft: false
summary: 'Handling the load of traffic coming in and out every single day is crucial to the success of your business. Load testing your APIs by simulating heavy traffic can help make sure that your API will be able to handle anything thrown at it!'
images: []
layout: PostLayout
---

This article will talk about how to load test your APIs, and it is the second part of the article where I will bring more code and action. If you haven't checked the first part of it, please feel free to read it:

[Load Testing Your API's - How to make sure you are Ready?! - [Part 1]]("https://www.brunodasilvalenga.com/blog/load-testing-your-apis-how-to-make-sure-youre-ready-part-1")


From the [part 1]("https://www.brunodasilvalenga.com/blog/load-testing-your-apis-how-to-make-sure-youre-ready-part-1"), we identified that load testing your API means simulating heavy traffic coming into your API, and it can help you make sure that it can handle anything that is thrown at it. Also, we came up with 4 types of load testing.

## Types

- Load Testing
- Stress Testing
- Spike Testing
- Soak Testing

## K6

To cover all the types, we are going to use [K6](https://k6.io). It is a developer-centric, free and open-source load testing tool built for making performance testing a productive and enjoyable experience.

### Key features
K6 is packed with features, which you can learn all about in the [documentation](https://k6.io/docs/#key-features). Key features include:

- CLI tool with developer-friendly APIs.
- Scripting in JavaScript ES2015/ES6 - with support for local and remote modules
- Checks and Thresholds - for goal-oriented, automation-friendly load testing


## Let's code

### Simple Testing
It will request as fast as possible the endpoint for 5 seconds.

Command: `docker run -i loadimpact/k6 run - <1-simple.js`

```javascript
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  noConnectionReuse: false,
  vus: 1,
  duration: '5s',
};

export default () => {
  const res = http.get('https://your.api.com');
  check(res, { 'status was 200': (r) => r.status == 200 });
}
```

### Simple Testing - Multiple Endpoints
It will request as fast as possible the endpoint for 5 seconds.

Command: `docker run -i loadimpact/k6 run - <1-simple-multiple.js`

```javascript
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  noConnectionReuse: false,
  vus: 1,
  duration: '5s',
};

export default () => {
  const res = http.batch({
    'my-first-api': {
      method: 'GET',
      url: 'https://your.api.com'
    },
    'my-second-api': {
      method: 'GET',
      url: 'https://your.second.api.com'
    }
  })
  check(res['my-first-api'], { 'docker res status was 200': (r) => r.status == 200 });
  check(res['my-second-api'], { 'api gateway res status was 200': (r) => r.status == 200 });
}
```

### Simple testing Request Per Second (RPS)
It will request as fast as possible the endpoint for 10 seconds.

Command: `docker run -i loadimpact/k6 run - <2-simple-rps.js`

```javascript
import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  noConnectionReuse: false,
  vus: 1,
  duration: '10s',
};

export default () => {
  const res = http.get('https://your.api.com');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```

### Load Testing
Measure the performance of your application in terms of concurrent users and requests per second.

A load test simulates real users performing real tasks to see how your API responds under actual conditions of use. It can help identify issues with scalability, load balancing and capacity planning. In addition, this type of testing can show how your API will respond to standard user behaviour and unusual or abnormal use cases.

>Notes:
>- Simulate normal user behaviour.

Command: `docker run -i loadimpact/k6 run - <load-testing.js`

```javascript
import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  noConnectionReuse: false,
  stages: [
    { duration: '5m', target: 50 }, //Normal user connections 1-100 in 5 minutes
    { duration: '10m', target: 50 }, //Stay like this for 10 minutes
    { duration: '2m', target: 0 }, //Scale down to 0 users.
  ],
  thresholds: {
    http_req_duration: ['p(99)<500'],  //99% of requests must complete in less than 500ms
  }
};

export default () => {
  const res = http.get('https://your.api.com');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```

### Stress Testing
Test the limit of the API, how far can we push it.

A common type of load testing is stress testing, which tests how the application holds up under heavy use. It is usually designed to find out if there are any flaws in the design or implementation of the application by forcing it to perform tasks it would typically not have to do. Often, stress testing involves running a program that keeps on generating errors to cause the software to operate outside of its normal range. This type of testing can help detect vulnerabilities such as buffer overflows and input validation vulnerabilities.

>Expecations:
>- How your system will behave under extreme conditions.
>- What is the maximum capacity of your system under stress.
>- Determine the breaking point of your system.
>- Your system will recover after the stress test is over.

Command: `docker run -i loadimpact/k6 run - <4-stress-testing.js`

```javascript
import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  noConnectionReuse: false,
  stages: [
    { duration: '2m', target: 100 }, //below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, //normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, //around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, //beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, //scale down. Recovey mode.
  ]
};

export default () => {
  const res = http.get('https://your.api.com');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```

### Spike Testing
A variant of a stress test, but instead of gradually increasing,
it spikes to extreme load in a short time.

A spike test is designed to identify when your system can't handle requests coming in all at once. This kind of test will start slowly with low traffic to see how the system reacts then gradually build up until there is a high spike in incoming requests. This can help identify memory leaks and performance issues caused by external or internal events such as a hardware failure, system slowdown or even when the API is used at maximum capacity.

>Notes:
>- How your system will perform under a sudden spike of traffic.
>- Very common on product launches.
>- Very common on marketing campaigns.

Command: `docker run -i loadimpact/k6 run - <5-spike-testing.js`

```javascript
import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  noConnectionReuse: false,
  stages: [
    { duration: '5m', target: 50 },   //below normal load
    { duration: '2m', target: 50 },
    { duration: '2m', target: 1000 }, //spike to 1500 users
    { duration: '2m', target: 1000 }, //stay at 1500 users for 2 minutes
    { duration: '10m', target: 50 },  //scale back to 100 users
    { duration: '3m', target: 50 },
    { duration: '2m', target: 0 }
  ]
};

export default () => {
  const res = http.get('https://your.api.com');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```


### Soak Testing
It is used to validate the reliability of the application for an extended period.

A soak test is a traditional way of doing most load testing for applications that can handle high traffic over time. In other words, it puts your API through its paces to see how it holds up under continuous stress over a while. This is done by running the test for an extended period with higher loads than what would typically be expected so that any problems can be identified under actual use conditions.

>Notes:
>- Check problems like memory leaks, crashes, timeouts.

>How:
>- Get how many users your application can handle on average.
>- Use that number as the target VUs.
>- Run the test for an extended period.

Command: `docker run -i loadimpact/k6 run - <6-soak-testing.js`

```javascript
import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  noConnectionReuse: false,
  stages: [
    { duration: '2m', target: 100 }, //Normal user connections 1-100 in 2 minutes
    { duration: '5h', target: 300 }, //Stay for 5h with average of 300 VUs
    { duration: '1m', target: 0 }, //Scale down to 0 users.
  ]
};

export default () => {
  const res = http.get('https://your.api.com');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```


### Output Example
```bash
✗ status was 200
↳  97% — ✓ 3012 / ✗ 84

checks.........................: 97.28% ✓ 3012      ✗ 84
data_received..................: 12 MB  298 kB/s
data_sent......................: 508 kB 13 kB/s
http_req_blocked...............: avg=4.37ms   min=24.4µs  med=36.9µs  max=244.27ms p(90)=26.96ms  p(95)=30.78ms
http_req_connecting............: avg=1.15ms   min=0s      med=0s      max=24.42ms  p(90)=7.84ms   p(95)=9.05ms
http_req_duration..............: avg=2.04s    min=9.44ms  med=2.01s   max=6.16s    p(90)=3.71s    p(95)=3.91s
  { expected_response:true }...: avg=2.09s    min=11.97ms med=2.2s    max=6.16s    p(90)=3.72s    p(95)=3.95s
http_req_failed................: 2.71%  ✓ 84        ✗ 3012
http_req_receiving.............: avg=668.04µs min=95µs    med=330.4µs max=17.46ms  p(90)=1.54ms   p(95)=1.96ms
http_req_sending...............: avg=230.89µs min=69.5µs  med=148.9µs max=7.74ms   p(90)=443.45µs p(95)=577.75µs
http_req_tls_handshaking.......: avg=3.05ms   min=0s      med=0s      max=190.22ms p(90)=18.11ms  p(95)=20.79ms
http_req_waiting...............: avg=2.04s    min=8.32ms  med=2.01s   max=6.16s    p(90)=3.71s    p(95)=3.91s
http_reqs......................: 3096   79.728164/s
iteration_duration.............: avg=3.05s    min=1.01s   med=3.01s   max=7.19s    p(90)=4.72s    p(95)=4.94s
iterations.....................: 3096   79.728164/s
vus............................: 69     min=50      max=400
vus_max........................: 400    min=400     max=400
```

All the source-code from this article is available in the [load-testing-api-k6](https://github.com/brunodasilvalenga/load-testing-api-k6) repository.