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
2. Using a complete **UI Framework** such as [Ant Design](https://ant.design/), [Material UI](https://mui.com/), [Mantine](https://mantine.dev/) etc.

These tutorials will go through process of building a simple _admin panel_ for a _CMS-like_ application.

Step by step, you're going to learn how to consume a _REST API_ and add basic CRUD functionality to your panel leveraging the unique capabilities of **refine**.

### Tutorial guides

<div className="tutorial-cards">
    <Card
        iconPath={"/img/tutorial-cards/tailwind-icon.png"}
        title={"Tailwind CSS"}
        direction={"/docs/tutorials/headless-tutorial"}
        alt={"Tailwind Icon"}
    />
    <Card
        iconPath={"/img/tutorial-cards/antd-icon.png"}
        title={"Ant Design"}
        direction={"/docs/tutorials/ant-design-tutorial"}
        alt={"Ant Design Icon"}
    />
     <Card
        iconPath={"/img/tutorial-cards/mantine-icon.png"}
        title={"Mantine"}
        direction={"/docs/tutorials/mantine-tutorial"}
        alt={"Mantine Icon"}
    />
     <Card
        iconPath={"/img/tutorial-cards/mui-icon.png"}
        title={"Material UI"}
        direction={"/docs/tutorials/material-ui-tutorial"}
        alt={"Material UI Icon"}
    />
</div>