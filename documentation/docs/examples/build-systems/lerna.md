---
id: lerna
title: Monorepo with Lerna
example-tags: [build-systems]
---

[Lerna](https://lerna.js.org) is a fast, modern build system for managing and publishing multiple JavaScript/TypeScript packages from the same repository. In this example, you'll see how to use Lerna to setup a monorepo with Refine.

If you're going to use Refine in your monorepo setup or create one from scratch, you can use this example as a starting point.

<CodeSandboxExample path="monorepo-with-lerna" hideSandbox />

## Using `bootstrap`

Lerna provides a [`bootstrap`](https://lerna.js.org/docs/legacy-package-management#migrating-from-lerna-bootstrap-lerna-add-and-lerna-link-in-lerna-v7-and-later) command that links packages together. This is useful when you want to use packages from the same monorepo in your application before publishing them to a registry.

In this example, you'll find a basic setup of `lerna` using the `bootstrap` command.

<CodeSandboxExample path="monorepo-with-lerna-bootstrap" hideSandbox />
