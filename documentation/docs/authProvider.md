---
title: Auth Providers
sidebar_label: Auth Providers
---

refine lets you secure your admin app with the authentication strategy of your choice. Since there are many possible strategies (Basic Auth, JWT, OAuth, etc.), refine delegates authentication logic to an authProvider.

## Enabling Auth Features

By default, refine apps don’t require authentication. To restrict access to the admin, pass an authProvider to the `<Admin>` component.
