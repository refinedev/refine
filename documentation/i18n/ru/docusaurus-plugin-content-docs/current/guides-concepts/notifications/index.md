---
title: "Notifications | Refine v5"
display_title: "Notifications"
sidebar_label: "Notifications"
description: "Показывайте success и error messages через notification provider Refine."
---

Notifications подтверждают действия и объясняют ошибки. Refine использует `notificationProvider`, чтобы показывать messages из hooks, mutations и components.

## Notification provider

Provider обычно предоставляет `open` и иногда `close`.

```tsx
const notificationProvider = {
  open: ({ type, message, description }) => {
    console.log(type, message, description);
  },
  close: (key) => console.log("close", key),
};
```

Integrations для Ant Design, Material UI, Mantine и Chakra UI могут подключить их notification systems к Refine.

В localized app переводите titles и descriptions, чтобы сообщения были понятны пользователю.
