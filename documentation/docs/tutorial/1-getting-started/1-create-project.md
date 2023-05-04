---
id: create-project
title: 3. Creating Your Project Using refine.new
tutorial:
    prev: tutorial/getting-started/{preferredUI}/prepare-env
    next: tutorial/getting-started/{preferredUI}/generate-crud-pages
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Use refine.new to initialize refine app

**refine.new** is a quick way to initialize a **refine** app and deploy it instantly to the cloud. It can be done from https://refine.new.

Before initialization, we are given options to choose the stacks we want to use in our app. We can choose from CRA, Next.js or Remix for project initialization; Material UI, Ant Design or Chakra UI for the frontend; integrate with REST API, Supabase or Strapi in the backend; and use auth providers such as Google Auth, etc.

We will be using [**Create React App**](), [**Material UI**](),  a simple REST API and [**Google Auth**]() for our app. So let's navigate to [**refine.new**](https://refine.new) and follow the steps as below:

1. Start the **refine CLI Wizard**  by clicking the "Let's Start" button. **refine.new** will present a step by step form with options to choose from:

![1-refine.new-lets-start](https://imgbox.com/Xaj65c42)

2. Choose the above options one by one, by clicking `Continue` button one after completing each section for the form.

![2-refine.new-choose-cra](https://imgbox.com/V6mPfKhZ)

3. After completing and reviewing each step, click the `Continue` button a final time and within a minute or so our **refine** app should be initialized, built and deployed in the cloud.

We should then be directed to the preview of an actual running instance of the app:

As we can see, the app is running smoothly on **refine.new** and we are presented with a choice to login with Google:

![3-refine.new-google-login](https://imgbox.com/PMO5PHmY)

If we use our Google account to log in, we are able to access all parts via the **refine.new** UI interface:

![4-refine.new-app-preview](https://imgbox.com/sdhqKbvR)

Please feel free to navigate through the app and try out CRUD actions for blog and category items.

