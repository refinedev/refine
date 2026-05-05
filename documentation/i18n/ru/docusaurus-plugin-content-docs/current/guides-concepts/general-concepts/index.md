---
title: "Общие концепции | Refine v5"
display_title: "Общие концепции"
sidebar_label: "Общие концепции"
description: "Изучите headless architecture, resources, providers, hooks и meta в Refine."
---

Refine — расширяемый framework для быстрой разработки веб-приложений. Его архитектура основана на **hooks**, подключаемых **providers** и надежной работе с данными и состоянием.

## Headless concept

Refine не заставляет использовать фиксированный набор UI components. Он предоставляет `hooks`, `components`, `providers` и utilities, отделяя бизнес-логику от интерфейса.

Так можно применять собственный дизайн или UI frameworks вроде Tailwind CSS, Ant Design, Material UI, Mantine и Chakra UI, сохраняя преимущества `@refinedev/core`.

## Resource

**Resource** представляет сущность приложения: `products`, `blogPosts`, `orders`. Resource связывает routes, CRUD operations, menus и providers в понятную структуру.

## Providers

Providers отвечают за data, authentication, authorization, notifications, i18n, realtime, routing и audit logs. Можно использовать встроенные providers или создать собственные.

## Hooks

Hooks Refine headless и не зависят от UI library. `useGo`, `useCan` и `useTranslate` дают единый интерфейс для navigation, permissions и translations.

## Meta

Свойство `meta` передает providers и hooks дополнительные данные: headers, специальные параметры, field selection, multi-tenancy или GraphQL query generation.
