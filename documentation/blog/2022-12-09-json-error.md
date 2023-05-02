---
title: Unexpected token in JSON at position 0 error
description: We will look into the various possible causes of this error message and suggest methods to rectify it.
slug: unexpected-token-in-json-at-position-0-error
authors: chukwuka_reuben
tags: [javascript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-12-09-json-error/social.png
hide_table_of_contents: false
---



## Introduction.

This post aims to address the "Unexpected token in JSON at position 0" error message. We will look into the various possible causes of this message and suggest methods to rectify it.

Steps we'll cover:

- [What is JSON?](#what-is-json)
- [What does the "Unexpected token \< in JSON at position 0" error mean?](#what-does-the-unexpected-token--in-json-at-position-0-error-mean)
- [Different Reasons Why You Might Have This Error and Their Fixes.](#different-reasons-why-you-might-have-this-error-and-their-fixes)
- [Hitting Any API endpoint that does not exist:](#hitting-any-api-endpoint-that-does-not-exist)
- [Spelling Error](#spelling-error)
- [Forgetting to stringify your object:](#forgetting-to-stringify-your-object)


## What is JSON?

JSON which stands for Javascript Object Notation can be said to be a lightweight format for storing and transporting data, it is used often when data is sent from a server to a webpage.

If you have ever utilized API endpoints in your projects before, there's a very high chance that JSON is being used to store and transport data between your web page and servers.

Let us quickly examine the utilization of JSON for transporting and storing data. We don't need to look too far since the local storage on our internet browsers can function as servers.

The codeblock below shows how JSON can be used to transport data between local storage and the web page:

```tsx
localStorage.setItem('list', JSON.stringfy(list))

JSON.parse(localStorage.getItem('list'))
```

Now that we are aware of what JSON is and how it can be applied, let us move on to resolving the "Unexpected token in JSON at position 0" error message.

## What does the "Unexpected token &lt; in JSON at position 0" error mean?

In very simple language, "Unexpected token &lt; in JSON at position 0" indicates that you are parsing something else that is not JSON as JSON.

To prove my point, I will attempt to reproduce the mistake. Go to your browser console and execute this code snippet:

```javascript
JSON.parse(undefined)
```

The code snippet above will produce this type of error:



<div class="img-container">
 
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-12-09-json-error/json-error-1.png"  alt="json error" />

</div>

<br />


Why? because "undefined" is not JSON but we have tried to parse it as JSON.

**There's something I would like you to note before we proceed:**

The actual "Unexpected token in JSON at position 0" message may vary depending on what your server generates, however, the fundamental reason remains the same: you are attempting to parse something that is not JSON as JSON.

Below are some of the different forms in which the error message could be presented:

*   " is not a valid JSON at JSON.parse".
    
*   Unexpected token '&lt;', "&lt;!DOCTYPE "... is not valid JSON.
    
*   Unexpected token 'o', "not found!" is not valid JSON.
    
*   Unexpected token 'o', "\[object obj... is not valid JSON"
    

and so on. So going forward I'll be using the general name "JSON.parse unexpected token" to refer to this error.

Now that we know what the "JSON.parse unexpected token" error means, let us proceed to know the different reasons why you might have this error and also look into ways to fix them.

## Different Reasons Why You Might Have This Error and Their Fixes.

In this section of this article, 4 reasons and their fixes will be listed:

## Hitting Any API endpoint that does not exist:

This is one of the most common causes of this error, and this tends to occur during the fetch request in javascript.

As you might have already assumed, yes! it occurs when you're trying to parse an endpoint result that is not JSON as JSON.

In this part of the article, we will consider two brief cases - one to obtain a valid endpoint and show the outcome, and the other to retrieve an endpoint that doesn't exist so we can reproduce the error message.

**Example 1:**

In this example, I've used the JSON endpoints from [https://dummyjson.com/](https://dummyjson.com/), a place where you can get fake JSON data to use during development.

I've picked a valid endpoint from this site and went ahead to call the javascript fetch method on it, check out the code snippet and its result below:

```javascript
fetch('https://dummyjson.com/products/1')
  .then(res => res.json())
  .then(json => console.log(json))
```

Using the code snippet above, I want to clarify that `JSON.parse()` is being done by `res.json()` under the hood.




<div class="img-container">
 
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-12-09-json-error/json-error-2.png"  alt="json error" />

</div>

<br />

The image above shows that we got a valid JSON response, now let us move to the second example.

**Example 2:**

```javascript
fetch("https://dummyjson.com/myProduct/1")
    .then((res) => res.json())
    .then((json) => console.log(json));
```

[https://dummyjson.com/myProduct/1](https://dummyjson.com/myProduct/1) that has been used as our API is an endpoint that I made up, so it is not a valid API endpoint and as you know parsing it will be you trying to parse something that isn't JSON, as it is not a formatted JSON.


<div class="img-container">
 
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-12-09-json-error/json-error-3.png"  alt="json error" />

</div>

<br />

**How To Fix.**

- **Make sure you are using a valid API endpoint:**
    
    To make sure you are using a valid JSON endpoint, use [JSONFORMATTER](https://jsonformatter.curiousconcept.com/) to verify your endpoints before using it.
    
-  Always use the try-and-catch within your fetch method or function to prevent your app from crashing.
    

##  Spelling Error

This is so much similar to hitting the wrong API, only that you might have been pretty sure that the API endpoint exists.

Spelling error tends to happen due to typographical error or maybe you don't know what the correct spellings are.

Spelling errors do not apply only to API endpoints, they can also occur while attempting to fetch information from your local storage and lead to the "JSON.parse unexpected token" error message showing up.

**How To Fix.**

- Check and proofread well before hitting the API.
    
- Make sure you verify your API before hitting it. use JSONFORMATTER.
    
- Use the try-and-catch method in your function to prevent your app from crashing.
    

---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />

---


## Forgetting to stringify your object:

If we don't use the JSON.stringify() technique to convert our object into a string before sending it to a server, then we may encounter the error "JSON.parse unexpected token". This raises the question, "why is it necessary to transform our object into a string before sending it to a server?"

When sending data to a web server, the data has to be a string and to convert a javascript object to a string `JSON.stringify()` does the trick.

We are going to take two quick examples in this section, example 1 will represent the problem and example 2 will be the solution.

**Example 1**

**Note:**

Local storage will stand as our servers in this example.

*I have a list of todos that I have written on my web page,* I wish for them to stay even after I have reloaded my page**,** *how do I make that happen?*

*I have to send those lists as data to my server,* and then to retrieve them whenever I reload the page.

```ts
localStorage.setItem("list", 
list);
```

In the code snippet that I have provided, I have sent my data to the server without converting the object to a string using `JSON.stringify()`. Let's take a look at the consequence this will have on our page, below is the code snippet for retrieving the list, and an image of the result:

```ts
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
```


<div class="img-container">
 
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-12-09-json-error/json-error-4.png"  alt="json error" />

</div>

<br />


The error indicates that I'm trying to parse an object, and it's not a valid JSON.

**Example 2(The fix):**

All we have to do to fix this error is to stringify our list before sending it to the server:

```javascript
localStorage.setItem("list", 
JSON.stringify(list))
```

The code snippet above will fix the error.

In general, it is always a good idea to carefully check your JSON data for any syntax errors before attempting to parse it. This will help to ensure that your code is able to properly handle the JSON data and avoid any errors like the "Unexpected token in JSON at position 0" error.

## Conclusion
In this article, I began by providing a brief overview of what JSON is. Then, I clarified the “JSON.parse unexpected token” error message. Finally, I listed some of the different causes of this error, providing example errors and instructions on how to fix them.
