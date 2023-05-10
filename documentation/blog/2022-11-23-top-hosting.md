---
title: 5 Best Free Platforms for Hosting Hobby Web Projects
description: A list of the best free platforms for hosting hobby web projects. You can host your static websites, React apps, and more for free.
slug: 5-top-free-react-hosting-platforms
authors: joseph_mawa
tags: [comparison]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-23-top-hosting/social.png
hide_table_of_contents: false
---





## Introduction

Most developers spend a significant proportion of their private time building side projects. These projects come in different forms and sizes. More often than not, you need to temporarily host these projects on a platform to test, showcase, or obtain feedback.

There are several hosting platforms. Each platform has its strengths and weaknesses. The choice of a hosting platform largely depends on the framework and whether the project you want to host is a back-end, front-end, or full-stack application. Similarly, choose a platform that offers a generous free plan when building a hobby project.

This article will explore the top five platforms with generous free hosting plans. We will highlight how to deploy to these hosting platforms, their strengths, and weaknesses, and explain why one might choose one platform over the other.

Different projects have different hosting requirements. The goal of this article is not to establish which hosting platform is better. It highlights their salient features so you can easily pick one that meets your project's requirements.

Steps we will cover.

- [How to create Refine application](#how-to-create-refine-application)
- [Top hosting platforms with free plans for your hobby projects](#top-hosting-platforms-with-free-plans-for-your-hobby-projects)
- [Comparing top hosting platforms with free plans for your hobby projects](#comparing-top-hosting-platforms-with-free-plans-for-your-hobby-projects)

## Prerequisites

Some hosting platforms allow deployment from the command line. Therefore, you need to have some or all of the following tools to attempt the examples in this article. However, you may not need them for some hosting platforms or deployment methods.

- The Node runtime environment. You can install Node for your system from the [Node downloads page](https://nodejs.org/en/download/).
- The version control system Git. Install Git for your operating system from the [Git downloads page](https://git-scm.com/downloads).

## How to create refine application

We will create a simple [refine](https://github.com/refinedev/refine) application in this section and deploy it to some of the hosting platforms in the next. Refine is a React framework for developing web applications. It is handy for developing data-intensive applications such as admin panels and dashboards. 

If you have the Node runtime environment installed on your machine, follow the steps below to bootstrap a simple Refine application.

### Step 1 - Create a simple refine application

You can create a simple Refine application using [superplate](https://github.com/pankod/superplate). It is a handy tool for creating production-ready React projects quickly.

```sh
npx superplate-cli refine-react-example --project refine-react
```

The command above will create a `refine-react` project in the `refine-react-example` directory. You respond to the command line prompts as you bootstrap the application. You can choose the default options throughout if you wish.

### Step 2 -  Navigate to the project directory

Navigate to the directory you created in the previous step using the command below and open it in a text editor of your choice.

```sh
cd refine-react-example
```

If you are using VS Code, use the `code .` command to open the current directory in VS code.

### Step 3 - Launch the development server

After navigating to the project directory, use the command below to launch the development server.

```sh
npm run dev
```

The command above will create a development build of the example project and launch a development server on `localhost`. Your project should now be ready for deployment to the platforms we will explore in the next section.

## Top hosting platforms with free plans for your hobby projects

This section will explore the top hosting platforms with free plans for hosting your hobby projects. Though there are several such hosting platforms, I have picked the following because they have generous free plans and don't require a credit card or payment information to start using.

- Netlify
- Vercel
- Surge.sh
- Render
- GitHub pages

Apart from the platforms listed above, several equally good platforms you can use to host your hobby projects exist. Below is a list of the other platforms we won't cover in this article but are also worth exploring.

- Digital Ocean
- Cloudflare
- Firebase hosting

---


<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />



---

### Vercel

[Vercel](https://vercel.com/) is one of the popular hosting platforms that enables front-end developers to develop, preview, and ship applications fast. It supports the most popular front-end frameworks like React, Next, and Gatsby. If you want to test or showcase a hobby project, Vercel also has a generous free plan.

It offers several deployment options. These deployment methods include:

- Deploying from a Git hosting service like GitHub, GitLab, and BitBucket
- Using the Vercel command line tool
- Using Deploy hooks
- Using the Vercel API

The choice of deployment method depends on your needs. We will look at deploying using the Vercel command line tool in the section below.

#### How to deploy to Vercel using the command line tool

In this section,  you will deploy the refine application we created to Vercel using the command line tool. To start using the free plan, sign up using your email, GitHub, GitLab, or BitBucket account. Follow the steps below to use the command line tool after creating an account.

##### Step 1 - Install the Vercel command line tool

Install the Vercel command line tool using the command below. You can install it globally or as a development dependency. We assume you installed the command line tool globally for all the examples in this article.

```sh
# Install globally
npm install --global vercel

# Install as development dependency
npm install --save-dev vercel
```

##### Step 2 - Documentation for the `vercel` command line tool

After successfully installing the command line tool, you can access its documentation from the terminal using the command below.

```sh
vercel --help

# Alternatively use the command below

vercel -h
```

##### Step 2 - Deploy to Vercel

To deploy the example project to Vercel from the command line, navigate to the project directory and use the command below to initiate the deployment process.

```sh
vercel deploy
```

If it is your first time using the command line tool, log into your Vercel account. You must respond to the command line prompts as part of the deployment process.

Though we have explored deployment to Vercel from the command line in this article, you can also explore the other deployment options mentioned above.

#### Pros of using Vercel

As mentioned above, Vercel is popular and feature-rich. Below are some of the benefits that come with using Vercel.

- Possible to integrate Git hosting services like GitHub, GitLab, and BitBucket
- Vercel offers a generous free plan. It doesn't require a credit card for the free plan
- Supports popular front-end frameworks like React, Next, Gatsby, and Vue
- You can deploy and execute server-less functions
- Several project templates to bootstrap a new application
- Performance monitoring with Vercel analytics



### Netlify

[Netlify](https://www.netlify.com/) is another popular platform for hosting static and Jamstack applications. For most front-end developers looking to deploy a simple static site, Netlify is almost always the first choice because of all the features provided with the free plan. It offers a diverse range of deployment options. The simplest deployment option is to drag and drop the production build on the Netlify UI.

#### How to deploy to Netlify

As highlighted above, Netlify provides a simple UI and diverse deployment options. Some Netlify deployment methods include dragging and dropping the production build in the Netlify UI, using the command line tool, and continuous deployment from a Git hosting service like GitHub, BitBucket, or GitLab.

We will explore how to use the command line tool in the steps below by deploying the example project to Netlify using the `netlify-cli` tool. You have to read the documentation to learn about the other deployment options.

##### Step 1 - Install the Netlify command line tool

You need to have Node version 16 or later to use the command line tool. You can install the `netlify-cli` package globally like so:

```sh
npm install -g netlify-cli
```

You need to install the command line tool as a development dependency if you want to use it in a CI workflow.

```sh
npm install --save-dev netlify-cli
```

##### Step 2 - Log into your Netlify account

Log into your Netlify account using the command below to interact with it from the command line. It will open the Netlify login page in your default browser. Grant access to the command line tool from the Netlify UI after login.

```sh
netlify login
```

##### Step 3 - Deploy to Netlify

To deploy a site manually from the command line, run the command below on the terminal after building your project for production. The production build of the example project will be in the `build` directory after running `npm run build`.

```sh
netlify deploy --prod
```

The command above will initiate the deployment. It will prompt you to provide the directory to deploy. The current directory is the default deploy directory.

The Netlify command line tool has several functions we haven't covered in this article. You read the documentation for more of its features. Though we covered deployment from the command line in this article, the most popular deployment option is from a Git provider like GitHub, GitLab, or BitBucket. You can link a Git repository from the Netlify UI.

#### Pros of using Netlify

Several features make Netlify an ideal choice for hosting static and Jamstack applications. Though we can't exhaust all of them in this article, below are some benefits of using Netlify as a hosting platform.

- Generous free plan with unlimited personal projects
- Offers 300 build minutes per month for the free plan
- Comprehensive documentation
- Active community support for both free and paid plans
- Sign up and deploy. No credit card is required to start using the free plan
- It has a feature for deploying server-less functions
- Netlify form functionality for simple file submissions
- Out-of-the-box support for popular front-end frameworks like React, Next, and Vue
- Support for CI workflow
- You can use a custom domain with free SSL on the free plan
- Multiple deployment options

From the features mentioned above, Netlify is a feature-rich platform worth exploring. It is among the top choices for most front-end developers who want to deploy a static site or Jamstack application.

#### Cons of using Netlify

- Suitable for hosting only Jamstack applications

### Surge.sh

If you want to deploy a static website comprising HTML, CSS, JavaScript, and other assets, [Surge.sh](https://surge.sh/) is another platform worth checking out. It offers a generous free plan for hosting simple hobby projects.

However, you need to switch to the paid plan if you want back-end features. You can deploy from the command line using the `surge` command line tool. If you have installed Node, follow the steps below to start using Surge.sh.

#### Step 1 -  Install the `surge` command line tool

Install the `surge` command line tool by running the command below on the terminal.

```sh
npm install --global surge
```

The `surge` command line tool has commands for creating an account, logging into an existing account, logging out of an existing account, deploying projects, tearing down deployed projects, and setting account plans.

After installing the `surge` command line tool, you can use the command below to display its documentation.

```sh
surge --help
```

#### Step 2 - Create Surge.sh account

After installing the command line tool, create a Surge.sh account using an email id and a password. Use the `surge` command to create a new account or log into an existing one. For a new account, you will receive a verification email.

```sh
surge
```

The above command will also initiate the project deployment. It will prompt you for the project directory and the domain to which you want to deploy the project. The current directory is the default deployment directory.

You can also pass the project directory and the domain as arguments to the `surge` command. Make sure the domain name is available. In the example below, `build` is the directory to deploy, and `my-hobby-project.surge.sh` is the domain name.

```sh
surge build my-hobby-project.surge.sh 
```

If your project has a build step, like with most front-end frameworks, run the build command before initiating the deployment process. However, you can install the command line tool as a development dependency and combine the build and deployment steps using an NPM script. We will look at how to do so in step 3.

After successfully deploying the project, you will get the URL for the deployed project.

#### Step 3 - Install the `surge` command line tool as development dependency

If you use a front-end framework like React or refine, you build the project before initiating the deployment process. However, you can install the surge command line tool as a development dependency and combine the build and deploy steps into a single command.

If you have the example project we created in one of the sections above, run the command below to install the surge command line tool as a development dependency.

```sh
npm install --save-dev surge
```

Add the following script to your `package.json` file. The command below assumes you have the build script in your `package.json` file, and running it will generate the `build` directory.

```json
{

  "scripts": {
    "deploy:surge": "npm run build && surge build my-hobby-project.surge.sh"
  }

}
```

Running the `npm run deploy:surge` command will build the project and deploy it to Surge.sh on the specified domain. We will explore the pros and cons of using Surge.sh in the sub-sections below.

#### Pros of using Surge.sh

- Fast deployment from the command line
- You can add a custom domain with the free plan
- It offers a generous free plan
- Free SSL

#### Cons of using Surge.sh

- You can't use it to host back-end projects

### Render

Most of the hosting platforms covered in this article are suitable for hosting front-end projects. However, several other platforms you can use to host front-end, back-end, or full-stack applications exist. One such platform is [Render](https://render.com/). We will deploy the front-end project we created above to Render.

It is easy to pick up Render if you have ever used Heroku. The two platforms have a lot in common. Follow the steps below to start using Render.

#### Step 1 - Create a Render account

Like most other platforms I have highlighted in this article, you need to have an account with Render to start using it. Log into an existing account if you already have an account, or you can sign up using your e-mail address; GitHub, GitLab, or BitBucket account.

#### Step 2 - Host your project on a Git provider

You host the project on a Git hosting service like GitHub or GitLab to deploy to Render. You can deploy the source code for the example project we created in one of the sections above to GitHub or GitLab.

#### Step 3 - Deploy to Render

To deploy to Render, log in and navigate to your dashboard. The dashboard has several options to choose from when making a deployment. To deploy the example project, you can select the static option. You will need to provide details such as the GitHub or GitLab repository of the project source code, the build script, and a unique name to use as the project sub-domain. Render will clone the project and deploy it for you.

#### The pros of using Render

- It can host front-end, back-end, and full-stack applications
- It has a generous free plan
- Simple deployment from your preferred Git provider
- Good documentation
- Vibrant community support
- It offers DDOS protection

#### The cons of using Render

- It  doesn't support BitBucket as a Git provider

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>


### GitHub pages

GitHub is the most popular cloud-based Git hosting service. In addition to being a Git hosting service, GitHub also offers free static site hosting service referred to as [GitHub pages](https://pages.github.com/). You can publish static sites built with HTML, CSS, and JavaScript directly from a GitHub repository. You can host static websites on the default `github.io` domain or use a custom domain name.

Follow the steps below to learn how to use GitHub pages. We will deploy the example project we created at the beginning of this article to GitHub pages.

#### Step 1 - Create a GitHub account

Like any other hosting platform, you need a GitHub account to start using GitHub pages. You can sign up using your e-mail address if you don't have an account.

#### Step 2 - Create a GitHub repository

Log into your GitHub account and create a new public GitHub repository. With GitHub pages, you can deploy to a GitHub user site or project site. Each GitHub user can deploy multiple project sites but a maximum of one user site.

The repository name should take the form `<username>.github.io` if you want to deploy the project to a user or organization site. The username is your actual GitHub username or organization name. If your username is `doe`, the repository name should be `doe.github.io`.

On the other hand, give the repository any name if you want to deploy it to a project site.

#### Step 3 - Deploy your project to GitHub pages

If you want to deploy a simple static site without a build process, you can create your index HTML file at the root of the project directory and push it to the GitHub repository created in the previous step. Then go to the GitHub repository **Settings** and click the **Pages** option under the **Code and automation** section.

You will choose whether to deploy from a branch or GitHub actions. The default option is to deploy from a branch. While writing this article, deployment using GitHub actions is still in beta. After selecting the deployment method, choose the branch to deploy and save your settings. The build and deployment process begins.

After the deployment process completes, refresh the **Setting** page to obtain a link to your deployed project.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-23-top-hosting/github-pages-setting.png"  alt="github setting" />

</div>

<br />


However, if you use a front-end framework like React, you need a build step. For our case, we will deploy the Refine project we created at the beginning of this article. As pointed out in the introduction, Refine is a React-based framework. Therefore you will need to install the `gh-pages` package to help with the deployment.

#### Step 4 - Install `gh-pages`

To deploy a front-end framework like React, `gh-pages` is a handy package. You can install it as a development dependency using the command below.

```sh
npm install gh-pages --save-dev
```

After installing `gh-pages`, add the following scripts to the `scripts` field of your `package.json` file.

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Similarly, add the `homepage` field to your`package.json` file. Its value depends on whether you want to deploy a user or a project site. It should look like the example below for a user site. The `username` is your GitHub username.

```json
{
  "homepage": "https://<username>.github.io"
}
```

The code below illustrates how you can set the value of the `homepage` field in the `package.json` file when deploying a project site. As pointed out above, the `username` is your GitHub username, and the `repository` is your repository name.

```json
{
  "homepage": "https://<username>.github.io/<repository>"
}
```

If you run the `npm run deploy` command on the terminal, `gh-pages` will build the project for production and push the changes to GitHub on a separate branch.

That is just about everything you need to use GitHub pages for hosting your project.

Though we learned how to use GitHub pages in this section, other Git providers also have similar hosting services. For example, GitLab has GitLab pages. Check the documentation for each Git provider to learn about its hosting services. The deployment process for the other Git providers should be similar to that of GitHub.

#### The pros of using GitHub pages

- Ideal for hosting static sites
- Enforce HTTPS out of the box
- Simple deployment
- Good documentation
- Vibrant community support

#### The cons of using GitHub pages

- Suitable for hosting only static sites
- More demanding to deploy front-end frameworks like React
- Source repositories must not be larger than 1 GB
- GitHub page sites have a limit of 10 builds per hour

## Comparing top hosting platforms with free plans for your hobby projects

This section will highlight some differences and similarities among the hosting platforms described in the previous sections. Though most of the hosting platforms are for hosting specific applications, the table below will attempt to highlight some of the issues you might consider when choosing a hosting platform for your hobby project.

|                                  | Vercel                                 | Netlify                                   | Render                                   | Surge.sh           | GitHub pages       |
| -------------------------------- | -------------------------------------- | ----------------------------------------- | ---------------------------------------- | ------------------ | ------------------ |
| Type of apps                     | Static and Jamstack apps               | Static and Jamstack apps                  | Front-end, Back-end, and Full-stack apps | Static sites       | Static sites       |
| Documentation                    | Good                                   | Good                                      | Good                                     | Good               | Good               |
| Build time for free plan         | 6000 minutes per month                 | 300 minutes per month per project         | 400 hours per month                      | Not applicable     | 10 builds per hour |
| Git integration                  | GitHub, GitLab, BitBucket              | GitHub, GitLab, BitBucket                 | GitHub, GitLab                           | None               | GitHub             |
| Community Support                | Good                                   | Good                                      | Good                                     | Good               | Good               |
| Deployment options               | Command line, Git provider, Vercel API | Drag and drop, Command line, Git provider | Command line, Git provider               | Command line       | GitHub             |
| Support for CI workflow          | Yes                                    | Yes                                       | Yes                                      | No                 | Yes                |
| Pricing                          | Generous free plan                     | Generous free plan                        | Generous free plan                       | Generous free plan | Free               |
| Secure HTTPS                     | Yes                                    | Yes                                       | Yes                                      | Yes                | Yes                |
| Support for front-end frameworks | Good                                   | Good                                      | Good                                     | Good               | Good               |

### Conclusion

From the highlights above, Netlify and Vercel are among the top contenders for the preferred hosting platform if you want to deploy a static site or a Jamstack application. They have out-of-the-box features that make deployment and collaboration a breeze. They also have plenty of plugins if the built-in features do not satisfy your use cases.

On the other hand, if you are looking to host a front-end, full-stack, or back-end application, Render is also an excellent choice. It is very similar to Heroku. Render comes in handy for hosting your hobby projects now that Heroku is about to drop support for their free plan.

There are several other hosting platforms like Digital ocean that we haven't covered in this article. They also offer generous free plans. However, you register with a credit card or payment method to use most of them.

Hopefully, this article has given you enough information to choose a platform that meets your project's requirements.
