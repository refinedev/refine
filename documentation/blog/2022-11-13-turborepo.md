---
title: What is Turborepo and Why Should You Care?
description: The advantages of using Turborepo for monorepo development.
slug: how-to-use-turborepo
authors: muhammad_khabbab
tags: [nextjs, dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-13-turborepo/social.png
hide_table_of_contents: false
---



## Introduction
Monorepos are very popular in modern application development because of their immense benefits. A monorepo is a single repository having multiple distinct projects with well-defined associations. Note that monorepo is not a monolith; in fact, it is the opposite of a monolith.  

 It is very easy to make cross-cutting code changes across different applications (/backend, /frontend) in a single atomic commit. It also provides a single source of truth for various environmental concerns you would want to be applied uniformly across your organization. Some examples include dependency management, code reuse from shared packages, etc. Because of the powerful features of monorepo that tech giants like Google and Facebook have adopted monorepo. Even major Javascript tools like React, Next.JS, Yarn, and many others are using monorepo. 

In this article, we will discuss [Turborepo](https://turbo.build/) in detail. Turborepo is one of the best tools for monorepo. It is a high-performance build system for Typescript and Javascript projects. It provides some powerful features like:

-	Fast incremental build
-	Local computational caching
-	Distributed computation caching
-	Local task orchestration
-	Dependency graph visualization
-	Source code sharing

Today we will cover why we should use Turborepo, what are its major features and when are the best use cases for adopting it in your projects. 

Steps we'll cover:
- [Why Turborepo?](#why-turborepo)
- [Unique Features of Turborepo](#unique-features-of-turborepo)
  - [Remote caching](#remote-caching)
  - [Prune now supports all package managers](#prune-now-supports-all-package-managers)
  - [Support for Polyrepo](#support-for-polyrepo)
- [When should you use Turborepo?](#when-should-you-use-turborepo)
- [How to use Turborepo?](#how-to-use-turborepo)

## Why Turborepo?
There was a need for a monorepo tool that could take advantage of advanced techniques with zero configuration. Something that is easy to scale and adapt while at the same time improving the speed of monorepo pipelines. Turborepo provides all these features and more.


The main idea behind monorepo is to never recompute the work that has already been done before. It keeps a cache of previous builds for each project and then uses it for subsequent builds. It keeps track of the output of any task you execute and then skips the work that is already done. 
Turborepo is designed to be adopted incrementally, so you can add it to our codebase in just a few minutes. It speeds up your tasks through smart scheduling, minimizing idle CPU. 

Turborepo's magic lies in the execution of its tasks. For package installation, you can still use pnpm or npm. Turborepo complements pnpm/npm, where these package managers install your packages, and Turborepo runs your tasks efficiently. 

---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />

---

## Unique Features of Turborepo
### Remote caching 
Build caches are usually generated and checked on the local machine, so if you are reviewing your team member's code, you will also have to build it locally. Remote caching shares that cache on a global scale, turning it into a "dropbox of your ```dist``` folder". Vercel offers free remote cache on Turborepo builds even if you are not hosting your application on Vercel servers. 

With your remote caching, builds can achieve amazingly fast build times by providing a way to share compiled computations and code artifacts on Vercel. These artifacts can be log outputs, build outputs, blobs of data, etc. Remote caching identifies any necessary artifacts already generated in the same code PR and recycles them across different machines. This recycling or reuse can be done either during Vercel build process or an external CI/CD.

<br/>

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-13-turborepo/turbopack.png"  alt="turbopack" />
<em> Source - </em>
</div>

<br/>

The above image shows that the shared cache resides on the Vercel servers. You can share your cache with fellow developers and your CI server. 
Remote caching speeds up your workflow as you do not need to constantly re-compile, re-test, or re-run your unchanged code.

### Prune now supports all package managers
Pruning is the process of automatically removing the overgrowth of the build cache efficiently. Pruning creates a subset of your monorepo, including pruning the dependencies in your lock file. As a result, the tool providing the pruning must also implement the logic for each workspace manager separately. The good news is that the command ``` turbo prune``` provides support for all major package managers including npm, yarn, and pnpm. 

### Support for Polyrepo
Initially, Turborepo was focused solely on monorepo because monorepo runs plenty of tasks, and Turborepo is exceptionally fast in executing the tasks rapidly. Now Turborepo supports polyrepo too. After all, a polyrepo also executes plenty of tasks, so it is well worth utilizing Turborepo in monorepo and polyrepo. The majority of CI/CD processes duplicate a lot of work, so taking advantage of the Turborepo cache would benefit polyrepo too. 
Some of the other features of Turborepo include:

-	Incremental builds. Turborepo will remember what you have built and skip the existing computations
-	Context-aware hashing. Turborepo keeps track of the contents of your files, not date/time, to identify what needs to be built. 
-	Zero runtime overhead. Turborepo will not interfere with your runtime code or alter your sourcemaps
-	Pruned subsets. It speeds up your deployments by generating a subset of your monorepo with only what is required to build a specific target
-	Integration with Lerna. If you are using lerna as your package publishing workflow, you can use Turborepo in parallel to improve the execution of your tasks. 
-	Profile in your browser. You can create build profiles and import them in Edge or chrome browser to identify which tasks are running the longest. 

## When should you use Turborepo?
Despite all the good things about monorepo, they struggle to scale. Each project in monorepo has its own ecosystem of testing, building, linting, etc. While majority of the projects will benefit from Turborepo, Turborepo will be highly beneficial for you if:

-	There is a lot of dependency of scripts on each other
-	You want to execute tasks in parallel
-	You want top-level dependency management for JavaScript and TypeScript
-	You want Incremental builds
-	You want a uniform linting configuration
-	You want caching of the build steps
-	You want out-of-the-box hot module reload for the NextJS application for imported packages

## How to use Turborepo?
Following are some of the commands to use Turborepo:

-	```npx create-turbo@latest turbo-demo``` scaffolds a monorepo with different applications (API, frontend) and packages (design system and shared configs (eslint, tsconfig))
-	```turbo run build``` builds all apps simultaneously. When you execute this command again, the second build completes in just 100ms because everything is cached. There are many [variations](https://turborepo.org/docs/reference/command-line-reference) of ```turbo run``` command. 
-	```turbo prune --scope=<target>``` creates a sparse/partial monorepo with a pruned lock file for a target package.
-	Remote Caching commands: ```turbo login``` and ```turbo link```

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>


## Conclusion
Turborepo is a high performant and blazing-fast build tool for monorepo. With the Javascript ecosystem growing rapidly, you need a modern and efficient set of tools, especially the build tool. 

As shown in the above picture, Turborepo is written 74% in the Go language, which means it is written with performance in mind. Clearly, the age of "JS tools in JS" is gone. Turborepo can make your pipeline 10x faster. It brings immense value out of the box with a declarative build pipeline, excellent debugging/profiling options, and great documentation. 
