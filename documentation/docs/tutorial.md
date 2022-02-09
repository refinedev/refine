---
id: tutorial
title: Tutorial
sidebar_label: Tutorial
slug: /
---

import Card from "@site/src/components/tutorial-card";

## Introduction

Refine is a **Headless** React Framework, it does not include a UI Component by default. 

There are two ways to add UI elements to Refine;

1. Using a **UI Library** such as [Tailwind](https://tailwindcss.com/), [Chakra UI](https://chakra-ui.com/), etc.
2. Using a complete **UI Framework** such as [Ant Design](https://ant.design/), [Material UI](https://mui.com/), etc.

These tutorials will go through process of building a simple _admin panel_ for a _CMS-like_ application.

Step by step, you're going to learn how to consume a _REST API_ and add basic CRUD functionality to your panel leveraging the unique capabilities of **refine**.

<div
    style={{
        display: "grid",
        "grid-template-columns": "repeat(2, minmax(0px, 1fr))",
        gap: "16px",
        marginTop: "24px",
    }}
>
    <Card
        iconPath={"/img/cra-tailwind.png"}
        title={"Refine Core - Tailwind - CRA"}
        direction={"/docs/next/core/tutorial"}
    />
    <Card
        iconPath={"/img/cra-antd.png"}
        title={"Refine Core & Ant Design - CRA"}
        direction={"/docs/next/ui-frameworks/antd/tutorial"}
    />
</div>

