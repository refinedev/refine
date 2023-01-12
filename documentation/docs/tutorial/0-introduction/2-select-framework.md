---
id: select-framework
title: 3. Selection of UI Framework
tutorial:
    order: 2
    prev: tutorial/introduction/prequisite
    next: tutorial/getting-started/index
---

import { SelectTutorialFramework } from '../../../src/components/select-tutorial-framework';

**refine** is a headless framework. It means you can build your app without any UI frameworks. However, **refine** has built-in support for the most popular UI frameworks like **Material UI**, **Ant Design**, **Mantine**, and **Chakra UI**. You can speed up your app UI development with these powerful frameworks.

Before you start, you can read the [API references](/docs/api-reference/) of the UI frameworks to get more information about them.

<h3>Select a UI Framework</h3>

After this step, the tutorial will proceed according to your UI framework choice. You can choose one of the following UI frameworks or just go with the headless UI option:

<SelectTutorialFramework />

<br/>

<UIConditional is="antd">

The tutorial will continue with **Ant Design**.

</UIConditional>

<UIConditional is="chakra-ui">

The tutorial will continue with **Chakra UI**.

</UIConditional>

<UIConditional is="headless">

The tutorial will continue like a **headless**.

</UIConditional>

<UIConditional is="mantine">

The tutorial will continue with **Mantine**.

</UIConditional>

<UIConditional is="mui">

The tutorial will continue with **Material UI**.

</UIConditional>

<br/>

<Checklist>

<ChecklistItem id="select-framework">
I understood that refine is a headless framework.
</ChecklistItem>
<ChecklistItem id="select-framework-2">
I understood that refine has built-in support for the most popular UI frameworks.
</ChecklistItem>
<ChecklistItem id="select-framework-3">
I have selected a UI framework.
</ChecklistItem>

</Checklist>
