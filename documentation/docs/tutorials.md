---
id: tutorials
title: Tutorials
sidebar_label: Tutorials
slug: /
---

import Card from "@site/src/components/tutorial-card";

## Introduction

refine is a **headless** Framework, so it does not include UI Components by default.

There are two ways to add UI elements to refine;

1. Using a **UI Library** such as [Tailwind](https://tailwindcss.com/), [Chakra UI](https://chakra-ui.com/), etc.
2. Using a complete **UI Framework** such as [Ant Design](https://ant.design/), [Material UI](https://mui.com/), [Mantine](https://mantine.dev/) etc.

These tutorials will go through process of building a simple _admin panel_ for a _CMS-like_ application.

Step by step, you're going to learn how to consume a _REST API_ and add basic CRUD functionality to your panel leveraging the unique capabilities of **refine**.

<div className="tutorial-cards">
    <Card
        iconPath={"/img/cra-tailwind.png"}
        title={"Refine Core - Tailwind - CRA"}
        direction={"/docs/tutorials/headless-tutorial"}
    />
    <Card
        iconPath={"/img/cra-antd.png"}
        title={"Refine Core & Ant Design - CRA"}
        direction={"/docs/tutorials/ant-design-tutorial"}
    />
     <Card
        iconPath={"/img/cra-mantine.png"}
        title={"Refine Core & Mantine - CRA"}
        direction={"/docs/tutorials/mantine-tutorial"}
    />
     <Card
        iconPath={"/img/cra-mui.png"}
        title={"Refine Core & Material UI - CRA"}
        direction={"/docs/tutorials/material-ui-tutorial"}
    />
</div>