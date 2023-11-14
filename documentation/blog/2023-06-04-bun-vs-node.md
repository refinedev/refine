---
title: Bun vs. Node.js
description: We'll go over the new Bun runtime that has created a buzz in the tech space lately.
slug: bun-js-vs-node
authors: victor_uma
tags: [javascript, dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-06-04-bun-vs-node/social-2.png
hide_table_of_contents: false
---




# 

Do you want to try out a new runtime environment? [Bun](https://bun.sh/) is the new Javascript runtime that claims to be better than [Node.js](https://nodejs.org/en). This article will show how we can test this with benchmark scores.


## Prerequisites

While there is no prerequisite to follow in this tutorial, you should at least know the fundamentals of Javascript and building basic web applications. 

You need the followings:

- [Node 14](https://nodejs.org/en) or higher
- [Bun runtime](https://bun.sh/) installed
- npm installed
- A code editor 


## Overview

In this tutorial, we will go over the new Bun runtime that has created a buzz in the tech space lately. We will talk about what a runtime does and why some developers are switching over to using bun. We will also carry out some benchmark test to see if bun really has the fastest runtime as the Bun team says. Let's dive rignt in.

Steps we'll cover:

  - [What is a runtime](#what-is-a-runtime)
    - [The Javascript runtime](#the-javascript-runtime)
  - [What is Bun](#what-is-bun)
  - [Why is Bun Fast](#why-is-bun-fast)
  - [Installing the Bun runtime](#installing-the-bun-runtime)
  - [How does Bun compare with Node](#how-does-bun-compare-with-node)
  - [Benchmarking Bun](#benchmarking-bun)


## What is a runtime

Imagine you have a big box of LEGO blocks and you want to build a cool spaceship. You have all the instructions on how to put the pieces together, but you need something to actually assemble the spaceship and make it work. That's where a runtime comes in!
A runtime is like a special helper that takes care of building and running your LEGO spaceship. It's a program that makes sure all the pieces fit together correctly and that the spaceship does what it's supposed to do.

When you give the instructions to the runtime, it reads them step by step and starts putting the LEGO pieces in the right places. It follows the instructions precisely, making sure each piece is connected properly and that everything is in the right order.
Once the spaceship is built, the runtime also takes care of making it work. It powers up the spaceship, activates its engines, and controls all its cool features. It's like a small computer inside the spaceship that runs all the commands and makes sure everything runs smoothly.

In the world of programming, a runtime is similar. It's a special program that helps run other programs. It reads the instructions of a program, executes them step by step, and makes sure everything works as intended.
So, just like the helper in assembling the LEGO spaceship, a runtime is the special program that helps build and run other programs correctly. It's like a smart assistant that makes sure everything works smoothly, just like you'd expect from your awesome LEGO spaceship!.

### The Javascript runtime
The JavaScript runtime is like a translator between JavaScript and the computer. When you tell JavaScript to do something, like add two numbers together, the runtime listens and understands what you want. It then takes that instruction and talks to the computer in a language it understands.

The runtime also takes care of other important things. It makes sure JavaScript follows the rules and doesn't make any mistakes. It keeps an eye on JavaScript as it runs, like a teacher watching over a student to make sure they're doing their work correctly.

When the runtime talks to the computer and gets the result, it passes it back to JavaScript. It's like the runtime whispers the answer to JavaScript, and then JavaScript can do something with that answer. Maybe it shows the answer on the screen or uses it to make a cool animation.


## What is Bun

Bun is a JavaScript runtime built from scratch using the [Zig](https://ziglang.org/) programming language, with a focus on fast startup, efficient code execution, and a cohesive developer experience. It provides tools and features to optimize and streamline the development of JavaScript applications and is designed to be compatible with existing JavaScript ecosystems.

When you tell Bun what you want it to do, it listens carefully. It takes your instructions, which are written in a special language called JavaScript, and starts executing them step by step. It's like telling the a car where you want to go and how you want to get there.
But Bun doesn't just understand JavaScript—it's also really good at making JavaScript code run really fast! It's like having a car engine that can make your car zoom down the road faster than any other car.

Bun is built using a special programming language called Zig. Zig is like a magical tool that allows the people who created Bun to build it in a way that makes it very efficient and fast. It's like the secret recipe that makes Bun so powerful.
With Bun, you can do all sorts of things. You can build websites and applications that work really quickly and smoothly. You can also use the Bun CLI (Command Line Interface) to run your JavaScript and TypeScript files, bundle your code together, and even manage your project's dependencies.


## Why is Bun Fast

The Bun runtime exhibits impressive speed due to several key factors:

**Lightweight Design**: Bun is designed to be lightweight, resulting in a smaller codebase and reduced resource requirements. This optimized design allows Bun to deliver better performance in terms of both speed and memory usage compared to other runtimes.

**Low-Level Implementation**: The Bun runtime is built using Zig, a relatively new low-level programming language. Zig's characteristics enable developers to write code with fine-grained control over memory management and execution, contributing to the runtime's efficiency.

**Performance Optimization**: Instead of relying on the V8 engine, Bun utilizes the JavaScriptCore from WebKit, which is widely recognized for its superior performance. By leveraging this core engine, Bun benefits from its optimized execution of JavaScript code, resulting in improved runtime speed.

**Integrated Functionality**: Bun offers native tools and features that streamline the development process. It includes a built-in bundler, replacing the need for external tools like Webpack, as well as a native transpiler that supports writing TypeScript code directly. Additionally, Bun incorporates a test runner similar to Jest and automatically loads environment variables without requiring additional installations of packages like dotenv.

## Installing the Bun runtime

To install Bun, you can follow these steps:
Open your computer's terminal or command prompt. In the terminal, enter the following command:

```tsx
curl -fsSL https://bun.sh/install | bash
```

For macOS users, run this after:

```tsx
exec /bin/zsh
```

This command will initiate the installation process for Bun by downloading the installation script from the official Bun website. Press Enter and allow the installation script to run. It will handle the necessary steps to install Bun and its dependencies on your system. Wait for the installation process to complete. The script will take care of all the required tasks to ensure Bun is properly installed on your computer.

Once the installation is finished, you will have successfully installed Bun. You can now start using the Bun runtime to run your JavaScript and TypeScript applications and take advantage of its bundled tools and optimized performance.


## How does Bun compare with Node

In this section, we'll look at how Bun compares to Node and do some benchmarking between this two runtime. 


1. **Performance**: Bun emphasizes faster startup times and runtime performance by utilizing the JavaScriptCore engine from WebKit, renowned for its speed. In contrast, Node.js relies on the V8 engine, which is also highly optimized but may have performance distinctions compared to JavaScriptCore.
2. **Size and Dependencies**: Bun strives to be a lightweight runtime with a smaller codebase and minimal dependencies. It incorporates built-in tools like a bundler and transpiler, reducing reliance on external dependencies. In contrast, Node.js is a more comprehensive runtime with a larger codebase and extensive support for external modules and libraries.
3. **Compatibility**: Although Bun aims to serve as a drop-in replacement for Node.js, there may be variances in API compatibility. While Bun natively implements many Node.js and Web APIs, some specific Node.js modules or APIs might not be fully supported.
4. **Tooling**: Bun provides an integrated toolkit for JavaScript development, including a bundler, transpiler, and package manager. Node.js, on the other hand, boasts a rich ecosystem of third-party tools and libraries for diverse development tasks, such as popular bundlers like Webpack and package managers like npm or Yarn.
5. **Community and Ecosystem**: Node.js benefits from a mature and extensive community, offering substantial support, well-documented resources, and a vast ecosystem of modules and libraries. In contrast, Bun, being relatively newer, may have a smaller community and a more focused ecosystem.



## Benchmarking Bun

This benchmarking test is running on my Mac M1, 8gb ram computer. For the benchmarking tool, we will be using [k6](https://k6.io/) an open source tool by Grafana labs. You can find the installation guide for this tool [here](https://k6.io/docs/get-started/installation/). 

Here is our computer software version:

- Node v16.14.2
- Bun v0.4.0

For our code, I have gotten a simple HTTP server code from the [Bun](https://bun.sh/) and [Node.js](https://nodejs.org/en/docs/guides/getting-started-guide) official sites. Here is the Hello World code in Bun and Node

**Node**

```tsx
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Run the command in your terminal:

```tsx
node server.js
```

Your node server will be running on port:  http://localhost:3000/

**Bun**

```tsx
export default {
  port: 3001,
  fetch(_) {
    return new Response("Hello World");
  },
};
```

Your Bun server will be running on port:  http://localhost:3001/

Run the command in your terminal:

```tsx
bun run bunserver.js
```

Create a `script.js` file and paste this test script:

```tsx
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://localhost:3001/'); // this will change depending on the server you're testing for
  sleep(1);
}
```

In your terminal run:

```tsx
k6 run script.js
```

Here is the result for our Node server:

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-06-04-bun-vs-node/node.png"  alt="bun vs node js" />
</div>

<br/>





Here is the result for our Bun server:

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-06-04-bun-vs-node/bun.png
"  alt="bun vs node js" />
</div>

<br/>



We can now see and compare Bun speed to Node. If you want to go further you can introduce different latencies, more users and duration with the script:

```tsx
k6 run --vus 10 --duration 30s script.js
```

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>



## Conclusion

In conclusion, Bun and Node.js are two JavaScript runtimes that offer different approaches and features for developers. Bun focuses on delivering fast startup times, optimized performance, and a lightweight design with integrated tools like a bundler and transpiler. It utilizes the JavaScriptCore engine from WebKit to achieve its performance goals. On the other hand, Node.js has a larger ecosystem, extensive community support, and compatibility with a wide range of programming languages. It relies on the V8 engine and offers a rich set of third-party tools and libraries. Choosing between Bun and Node.js depends on factors such as performance requirements, specific project needs, and the availability of suitable tooling and community support. Ultimately, developers can leverage the strengths of each runtime to build robust and efficient JavaScript applications.