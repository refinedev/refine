---
id: tutorials
title: Welcome to refine!
sidebar_label: Tutorials
slug: /
---

import Card from "@site/src/components/tutorial-card";

refine is a **headless** Framework, so it does not include UI Components by default.

There are two ways to add UI elements to refine;

1. Using a **UI Library** such as [Tailwind](https://tailwindcss.com/), [Chakra UI](https://chakra-ui.com/), etc.
2. Using a complete **UI Framework** such as [Ant Design](https://ant.design/), [Material UI](https://mui.com/), [Mantine](https://mantine.dev/), [Chakra UI](https://chakra-ui.com/) etc.

These tutorials will go through process of building a simple _admin panel_ for a _CMS-like_ application.

Step by step, you're going to learn how to consume a _REST API_ and add basic CRUD functionality to your panel leveraging the unique capabilities of **refine**.


### Prerequisites

**refine** is composed of several popular libraries to make modern web development easier. Unfortunately, we can't teach all of those technologies from scratch during this tutorial, so we're going to assume you are already familiar with core React concepts.

#### Node.js and NPM/PnPM/Yarn Versions

If your system versions do not meet both requirements, the installation bootstrap will result in an ERROR. 

- node: `>=16.x`
- yarn: `>=1.15` or npm: `>=8.x` or PnPm: `>=7.x`

To check, please run the following commands from your terminal:

```bash
node -v
npm -v # for npm users
pnpm -v # for pnpm users
yarn -v # for yarn users
```

Then continue with the next step when ready!

### Tutorials

Instead of being a limited set of pre-styled components, **refine** is a collection of helper `hooks`, `components`, and `providers`. They are all decoupled from *UI components* and *business logic*, so that they never keep you from customizing your *UI* or coding your own flow. 

Our [Tailwind CSS](https://tailwindcss.com/) tutorial below is a good starting point for users who want to go [headless](/docs/getting-started/overview.md/#what-do-you-mean-by-headless-). For convenience, **refine** ships with ready-made integrations for [Ant Design System](https://ant.design/), [Material UI](https://mui.com/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/). 

<div className="tutorial-cards">
    <Card
        iconPath={"/img/tutorial-cards/tailwind-icon.svg"}
        title={"Tailwind CSS"}
        direction={"/docs/tutorials/headless-tutorial"}
        alt={"Tailwind Icon"}
    />
    <Card
        iconPath={"/img/tutorial-cards/antd-icon.svg"}
        title={"Ant Design"}
        direction={"/docs/tutorials/ant-design-tutorial"}
        alt={"Ant Design Icon"}
    />
     <Card
        iconPath={"/img/tutorial-cards/mantine-icon.svg"}
        title={"Mantine"}
        direction={"/docs/tutorials/mantine-tutorial"}
        alt={"Mantine Icon"}
    />
    <Card
        iconPath={"/img/tutorial-cards/mui-icon.svg"}
        title={"Material UI"}
        direction={"/docs/tutorials/material-ui-tutorial"}
        alt={"Material UI Icon"}
    />
    <Card
        iconPath={"/img/tutorial-cards/chakra-icon.svg"}
        title={"Chakra UI"}
        direction={"/docs/tutorials/chakra-ui-tutorial"}
        alt={"Chakra UI Icon"}
    />
</div>