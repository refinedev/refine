---
title: How to use JavaScript Ternary Operator?
description: In this post, we expound on with examples of what the JavaScript ternary operator is, how it works.
slug: javascript-ternary-operator
authors: abdullah_numan
tags: [javascript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-15-js-ternary/social.png
hide_table_of_contents: false
---


## Introduction

This post is about the Ternary Operator in JavaScript. In this post, we'll discuss what the ternary operator is, how it is used, when to use it and discuss how it compares to other constructs such as `if/else`, `if/else if/else` and `switch`.

Steps we'll cover:
- [What is JavaScript Ternary Operator?](#what-is-javascript-ternary-operator)
- [How to Use the JS Ternary Operator?](#how-to-use-the-js-ternary-operator)
- [When to Use the Ternary Operator](#when-to-use-the-ternary-operator)
- [Chained Ternary Operator](#chained-ternary-operator)

## What is JavaScript Ternary Operator?

The ternary operator in JavaScript is an operator denoted by the question mark, `?`, that evaluates a conditional expression passed before it and executes a block of code based on the decision of the conditional expression. It accepts the possible blocks to be executed as two other operands that come after the `?` operator - the third separated from the second by a colon, `:` . Its syntax looks like this:

```ts
conditionalExpression ? exprIfTruthy : valueIfFalsy;
```

If the `conditionalExperssion` evaluates to a truthy value `exprIfTruthy` is executed. If it evaluates to a falsy value, `exprIfFalsy` is executed.

## How to Use the JS Ternary Operator?

We can use the ternary operator when we need to decide on a return value of a variable from two or more options based on a condition we pass as the first operand. The below code shows how:

```ts
// Example

const student = 'Abd';
const welcomeStudent = student ? `Welcome, ${student}!` : "Welcome, Guest!";

console.log(welcomeStudent); // Welcome, Abd!
```

In the above snippet, `student ?` evaluates the expression before the `?` mark as a Boolean condition, asking if `student` is truthy. For this reason, the ternary operator, `?`, is also called the **conditional operator**.

The value from this conditional expression is used to decide the value of the stored variable, `welcomeStudent`. If the conditional operand evaluates to a truthy value the second operand, i.e. the value before the colon, `:`, is returned to `welcomeStudent`. If it evaluates to falsy, the third operand, in other words the one after the `:` is returned.

In JavaScript, falsy values include `false`, `0`, `-0`, `0n` `""`, `null`, `undefined` and `NaN`. All other values are considered truthy.

---


<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />



---


##  When to Use the Ternary Operator

The most common use case of the ternary operator is when there are only two possible outcomes, i.e, as a shorthand alternative of the `if/else` construct. The use of the ternary operator makes the code more readable and usually takes less number of lines.

As in the example above, it can be used to return the value of a variable directly.

It can also be used when we need to return a value from a function:

```ts
// With if/else
const welcomeStudent = student => {
  if (student) {
    return `Welcome, ${student.name}!`;
  } else {
    return "Welcome, Guest!";
  };
};

console.log(welcomeStudent({ name: 'Abd' })); // Welcome, Abd!
console.log(welcomeStudent()); // Welcome, Guest!


// With ternary operator
const welcomeStudent = student => student ? `Welcome, ${student.name}!` : "Welcome, Guest!";

console.log(welcomeStudent({ name: 'Abd' })); // Welcome, Abd!
console.log(welcomeStudent()); // Welcome, Guest!
```

As we can see, the ternary operator simplifies the code to a one-liner. It made the code more readable and the logic easy to follow.

## Chained Ternary Operator

We can chain ternary operators to emulate a `if/else if/else` construct or a `switch` statement:

```ts
// With if/else if/else
const grade = mark => {
  if (mark > 100) {
    return;
  } else if (mark > 80) {
    return 'A';
  } else if (mark > 70) {
    return 'B';
  } else if (mark > 60) {
    return 'C';
  } else if (mark > 50) {
    return 'D';
  } else {
    return 'F';
  };
};

console.log(grade(100)); // A
console.log(grade(1000)); // undefined
console.log(grade(10)); // F

// With chained ternary operators
const grade = mark => mark > 100 ? undefined
                      : mark > 80 ? 'A'
                      : mark > 70 ? 'B'
                      : mark > 60 ? 'C'
                      : mark > 50 ? 'D'
                      : 'F';

console.log(grade(100)); // A
console.log(grade(1000)); // undefined
console.log(grade(10)); // F
```

Here, we chained the conditional operator into the third operand of the ternary operator at each level.

Many developers do not prefer nested ternary operators like this because multiple conditional checks hurt readability, instead of improving it. As opposed to chaining ternary operators, using plain `if/else if/else` or `switch` statements are recommended when there are multiple forks in a control flow.


## Conclusion

In this article, we explored the use of the ternary operator in JavaScript. We saw two common cases that improve code readability, one involving a variable and the other a function expression that return a value based on the evaluation of one conditional expression inside a function.

Ternary operators can be chained to emulate `if/else if/else` and `switch` constructs, but the recommended way is to stick to the later constructs because chaining multiple ternary operators are counter-productive in terms of readability.