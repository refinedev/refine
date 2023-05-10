---
title: How to use TypeScript Partial Type?
description: We'll explain the TypeScript Partial utility type with examples
slug: typescript-partial-utility-type
authors: abdullah_numan
tags: [typescript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-10-typescript-partial/social.png
hide_table_of_contents: false
---



## Introduction

In this article, we discuss object type transformations in TypeScript using `Partial<>`. This is the third part of the series titled [TypeScript Utility Type Series](https://refine.dev/blog/typescript-omit-utility-type/).

In the previous post, we went through an example where we derived a `Subscriber` type by omitting a property from the base type, `SuperbUser`, with `Omit<>`.

In this post, we will consider an example of **TypeScript `Partial<>`** by modifying our `Subscriber` type to assume a more realistic scenario.

Steps we'll cover:
- [Optional Registration Scenario](#optional-registration-scenario)
- [Enter TypeScript `Partial<Type>`](#enter-typescript-partialtype)
- [Partial with Interfaces](#with-interfaces)

## Optional Registration Scenario
For our blog, we would have `GuestUser`s who are not allowed to like or comment on a post. We would allow registered `Subscriber`s to like and comment. So, the scenario goes:

- a `GuestUser` must register with their `email` and become a `Subscriber`.
- they receive a link to set their password in an email sent to their `email`.
- they are able to set their `password`, `firstName` and `lastName` afterwards.

In such a scenario, the `Subscriber` type we derived previously, which effectively has the shape below, does not deliver our needs the way we want:

```tsx
type Subscriber = {
  userId: number,
  macAddress: string,
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
};

const subscriber: Subscriber = {
  userId: 4,
  macAddress: 'a:5ub:mach1ne',
  username: 'sub_user',
  email: 'sub_user@gmail.com'
};

console.log(subscriber);
/*
From TypeScript Error:
"Type '{ userId: number; macAddress: string; username: string; email: string; }' is missing the following properties from type 'Subscriber': password, firstName, lastName"

From console:
{
  "userId": 4,
  "macAddress": "a:5ub:mach1ne",
  "username": "sub_user",
  "email": "sub_user@gmail.com"
}
*/
```

TypeScript complains about the inconformity of `subscriber` to `Subscriber` type. This is because it sets all the fields to be **required** by default. If we set `password`, `firstName` and `lastName` to optional manually, it is happy:

```tsx
type Subscriber = {
  userId: number,
  macAddress: string,
  username: string,
  email: string,
  password?: string,
  firstName?: string,
  lastName?: string,
};

const subscriber: Subscriber = {
  userId: 4,
  macAddress: 'a:5ub:mach1ne',
  username: 'sub_user',
  email: 'sub_user@gmail.com'
};

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "a:5ub:mach1ne",
  "username": "sub_user",
  "email": "sub_user@gmail.com"
}
*/
```

But this comes with the overhead of defining `Subscriber` manually in the first place and additionally then setting individual optional properties. In real APIs, it's not a good idea to define a shape manually.

---


<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />



---


## Enter TypeScript `Partial<Type>`
We want to remove the hassle and do this much more comfortably from the type returned from `Omit<>`. So what we want to do is set all the properties of the returned type to be optional with `Partial<Type>`:

```tsx
type SuperbUser = {
  userId: number,
  macAddress: string,
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  roles: ('Admin' | 'Editor' | 'Author')[]
};

type Subscriber = Partial<Omit<SuperbUser, 'roles'>>;

const subscriber: Subscriber = {
  userId: 4,
  macAddress: 'a:5ub:mach1ne',
  username: 'sub_user',
  email: 'sub_user@gmail.com'
};

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "a:5ub:mach1ne",
  "username": "sub_user",
  "email": "sub_user@gmail.com"
}
*/
```

No complains, which is great!

So, we are now free to set values for `password`, `firstName` and `lastName`:

```tsx
subscriber.password = '12345678';
subscriber.firstName = 'Abdullah';
subscriber.lastName = 'Numan';

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "a:5ub:mach1ne",
  "username": "sub_user",
  "email": "sub_user@gmail.com",
  "password": "12345678",
  "firstName": "Abdullah",
  "lastName": "Numan"
}
*/
```

But, like before, TypeScript complains again if we add the properties that disrupts the shape of `Subscriber`:

```tsx
subscriber.roles = ['Reader', 'Commenter'];

console.log(subscriber);
// Property 'roles' does not exist on type 'Partial<Omit<SuperbUser, "roles">>'.
```

So, the benefits of using TypeScript to derive a partial type includes its support for partial assignment of the object's properties that is allowed by JavaScript and not allowed by default TypeScript. It also warns about possible undesired assignments to the partial.


<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>

## With Interfaces
We get the same result if we use an interface for our base `SuperbUser` type:

```tsx
interface SuperbUser {
  userId: number;
  macAddress: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: ('Admin' | 'Editor' | 'Author')[]
};

type Subscriber = Partial<Omit<SuperbUser, 'roles'>>;

const subscriber: Subscriber = {
  userId: 4,
  macAddress: 'a:5ub:mach1ne',
  username: 'sub_user',
  email: 'sub_user@gmail.com'
};

subscriber.password = '12345678';
subscriber.firstName = 'Abdullah';
subscriber.lastName = 'Numan';

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "a:5ub:mach1ne",
  "username": "sub_user",
  "email": "sub_user@gmail.com",
  "password": "12345678",
  "firstName": "Abdullah",
  "lastName": "Numan"
}
*/
```

We can also refactor the return type from `Omit<>` into an intermediary type, `StrictSubscriber`, and pass it as the argument of **TypeScript Partial**:

```tsx
type StrictSubscriber = Omit<SuperbUser, 'roles'>;
type Subscriber = Partial<StrictSubscriber>;
```

## Conclusion
In this post, we covered partial object transformations with using the utility transformer **Partial**. We found out that it is preferable to setting certain properties of a type to optional manually, especially when dealing with types returned from APIs.
