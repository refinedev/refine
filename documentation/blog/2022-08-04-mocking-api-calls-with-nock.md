---
title: Testing HTTP Requests in React Using Nock
description: How to test API calls in React?
slug: test-http-requests-in-react
authors: necati
tags: [react, testing, nock, jest, mocking]
image: https://refine.dev/img/refine_social.png
hide_table_of_contents: false
---


## Introduction
Writing unit tests is very important for the development process. Testing components that use HTTP requests sometimes may be a real pain.

I'll show how to write unit tests for API calls by mocking method in the simple React app.

We’ll use a third-party package called nock that helps us to mock HTTP requests.

Steps we'll cover: 
- Why mocking HTTP request during testing is important?
- What is Nock?
- Bootstraping the example app
- Testing an API without mocking
- Testing an API with nock(get,put,delete...)?
- Mocking server errors
- Alternatives
- Conclusion

## Why mocking HTTP requests during testing is important?

Writing unit tests that make real HTTP requests can cause a variety of problems:

  - The data returned from API can be different on each request.
  - It takes a longer time to finish running the test.
  - You may get a big size of data that you don't need to use in tests.
  - You may have issues like rate limiting and connectivity.

We'll use the Nock to find a solution for these problems.


## What is Nock?

[Nock](https://github.com/nock/nock) is an HTTP server mocking and expectations library. Nock works by overriding Node's http.request function.

Nock helps us mock calls to API. It lets us specify what URLs we want to listen for and responds with predefined responses, just like how real APIs would do it.

We can use nock to test react components that making HTTP requests.

## Bootstrapping the example app







