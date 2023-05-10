---
title: Error Handling With try, catch and finally Blocks in JavaScript
description: We'll see how to handle errors in JavaScript using the try/catch/finally blocks.
slug: javascript-try-catch-finally
authors: abdullah_numan
tags: [javascript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-22-js-try-catch/social.png
hide_table_of_contents: false
---




## Introduction
This post is about graceful error handling in JavaScript where we explore the use of `try/catch/finally` blocks.

Steps we'll cover:
- [What are Errors?](#what-are-errors)
  - [What is Graceful Error Handling?](#what-is-graceful-error-handling)
- [How `try/catch/finally` Blocks Work](#how-trycatchfinally-blocks-work)
  - [Running Usual Code In The `try` Block](#running-usual-code-in-the-try-block)
- [The `catch` Block](#the-catch-block)
  - [The `finally` Block](#the-finally-block)

## What are Errors?
Errors are integral part of programming. Errors in JavaScript can arise while writing code due to syntax related issues like missing or mistyped variables, duplicate variables, wrong use of JavaScript constructs, etc. They can also happen at run time due to internal errors at an external server, unreachable resources at an API endpoint, broken or missing data structures - whose interfaces are usually manipulated by our program, etc.

Syntax errors are generally tracked by linters but are also pointed out when the buggy code is executed by JavaScript's engine, i.e. at run time. Errors thrown at run time are often referred to as **exceptions**. Exceptions throw an `Error` object that - if unhandled proactively - instantly terminates the script and does not allow execution of the rest of the code.

So, when an error is expected, in order to avoid breaking our program, it is important to handle errors gracefully and direct the flow of the program to a safe avenue where further execution resumes unhindered.

### What is Graceful Error Handling?
Graceful error handling refers to an approach in programming where we proactively consider the scenarios that might lead to an error, design our control flow to handle these possible errors and direct the control of the program in each case in such a way that execution continues unterminated.

In JavaScript, we do this with the `try/catch/finally` construct.

In this article, we get into the details of what the `try`, `catch` and `finally` blocks represent and how they work together with examples. And on the way, we will discuss about what nesting of these blocks bring to the table. We'll also spend some time delving into how the `finally {...}` block is used to guide the control of the script to carry out routine procedures, like closing down a write stream in a file.

Let's start with how `try/catch/finally` works first.

---


<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />



---

## How `try/catch/finally` Blocks Work

The `try/catch/finally` construct, it's obvious, can have three possible blocks. A `try {...}` block, a `catch {...}` block and a `finally {...}` block. Of these three, `try {...}` is always a must. And we need one more: either `catch {...}` or `finally {...}` to make the `try {...}` block relevant. The possible scenarios covered by this are:

```tsx
// Possibility 1: try/catch statement
try {
  // Things to be tried
} catch(e) {
  // Catch errors thrown in try and do something with it
}


// Possibility 2: try/finally statement
try {
  // Things to be tried
} finally {
  // Standard procedures to be completed regardless of the output in try block
}
```

So at least two blocks make up a `try` control flow. We can also have another possibility that involves the `finally {...}` block as the third:

```tsx
try {
  // Try stuff
  // Throw graceful error
} catch(e) {
  // Catch error and do relevant stuff like log to console, retry, redirect, etc.
} finally {
  // Do standard stuff like cleanup, closing file, send log data, etc after try and catch
}
```

Below, we go through each block with examples for each possible scenario above.

### Running Usual Code In The `try` Block

The `try {...}` block contains the code which we want to execute in our normal control flow but bears the risk of throwing an error. It could be just another part of the synchronous procedures we declare in our script, such as the first `console.log()` statement below:

```tsx
  console.log('We are exploring error handling with try/catch/finally');
  // 'We are exploring error handling with try/catch/finally'

  console.log('This is safe avenue.');
  // 'This is safe avenue.'
```

Here, the control makes it to the safe zone and logs both statements. But if we introduce an error, the program crashes entirely - not reaching the the safe avenue:

```tsx
console.logd('We are exploring error handling with try/catch/finally');
console.log('This is safe avenue.');

// TypeError: console.logd is not a function
```
Here, the intentional mistake in `console.logd` throws a `TypeError`. And strikingly, the execution is halted entirely. No dealing with the error, no redirection, just a bunch of stack information.

That's bad. We need to deal with this proactively.

Let's use a `try/catch` block. We need to put the code of our interest inside the `try` block:

```tsx
try {
  console.logd('We are exploring error handling with try/catch/finally');
} catch {
  console.log(`Hello, you erred'n we messed. We are thy m'ssinjas.`);
};

console.log('This is safe avenue.');

// Hello, you erred'n we messed. We are thy m'ssinjas.
// This is safe avenue.
```

Now, we placed our `console.logd()` statement inside the `try` block. It's still buggy and throws the same exception, but it did not lead to termination of execution. It instead diverted the control to the `catch` block, executed the code there and eventually moved control to the safe zone.

Let's just fix the error so the control remains in the `try` block and the program makes it to the safe zone through our desired, error-free path:

```tsx
try {
  console.log('We are exploring error handling with try/catch/finally');
} catch {
  console.log(`Hello, you erred'n we messed. We are thy m'ssinjas.`);
};

console.log('This is safe avenue.');

// We are exploring error handling with try/catch/finally
// This is safe avenue.
```
And it does.

**`try` Block with Synchronous Functions**

We can invoke any function inside the `try` block. Let's refactor the first log statement into a function and use it inside `try` block:

```tsx
function sayWhatWeReDoing() {
  console.log('We are exploring error handling with try/catch/finally');
};

try {
  sayWhatWeReDoing();
} catch {
  console.log(`Hello, you erred'n we messed. We are thy m'ssinjas.`);
};

console.log('This is safe avenue.');
// We are exploring error handling with try/catch/finally
// This is safe avenue.
```

The result is the same.

## The `catch` Block

Now, as we've seen in the buggy `console.logd()` example, presence of the `catch` block creates a fork when we have errors in our desired flow in the `try` block. Let's focus on the `catch` block now.

The `catch` block offers an alternate channel to transfer execution control in the case of an error raised in the `try` block. When an error is raised, the `catch` block allows a way out from crashing the program. That is, the `catch` block allows us to handle errors gracefully.

**`catch` Without the `Error` Object**

In the previous example, when we erred with `console.logd()`, we were able to log another statement we provided in the `catch` block:

```tsx
try {
  console.logd('We are exploring error handling with try/catch/finally');
} catch {
  console.log(`Hello, you erred'n we messed. We are thy m'ssinjas.`);
};

console.log('This is safe avenue.');

// Hello, you erred'n we messed. We are thy m'ssinjas.
// This is safe avenue.
```

Notice in the beginning of the `catch` block, we don't have any argument passed. This is because, here we did not require access to the `Error` object produced by our error.

So, we may choose to ignore the `Error` object totally.

**`catch` With the `Error` Object**

However, we may also choose to use the `Error` object if we need to. And most often we do.

We can access the `Error` object as an argument passed to the `catch` block, with `catch(e)` or anything replacing `e` really. It's the only argument that's available from `try` to the `catch` block. And it's not available to other blocks.

It consists of the `name` of the error and a `message`. Let's see what the error was in our above case:

```tsx
try {
  console.logd('We are exploring error handling with try/catch/finally');
} catch(e) {
  console.log(`${e.name}: ${e.message}`);
};

console.log('This is safe avenue.');

// TypeError: console.logd is not a function
// This is safe avenue.
```

Clearly, it was our intentional typo.

**`throw`ing Custom Errors**

It is important to note that exceptions thrown at the `try` block is caught by only the `catch` block of the same construct. We'll come to this in the next two sections below. Exceptions thrown in the `catch` block itself and in the `finally` block are not accessible from the `catch` block of the same construct.

We can throw custom errors with JavaScript's `throw` method, and even if there is perfect code written after the `throw`, the later code won't be run because the control has moved to the `catch` block already:

```ts
try {
  console.log('We are exploring error handling with try/catch/finally');
  throw Error('We wanted this Error just to make a point.');
  console.log('Perfect code here. But does not run.');
} catch(e) {
  console.log(`${e.name}: ${e.message}`);
};

console.log('This is safe avenue.');

// We are exploring error handling with try/catch/finally
// Error: We wanted this Error just to make a point.
// This is safe avenue.
```
Here, the "perfect code" statement did not get logged to the console, because `try` spewed `Error` before that and control already moved to `catch`.


**Nested `try/catch` Blocks**

We can nest `try/catch` blocks. Let's see how errors interact between nesting levels:

```ts
try {
  console.log('We are exploring error handling with try/catch/finally');
  try {
    console.log('This is second level try/catch block.')
    throw Error('Custom error thrown from second level.');
  } catch(e) {
    console.log(`${e.name}: ${e.message}`);
  }
} catch(e) {
  console.log(`Error from first level:\n"${e}"`);
};

console.log('This is safe avenue.');

// We are exploring error handling with try/catch/finally
// This is second level try/catch block.
// Error: Custom error thrown from second level.
// This is safe avenue.
```

In the above snippet, the custom error thrown in the nested `try` block is caught in the `catch` block of the same construct. That is, it remains in the same level.

**Rethrowing**

We can rethrow an error in a nested `try/catch` block, and it will be picked by an ancestor `try/catch` block:

```ts
try {
  console.log('We are exploring error handling with try/catch/finally');
  try {
    console.log('This is second level try/catch block.')
    throw Error('Custom error thrown from second level.');
  } catch(e) {
    throw(e);
  }
} catch(e) {
  console.log(`Error from first level:\n"${e}"`);
};

console.log('This is safe avenue.');
/* We are exploring error handling with try/catch/finally
   This is second level try/catch block.
   Error from first level:
   "Error: Custom error thrown from second level."
   This is safe avenue.
*/
```

In the above chunk, we rethrew `e` with `throw(e)` inside the `catch` block of the child `try/catch` block. It was picked up by the `catch` block of the parent `try/catch` section:

```ts
/* Error from first level:
   "Error: Custom error thrown from second level."
*/
```

These are most of the "gotchas" of using the `catch` block.

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>

### The `finally` Block

The `finally {...}` block - if applied - is the block where the control flow moves before it exits the `try/catch/finally` or `try/finally` construct. It contains code that is part of the standard set of procedures, such as closing the write stream of a file regardless of whether an attempted write operation throws an error or not:

```ts
const fs = require("fs");
const writeStream = fs.createWriteStream("nodeFsTest");

try {
  console.log('Starting writing...');
  writeStream.write("Hi,");
  writeStream.write("\nThis is finally in action.");
} catch(e) {
  console.log(e);
} finally {
  console.log('Closing file...')
  writeStream.end();
}

/*
Starting writing...
Closing file...
*/
```

In the example above, we're writing to a file using `Node.js` `fs` module. After a successful write operation, we want to declare that we have ended writing by closing the write stream with `writeStream.end()`.

**`try/finally` Only**

We could have only used a `try/finally` block, only if we knew we won't run into errors:

```ts
const fs = require("fs");
const writeStream = fs.createWriteStream("nodeFsTest");

try {
  console.log('Starting writing...');
  writeStream.write("Hi,");
  writeStream.write("\nThis is finally in action.");
} finally {
  console.log('Closing file...')
  writeStream.end();
}

/*
Starting writing...
Closing file...
*/
```

## Conclusion

In this article, we discussed in depth about graceful error handling in JavaScript using the `try/catch/finally` construct. We found out that putting our error-prone code inside a `try {...}` block allows us to catch any thrown exception. This prevents our program from crashing.

We also saw that `try/catch` blocks can be nested, exceptions thrown in nested `try/catch` blocks can be rethrown and picked from ancestor `try/catch` blocks.

Later, we looked into the details of how the `finally {..}` block is used to conduct routine procedures, regardless of whether the main operation in the `try` block throws an error or not.