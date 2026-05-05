---
title: "Notificaciones | Refine v5"
display_title: "Notificaciones"
sidebar_label: "Notificaciones"
description: "Muestra mensajes de éxito y error con el notification provider de Refine."
---

Las notificaciones ayudan a confirmar acciones y explicar errores. Refine usa un `notificationProvider` para mostrar mensajes desde hooks, mutaciones y componentes.

## Notification provider

Un provider suele exponer un método `open` para mostrar mensajes y, opcionalmente, un método `close` para cerrarlos.

```tsx
const notificationProvider = {
  open: ({ type, message, description }) => {
    console.log(type, message, description);
  },
  close: (key) => {
    console.log("close", key);
  },
};
```

## Integraciones de UI

Las integraciones de Ant Design, Material UI, Mantine y Chakra UI pueden conectar sus sistemas de notificaciones con Refine.

## i18n

En aplicaciones localizadas, traduce títulos y descripciones de notificaciones para que los mensajes de éxito, error y advertencia sean claros en el idioma del usuario.
