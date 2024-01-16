---
title: Introduction
---

import { Sandpack, ChangeAppTsxSpan, AddFileSpan, UpdateFileSpan } from "./sandpack.tsx";
import { TutorialParameterDropdown } from "@site/src/refine-theme/tutorial-parameter-dropdown";

<Sandpack>

This tutorial will walk you through from essentials of Refine to advanced topics. You'll learn how to build a full-featured CRUD applications with Refine.

Refine is router agnostic and you're free to choose the routing library you're most familiar with. Refine officially supports [React Router DOM](#), [Next.js](#) and [Remix](#). In the further steps of the tutorial, you'll be presented with the related content based on your routing selection. You can always change your selection and see the content for the other libraries throughout the tutorial.

Pick the Routing library you want to continue with:

<TutorialParameterDropdown parameter="routerSelection" label="Routing" className="w-min pb-4" />

In the further units of this tutorial, you'll be selecting a UI framework integration of Refine and learn more about how UI integrations are made and where they can be useful. While Refine provides official support for Ant Design, Material UI, Mantine and Chakra UI, the tutorial is prepared for the top two most used UI frameworks; [Ant Design](#) and [Material UI](#).

Pick the UI framework you want to continue with:

<TutorialParameterDropdown parameter="uiSelection" label="UI Framework" className="w-min pb-4" />

You can find the corresponding material that is taught in this tutorial for the other UI frameworks in the [documentation](#).

</Sandpack>
