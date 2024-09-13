---
title: A Guide on TypeScript Omit Type
description: We'll dive into the TypeScript Omit utility type with examples
slug: typescript-omit-utility-type
authors: abdullah_numan
tags: [typescript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-03-typescript-omit/social.png
hide_table_of_contents: false
---

## Introduction

In this article, we discuss object type transformations in TypeScript using `Omit<>`. This is the second part of the series titled [TypeScript Utility Type Series](https://refine.dev/blog/typescript-pick-utility-type/).

In the previous post, we went through an example where we derived a `GuestUser` type by picking a few properties from the base type, `SuperbUser`, with `Pick<>`. We hinted that if the number of properties to be picked are more than those being discarded, picking becomes less convenient. In that case, we should prefer using `Omit<>`.

In this post, we will consider an example of `Omit<>` by creating a type for our `Subscriber` entity.

Step we'll cover:

- [TypeScript Omit Example](#typescript-omittype-keys-example)
- [TypeScript Omit with Interface](#typescript-omit-with-interface)
- [When to Avoid](#when-to-avoid)

## TypeScript `Omit<Type, Keys>` Example

`Omit<>`, like `Pick<>`, takes a base type as the first argument. It takes an union type of the keys to be omitted as the second argument and returns the derived type that excludes those properties.

Looking back at the ERD, the `Subscriber` entity has all the same properties as `SuperbUser` - except `roles`:

<div class="img-container" align-items="center" >
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-03-typescript-omit/ts-omit-visualize.png"  alt="TypeScript Omit Type" />

</div>

<br/>

Deriving a `Subscriber` type from the `SuperbUser` plainly requires us to omit only the `roles` property, as opposed to picking all the rest:

```tsx
type SuperbUser = {
  userId: number;
  macAddress: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: ("Admin" | "Editor" | "Author")[];
};

type Subscriber = Omit<SuperbUser, "roles">;
```

So, in this case, TypeScript `Omit<>` offers us convenience over `Pick<>`. We can now create a subscriber object that has `roles` property removed from its fields:

```tsx
const subscriber: Subscriber = {
  userId: 4,
  macAddress: "a:5ub:mach1ne",
  username: "sub_user",
  email: "sub_user@gmail.com",
  password: "12345678",
  firstName: "Abdullah",
  lastName: "Numan",
};

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

console.log(subscriber.roles); // undefined
```

Notice, if we navigate to `subscriber.roles` it returns `undefined`.

Now, let's try adding `roles` to the `subscriber`:

```tsx
subscriber.roles = ["Reader", "Commenter"]; // Property 'roles' does not exist on type 'Subscriber'.

console.log(subscriber.roles); // ["Reader", "Commenter"]
```

And TypeScript grunts:

```tsx
// Property 'roles' does not exist on type 'Subscriber'.
```

If we look at `console.log(subscriber.roles);` though, we can see that our assignment actually sets the property and value of `subscriber.roles`. TypeScript only yells at us at development, but doesn't help us with this in runtime. JavaScript sets the value of `subscribe.roles`.

So, caution there, as it is an important distinction that TypeScript is applying omit at development, not JavaScript. TypeScript does not check for any consequence of the written code **after** it is compiled to JavaScript. So, it is crucial to leverage TypeScript linter suggestions to strictly check omit while developing.

## TypeScript `Omit<>` with Interface

Like it was in `Pick<>`, we can use an interface for `SuperbUser` and the results will be the same:

```tsx
interface SuperbUser {
  userId: number;
  macAddress: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: ("Admin" | "Editor" | "Author")[];
}

type Subscriber = Omit<SuperbUser, "roles">;

const subscriber: Subscriber = {
  userId: 4,
  macAddress: "a:5ub:mach1ne",
  username: "sub_user",
  email: "sub_user@gmail.com",
  password: "12345678",
  firstName: "Abdullah",
  lastName: "Numan",
};

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

console.log(subscriber.roles); // undefined
```

## When to Avoid

As with `Pick<>`, the second argument to Typescript Omit also takes a union of keys. So, if we need to omit any other property, we can add them to the second argument with the pipe operator `|`:

```tsx
type Subscriber = Omit<SuperbUser, 'roles' | 'firstName' | ...>;
```

We should avoid using `Omit<>` and prefer `Pick<>` when we have more properties to omit than to pick.

## Conclusion

In this article, we delved into `Omit<>` with an example of deriving a type for our `Subscriber` entity by omitting a property from our base type, `SuperbUser`. We saw that `Omit<>` is the opposite equivalent of `Pick<>` and is more convenient when we want to pick more properties and omit less from a base type.

In the next article, we'll cover object type transformations using `Partial<Type>`.
