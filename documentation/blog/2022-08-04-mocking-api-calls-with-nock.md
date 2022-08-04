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

We'll use the Nock to solution for these problems.


## What is Nock?







