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


To start make app work import Admin root component in to "App.tsx"  from readmin.


```

import React from "react";
import {
    Admin,
} from "readmin";
import JsonServer from "readmin-json-server";
    
function App() {


    return (
        <Admin dataProvider={JsonServer("/api"))} >
      
        </Admin>
    );
}

export default App;

```

You can simply bootstrap the app with this setup. You will welcome page at the below.a


//image//


The App component renders an <Admin> component, which is the root component of a react-admin application. This component expects a dataProvider prop - a function capable of fetching data from an API. Since there is no standard for data exchanges between computers, you will probably have to write a custom provider to connect react-admin to your own APIs - but we’ll dive into Data Providers later. For now, let’s take advantage of the ra-data-json-server data provider, which speaks the same REST dialect as JSONPlaceholder.


