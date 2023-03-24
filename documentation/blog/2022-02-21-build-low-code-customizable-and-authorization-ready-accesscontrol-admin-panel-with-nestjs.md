---
title: Build low-code, customizable and authorization ready (accesscontrol) admin panel with NestJS.
description: Build authorization ready admin panel with NestJS.
slug: how-to-access-control-with-nestjs
authors: yildiray
tags: [nestjs, access-control, refine]
image: https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png
hide_table_of_contents: false
---

In the [previous blog post](https://refine.dev/blog/customizable-admin-panel-with-nestjs), we used [nestjs](https://nestjs.com) with an api and [refine](https://refine.dev) in the admin panel. In this blog, let's add **authorization** to both api and admin panel.

<!--truncate-->

**All the steps described are in this [repo](https://github.com/refinedev/refine-hackathon/tree/main/job-posting-app).**

## Intro

In the [previous blog post](https://dev.to/refine/build-fast-and-customizable-admin-panel-with-nestjs-291), we used [nestjs](https://nestjs.com) with an api and [refine](https://refine.dev) in the admin panel. In this blog, let's add **authorization** to both api and admin panel.

## Scenario
Let's have two roles in this system, they are `admin` and `editor`. In the API we prepared, we had two crud processes that we categorized as `companies` and `jobs`.

In this scenario; `editor` can only list companies, not any deletion or additions. Have the authority to list and create job postings. Let `admin` have authorization for all transactions.

## Authorization

I used [nestjsx-crud](https://github.com/nestjsx/crud) in the api we prepared. This library makes `CRUD` operations very easy. However, there is no support on the authorization side. That's why I made use of the [accesscontrol](https://github.com/onury/accesscontrol) library, which can be easily integrated with both `nestjs` and `refine`. 

## Using AccessControl in API

In the first step, let's install [nestjs-access-control](https://github.com/nestjsx/nest-access-control) in our project for `accesscontrol` integration to the api.

```
npm install nest-access-control
```

I'm specifying a role as the `AccessControl` supports. According to our scenario, this should be as follows:

```ts
// app.roles.ts

import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // editor
  .grant(AppRoles.EDITOR)
  .create('jobs')
  .update('jobs')
  // admin
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.EDITOR)
  .create(['companies'])
  .update(['companies'])
  .delete(['companies', 'jobs']);
```

Now I import `AccessControlModule`.

```ts
  // app.module.ts

  import { roles } from './app.roles';

    @Module({
      imports: [
        ...
        AccessControlModule.forRoles(roles)
      ],
      controllers: [...],
      providers: [...],
    })
    export class AppModule {}
```

After determining the roles and privileges, we add the `ACGuard` class to the controller `UseGuards`.

```ts
import { ACGuard } from 'nest-access-control';

...
@UseGuards(JwtAuthGuard, ACGuard)
@Controller('companies')
export class CompanyController implements CrudController<CompanyEntity> {}
...
```

Now we define resource and action for methods using `UseRoles` decorator. For example, we **override** for the `companies` resource and the `create` action as follows.

```ts
import { ACGuard, UseRoles } from 'nest-access-control';

...
@UseGuards(JwtAuthGuard, ACGuard)
@Controller('companies')
export class CompanyController implements CrudController<CompanyEntity> {
  constructor(public service: CompanyService) {}

  get base(): CrudController<CompanyEntity> {
    return this;
  }

  @Override()
  @UseRoles({
    resource: 'companies',
    action: 'create',
  })
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CompanyCreateDto,
  ) {
    return this.base.createOneBase(req, <CompanyEntity>dto);
  }
...
```

Similarly, we add this decorator for other methods.

After these operations, we complete the authorization process on the API side. Now we will do the authorization to the admin panel that we created with `refine`.

## Using AccessControl in refine (dashboard)

refine; It supports many authorization tools, very flexible. What we need to do; Defining an `accessControlProvider` inside the `<Refine />` component.

`accessControlProvider` is implemented only one asynchronous method named "can" to be used to control whether the requested access is granted. This method takes `resource` and `action` with parameters.

```tsx
// App.tsx

<Refine
  ...
  accessControlProvider={{
    can: async ({ resource, action }) => {
      let can: boolean = false;
      const stringifyUser = localStorage.getItem('refine-user');
      if (stringifyUser) {
        const { roles } = JSON.parse(stringifyUser);

        roles.forEach((role: string) => {
          switch (action) {
            case 'list':
            case 'show':
              can = ac.can(role).read(resource).granted;
              break;
            case 'create':
              can = ac.can(role).create(resource).granted;
              break;
            case 'edit':
              can = ac.can(role).update(resource).granted;
              break;
            case 'delete':
              can = ac.can(role).delete(resource).granted;
              break;
          }
        });
      }
      return Promise.resolve({ can });
    },
  }}
/>****
```

Now let me explain a little bit of this code I wrote. First we need the role of the logged in user. We saved it to local storage during login.
Then we match the refine `actions` with the accessControl's actions and check its authorization with the `granted` method. I also resolve the returned result.

## Conclusion
As a result, we have done the authorization on both the ui (dashboard) side and the api side.