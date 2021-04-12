---
slug: /
id: tutorial
title: Tutorial
sidebar_label: Tutorial
---


Readmin uses React. We’ll use create-react-app to create an empty React app, and install the readmin package:


````
npm i create react-app test-admin
cd test-admin/
yarn add readmin 
yarn start

````

You should be up and running with an empty React application on port 3000.

Using an API As Data Source
React-admin runs in the browser, and relies on data it fetches from APIs.

We’ll be using JSONPlaceholder, a fake REST API designed for testing and prototyping, as the datasource for the application. Here is what it looks like:



example api source