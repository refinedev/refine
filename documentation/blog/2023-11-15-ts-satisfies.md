---
title: How to Use the TypeScript satisfies Operator
description: TypeScript classes are a superset of JavaScript classes. This post covers the fundamentals of type annotations in TypeScript Classes and their associated quirks.
slug: typescript-satisfies-operator
authors: abdullah_numan
tags: [typescript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-11-15-ts-satisfies/social.png
hide_table_of_contents: false
---

## Introduction

This post is about how to use TypeScript `satisfies` operator to effectively apply property value conformance in complex object types with nested properties.

TypeScript's `satisfies` operator comes with a few features that allow developers to check and validate the value of a variable against a given type. It was introduced in version `v4.9` specifically to match type of variable values after their assignment, rather than setting an annotation prior to it.

As of the features added to the current iteration (dating November, 2023), `satisfies` supports property value conformance, property name constraining and property name fulfillment -- largely associated with the `Record<>` utility type. It also allows optional member conformance with partial types transformed with `Partial<>`.

In this post, we get into the details of using TypeScript `satisfies` while validating types of property values in a fairly nested user (`joe`) object. We first consider how `satisfies` is focused on type checking and validation of variable values, rather than their annotation. We explore examples that further illustrate type validation of nested properties of objects - which we transform with the `Record<>` utility. We also understand how `satisfies` is geared to handle associated property name constraining and fulfillment that come with the `Record<>` type. In the end, we go through an example of partial member conformance with the `Partial<>` transformation utility.

Step by step, we'll cover the following:

- [What is the TypeScript satisfies Operator ?](#what-is-the-typescript-satisfies-operator-)
  - [TypeScript satisfies Leverages Contextual Typing](#typescript-satisfies-leverages-contextual-typing)
  - [TypeScript satisfies - Annotated Type Has Precedence Over `satisfies` Type](#typescript-satisfies---annotated-type-has-precedence-over-satisfies-type)
- [TypeScript satisfies - Checking for Property Value Conformance](#typescript-satisfies---checking-for-property-value-conformance)
- [TypeScript satisfies - Property Name Constraining](#typescript-satisfies---property-name-constraining)
- [TypeScript satisfies - Property Name Fulfillment](#typescript-satisfies---property-name-fulfillment)
- [TypeScript satisfies - Optional Member Conformance](#typescript-satisfies---optional-member-conformance)

### TypeScript Setup

Your JavaScript engine has to have TypeScript installed. It could be [**Node.js**](https://nodejs.org/en) in your local machine with TypeScript supported or you could use the [TypeScript Playground](https://www.typescriptlang.org/play#code).

### Prior Knowledge

The TypeScript concepts covered in this post range from Intermediate to Advanced. We assume you are already familiar with the following:

1. [TypeScript Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
2. Typing a variable in TypeScript. If you are not already familiar with this, please go through the examples [here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-annotations-on-variables)
3. Typing an object literal in TypeScript. More [here](https://www.typescriptlang.org/docs/handbook/2/objects.html)
4. Utility types, particularly how to transform types with the [`Record<>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) and [`Partial<>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) utilities. Feel free to get a refesher on all TypeScript utility types from the [docs here](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## What is the TypeScript satisfies Operator ?

TypeScript's `satisfies` operator is a syntax that helps developers validate the type of a variable's value after assignment. It does this by first matching the value to the type and then remembering the internals of the matched type, i.e. the properties and methods. As such, `satisfies` keeps track of the types of the nested property values, helps catching otherwise uncaught TypeScript errors, and complying deeply with nested property types as well. It is thus a syntax aimed specifically for validating types on nested property values of objects with certain degrees of complexity.

Here's a nested `joe` user object example:

```ts
type TAddress = {
  addressLine1: string;
  addressLine2?: string;
  postCode: number | string;
  city: string;
  state: string;
  country: string;
};

type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";
type TUser = Record<UserKeys, string | TAddress>;

const joe = {
  username: "joe_hiyden",
  email: "joe@exmaple.com",
  firstName: "Joe",
  lastName: "Hiyden",
  address: {
    addressLine1: "1, New Avenue",
    addressLine2: "Old Avenue",
    postCode: 12345,
    city: "California",
    state: "California",
    country: "USA",
  },
} satisfies TUser;

console.log(joe.address.postCode); // 12345
```

Notice in the example that, we have used `TUser` on `joe` for its value validation with `satisfies`. And `TUser` is a transformed record with `Record<UserKeys, string | TAddress>`

### TypeScript satisfies Leverages Contextual Typing

It is necessary to understand that type inference before assignment is different from type validation of the assigned value with `satisfies`. In other words, `joe` above has a contextual typing: its type is set to itself and then `satisfies` checks `joe`'s internals against it to validate the types for all properties and their values, including nested ones. You can find `joe`'s type when you hover over `joe`. You'll see this:

```ts
// joe's inferred type is the object itself

const joe: {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    postCode: number;
    city: string;
    state: string;
    country: string;
  };
};
```

### TypeScript satisfies - Annotated Type Has Precedence Over `satisfies` Type

When we explicitly annotate the variable `joe`, the annotated type gains precedence during type checking over the one passed to `satisfies`. We get errors indicating the annotated type's loose specificity on its nested properties. Notice the `2339` error when we annotate `joe` with `TUser`:

```ts
type TAddress = {
  addressLine1: string;
  addressLine2?: string;
  postCode: number | string;
  city: string;
  state: string;
  country: string;
};

type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";
type TUser = Record<UserKeys, string | TAddress>;

// highlight-next-line
const joe: TUser = {
  username: "joe_hiyden",
  email: "joe@exmaple.com",
  firstName: "Joe",
  lastName: "Hiyden",
  address: {
    addressLine1: "1, New Avenue",
    addressLine2: "Mission Bay",
    postCode: 12345,
    city: "California",
    state: "California",
    country: "USA",
  },
} satisfies TUser;

console.log(joe.address.postCode); // Property 'postCode' does not exist on type 'string | TAddress'. Property 'postCode' does not exist on type 'string'.(2339)
```

In the modification above, we are using the same `TUser` type for both annotating `joe` and for validating it with `satisfies`. Clearly, since annotating with `TUser` gains precedence, it doesn't keep track of the internal information we are trying to get from inside the `address` object nested in `joe`. TypeScript confuses the `TAddress` type with the other ones typed with `string`.

The point to be delivered here is that type inference or annotation of the variable declaration, `joe`, is not the same thing as type validation of its value with `satisfies`. And `satisfies` is not intended for annotation, but rather largely for validating conformance.

## TypeScript satisfies - Checking for Property Value Conformance

Annotating `joe` above with `TUser` prevents access to `joe.address` on the grounds of TypeScript's _typal dissonance_ between the union members: `string` and `TAddress`. Removing it and reinstating validation with `satisfies` restores clarity and access, because `satisfies` keeps track of the types of all property names and values at nested levels:

```ts
type TAddress = {
  addressLine1: string;
  addressLine2?: string;
  postCode: number | string;
  city: string;
  state: string;
  country: string;
};

type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";
type TUser = Record<UserKeys, string | TAddress>;

const joe = {
  username: "joe_hiyden",
  email: "joe@exmaple.com",
  firstName: "Joe",
  lastName: "Hiyden",
  address: {
    addressLine1: "1, New Avenue",
    addressLine2: "Mission Bay",
    postCode: 12345,
    city: "California",
    state: "California",
    country: "USA",
  },
} satisfies TUser;

console.log(joe.address.postCode); // 12345
```

Since we are using a number for `joe.address.postCode` above, `satisfies` correctly tracks it and no longer leads to the `2339` error.

## TypeScript satisfies - Property Name Constraining

Notice that we are using the `Record<>` utility to derive a record type for the user. TypeScript `satisfies` is generally used in conjunction with the `Record<>` type. And as you notice already, we are applying property name constraints to limit `TUser`'s keys with: `type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";`.

Due to this, property overloading is prevented. In the below version, `role` is not included in `UserKeys`, so we get a complain:

```ts
type TAddress = {
  addressLine1: string;
  addressLine2?: string;
  postCode: number | string;
  city: string;
  state: string;
  country: string;
};

type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";
type TUser = Record<UserKeys, string | TAddress>;

const joe = {
  username: "joe_hiyden",
  email: "joe@exmaple.com",
  firstName: "Joe",
  lastName: "Hiyden",

  // Complains about property overloading
  // highlight-start
  role: "Admin", // Object literal may only specify known properties, and 'role' does not exist in type 'TUser'.(1360)
  // highlight-end
  address: {
    addressLine1: "1, New Avenue",
    addressLine2: "Mission Bay",
    postCode: 12345,
    city: "California",
    state: "California",
    country: "USA",
  },
} satisfies TUser;

console.log(joe.address.postCode); // 12345
```

## TypeScript satisfies - Property Name Fulfillment

Similarly, if we have a missing property in `joe`, we get accused till we get all properties included:

```ts
type TAddress = {
  addressLine1: string;
  addressLine2?: string;
  postCode: number | string;
  city: string;
  state: string;
  country: string;
};

type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";
type TUser = Record<UserKeys, string | TAddress>;

const joe = {
  username: "joe_hiyden",
  email: "joe@exmaple.com",
  firstName: "Joe",
  // lastName missing
  address: {
    addressLine1: "1, New Avenue",
    addressLine2: "Mission Bay",
    postCode: 12345,
    city: "California",
    state: "California",
    country: "USA",
  },
  // Complains about missing property at `satisfies`
  // highlight-next-line
} satisfies TUser; //  Property 'lastName' is missing in type '{ username: string; email: string; firstName: string; address: { addressLine1: string; addressLine2: string; postCode: number; city: string; state: string; country: string; }; }' but required in type 'TUser'.(1360)
```

## TypeScript satisfies - Optional Member Conformance

Instead of mandatory property name fulfillment, we can force an optional member conformance with a `Partial<>` transformation. In the following update, there's no complains about any missing property (`lastName`). We are all good:

```ts
type TAddress = {
  addressLine1: string;
  addressLine2?: string;
  postCode: number | string;
  city: string;
  state: string;
  country: string;
};

type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";
type TUser = Record<UserKeys, string | TAddress>;

const joe = {
  username: "joe_hiyden",
  email: "joe@exmaple.com",
  firstName: "Joe",
  address: {
    addressLine1: "1, New Avenue",
    addressLine2: "Mission Bay",
    postCode: 12345,
    city: "California",
    state: "California",
    country: "USA",
  },
  // highlight-next-line
} satisfies Partial<TUser>; // No complains about missing `lastName`
```

## Summary

In this post, we covered the `satisfies` operator, a `v4.9` addition to TypeScript. We discovered that TypeScript `satisfies` offers a set of features primarily aimed for type validation of assigned variable values and their nested properties and values. We illustrated through examples that the `satisfies` operator is used in conjunction with the `Record<>` utility type. In our examples, we found out that property name constraining, fulfillment associated with a `Record<>` derived type are handled well by TypeScript `satisfies`. Finally, we also saw how `satisfies` can be used to enforce partial member conformance with `Partial<>` transformation of a variable's value.
