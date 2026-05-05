---
title: "Inicio rápido | Primeros pasos en Refine v5"
display_title: "Guía de inicio rápido"
sidebar_label: "Guía de inicio rápido"
description: "Crea un proyecto Refine v5 con el scaffolder del navegador o la CLI y continúa hacia los tutoriales."
displayed_sidebar: mainSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Playground } from "@site/src/components/playground";

**Refine** funciona en cualquier entorno que pueda ejecutar **React**, incluidos Vite, Next.js, Remix y CRA.

Puedes instalar los paquetes manualmente, pero la forma recomendada de empezar es usar el scaffolder del navegador o la CLI. Ambos permiten elegir framework, UI, data provider, autenticación e i18n antes de crear el proyecto.

## Usar la CLI

Ejecuta `create-refine-app` para generar un proyecto con opciones guiadas:

```sh
npm create refine-app@latest
```

Después de responder las preguntas, entra en la carpeta generada, instala dependencias si hace falta y levanta el servidor de desarrollo con el comando indicado por la CLI.

## Usar el navegador

El scaffolder del navegador ofrece las mismas decisiones principales que la CLI y permite previsualizar el resultado antes de descargarlo.

<Playground />

## Próximos pasos

Continúa con los [tutoriales](/core/tutorial) para convertir el proyecto inicial en una aplicación CRUD completa, revisa los [ejemplos reales](/core/templates) o lee las guías de [conceptos generales](/core/docs/guides-concepts/general-concepts/) y [data fetching](/core/docs/guides-concepts/data-fetching/).
