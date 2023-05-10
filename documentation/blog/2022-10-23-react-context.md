---
title: A Guide to useContext and React Context API
description: Share data across components with React Context in TypeScript and Next.js
slug: usecontext-and-react-context
authors: chibuzor_otuokwu
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-23-react-context/social.png
hide_table_of_contents: false
---

When building React applications, we typically share data across several components from parent to child via props. Passing data from parent to child components would be easy if just a few layers of components were involved.

As more components are introduced, things start to get complex, and keeping track of state and props can quickly become cumbersome.

The **React Context API** provides an interface that enables data sharing across components without using the props drilling approach.

In this tutorial, we are going to build a mini e-commerce store and walk through examples of how we can use the context API for sharing data across multiple components.

<br />

Steps we'll cover:

  - [What is a Context](#what-is-a-context)
  - [Project Setup](#project-setup)
  - [Building the Product Listings](#building-the-product-listings)
  - [Why and When Do we need the context API?](#why-and-when-do-we-need-the-context-api?)
  - [Creating a Context](#creating-a-context)
  - [Consuming the Context](#consuming-the-context)
  - [Share Data across components](#share-data-across-components)



## What is a React Context API?

The React Context API allows us to store and retrieve data across multiple components without passing data from parent to child components.

The React context works basically in a two-way approach. You wrap all components that share similar data within the context provider as a parent component and access the data in the context via a `Consumer` or `useContext` hook.

To use the context API, you need to create a context by calling the `createContext` function with an optional default value when using JavaScript.

```tsx
const defaultValue = { title: "Bag" };
const CartContext = React.createContext(defaultValue);
```

The above creates a `CartContext`, we can call the `useContext` hook to consume the data from the `CartContext`.

```tsx
function App() {
  const data = React.useContext(CartContext);
  return (
    <CartContext.Provider value={defaultValue}>
      <AnotherComponent>
        <div>{data.title}</div>
      </AnotherComponent>
    </CartContext.Provider>
  );
}
```

<br />


## Project Setup
To get started with the project, run the command

```
npx create-next-app react-context-tutorial --typescript 
```
This will bootstrap a Next.js app with TypeScript. I like to use absolute paths when building next.js applications.

- Open the tsconfig.json file and add the highlighted line.

  ```
  "baseUrl":"src"
  ```
  

- Create a new folder named `src` in the root directory of the app.
- Move the pages and styles folder into the `src` folder.


- Change the path of the style in `_app.tsx` to use absolute path.

```tsx title="src/_app.tsx"
  import 'styles/globals.css'
  import type { AppProps } from 'next/app'

  function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
  }

  export default MyApp

```
  
- Run the command `npm run dev` to start the app.
- Open your browser on port 3000 (`http://localhost:3000`).
- You should see the default welcome to next.js message!
  

<br />

## Building the Product Listings

This is where things start to get interesting. We are going to build the UIs for the product listing and share data across several components in this section.

- Replace the styles in global.css with this [CSS](https://gist.github.com/pseudoeazy/62e3259eaba1b253ced7c02b86caec40).

-  Copy and paste `products` data below inside the `products.ts` file.

```ts title="src/constants/products.ts"
const products = [
  {
    id: 1,
    title: "Grape",
  },
  {
    id: 2,
    title: "ice cream",
  },
  {
    id: 3,
    title: "Tangerine",
  },
];

export default products;
```
- Create the `Product` data type structure for the product of the app inside a `product.ts` file in the `types` directory.
  
```ts title="src/types/product.ts"
export default interface Product {
  id: number;
  title: string;
}
```

  
- Replace the `index.tsx` in the `pages` directory with the following code.
  
```tsx title="src/pages/index.tsx"
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="container">
      <main className="main-content">
        <h1 style={{ textAlign: "center" }}>Hello World</h1>
      </main>
    </div>
  );
};

export default Home;
```
If we reload our browser, we should see "Hello World" printed on the screen.


<br />

- Create the following files (*favorites.tsx*, *product-list.tsx*, *product-item.tsx* and *product-details.tsx*) in the `components` directory.

<details><summary>Show the favorites.tsx</summary>
<p>

```tsx title="src/components/favorites.tsx"
import Product from "types/product";

interface Props {
  products: Product[];
  favorites: number[];
}

const Favorites: React.FC<Props> = ({ products, favorites }) => {
  const myFavorites: Product[] = [];

  favorites.forEach((fav) => {
    const favorite = products.find((product) => product.id === fav);
    if (favorite) {
      myFavorites.push(favorite);
    }
  });

  return (
    <section className="favorites">
      <h2>My Favorite products</h2>
      {myFavorites.length ? (
        <ul>
          {myFavorites.map((favorite) => (
            <li key={favorite.id}>{favorite.title}</li>
          ))}
        </ul>
      ) : (
        <div>😂No favorite product!</div>
      )}
    </section>
  );
};
export default Favorites;
```

 </p>
</details>

<details><summary>Show the product-list.tsx code </summary>
<p>

```tsx title="src/components/product-list.tsx"
import React from "react";
import ProductItem from "components/product-item";
import Product from "types/product";

interface Props {
  favorites: number[];
  products: Product[];
  handleFavorite: (productId: number) => void;
}

const ProductList: React.FC<Props> = ({
  favorites,
  products,
  handleFavorite,
}) => {
  return (
    <section className="product-container">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          handleFavorite={handleFavorite}
          favorites={favorites}
        />
      ))}
    </section>
  );
};
export default ProductList;
```
 </p>
</details>

<details><summary>Show the product-item.tsx  </summary>
<p>

  
```tsx title="src/components/product-item.tsx"
import React from "react";
import ProductDetails from "components/product-details";
import Product from "types/product";

interface Props {
  product: Product;
  favorites: number[];
  handleFavorite: (productId: number) => void;
}

const ProductItem: React.FC<Props> = ({
  product,
  handleFavorite,
  favorites,
}) => {

  return (
    <div className="product-card">
      <ProductDetails
        product={product}
        handleFavorite={handleFavorite}
        favorites={favorites}
      />
    </div>
  );
};
export default ProductItem;
```

 </p>
</details>

<details><summary>Show the product-details.tsx </summary>
<p>



```tsx title="src/components/product-details.tsx"
import React from "react";
import Product from "types/product";

interface Props {
  product: Product;
  favorites: number[];
  handleFavorite: (productId: number) => void;
}

const ProductDetails: React.FC<Props> = ({
  product,
  handleFavorite,
  favorites,
}) => {
  const isFavorite = favorites.includes(product.id);
  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image">{product.title}</div>
      </div>
      <div className="add-to-cart">
        <button
          type="button"
          className="button"
          onClick={() => handleFavorite(product.id)}
        >
          <span>{isFavorite ? "❤️" : "❤︎"}</span>
        </button>
      </div>
    </div>
  );
};
export default ProductDetails;

```

 </p>
</details>



- Update the index.tsx file in the `pages` directory with the following code.

```tsx title="src/pages/index.tsx"
import { useState } from "react";
import type { NextPage } from "next";
import ProductList from "components/product-list";
import products from "constants/products";
import Favorites from "components/favorites";

const Home: NextPage = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      const newFavorites = favorites.filter((fav) => fav !== productId);
      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, productId]);
    }
  };
  return (
    <div className="container">
      <main className="main-content">
        <Favorites products={products} favorites={favorites} />
        <ProductList
          products={products}
          favorites={favorites}
          handleFavorite={handleFavorite}
        />
      </main>
    </div>
  );
};

export default Home;

```


If you click the favorite icon for each product, you should see it listed under the list of my favorite products.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-23-react-context/favorite-product-list.png"  alt="React context API favouriteProduct" />

</div>

<br />






## Why and When Do we need the context API?

If we look at the `Home` component, we see it has  `favorites` state that keeps track of the user's favorite products. This data is shared across several components.

The `ProductDetails` component calls the `handleFavorite` function to update the state in the `Home` component and the `Favorites` component reacts to each update of the `favorites` data.

To add a product as a favorite, we need to pass the `favorites` state and `handleFavorite` function as prop down to the `ProductDetails` component.





<div className="centered-image"  >
   <img style={{alignSelf:"center", width:"300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-23-react-context/prop-drill-favorite.png"  alt="React context API propDrillingFav" />
</div>


<br />

If the `ProductDetails` component becomes very complex and requires ten properties, we need to pass all ten properties as props to the said component. This can become quite complicated and that is basically how `React` works. We pass data through props from parent to child component.

How can we manage data across components that are far apart in the component tree? This prop drilling method of sharing data between components can become very complicated and inefficient as more properties are introduced and the component tree continues to grow.

The React Context API allows share data across multiple components without using the prop drilling approach.


<br />


## Creating a Context

Creating a context is as easy as calling `createContext` function with a default value. If you don't know what type of data you want to store in the context, you can save an empty object as `any` data type.

```
import { createContext } from "react";
const ExampleContext = createContext({} as any);
```
- create a folder named `context` in the `src` directory.
- create a file a named `example.context.tsx` inside the `context` folder and copy the code below.

```tsx title="src/context/example.context.tsx"
import React, { createContext, useContext } from "react";

const myData = { username: "Israel" };
export const ExampleContext = createContext(myData);

interface Props {
  children: React.ReactNode;
}

export const ExampleProvider: React.FC<Props> = ({ children }) => {
  return (
    <ExampleContext.Provider value={{ username: "Chibuzor" }}>
      {children}
    </ExampleContext.Provider>
  );
};
```

- We created an `ExampleContext` with `myData` as it default value.
- We created `ExampleProvider` component, this will act as a parent component that we can wrap multiple components that will consume data from the context.
- The `ExampleProvider` returns "`ExampleContext.Provider`" component with a value passed as prop to the "`ExampleContext.Provider`" .
- The `ExampleContext.Provider`, makes the value passed as prop available to all child components.
- The `ExampleContext.Provider` must have only a single prop called "value" and that value can have only one value. Here we pass an object that has a similar data structure with the `myData` default value of the context when it was created.

<br />

## Consuming the Context
We are going to use the `useContext` hook to consume the data from our `ExampleContext`.

- Update the `example.context.tsx` 


```tsx title="src/context/example.context.tsx"
import React, { createContext, useContext } from "react";

const myData = { username: "Israel" };
export const ExampleContext = createContext(myData);

interface Props {
  children: React.ReactNode;
}

export const ExampleProvider: React.FC<Props> = ({ children }) => {
  return (
    <ExampleContext.Provider value={{ username: "Chibuzor" }}>
      {children}
    </ExampleContext.Provider>
  );
};

export const Greet = () => {
  const data = useContext(ExampleContext);
  return <h1>Hello, {data.username}</h1>;
};

```

- Update the `index.tsx` in the page directory.

```tsx title="src/pages/index.tsx"
...
import { ExampleProvider, Greet } from "context/example.context";

const Home: NextPage = () => {
 ...
  return (
    <div className="container">
      <main className="main-content">
        <ExampleProvider>
          <Greet />
        </ExampleProvider>
        <Favorites products={products} favorites={favorites} />
        <ProductList
          products={products}
          favorites={favorites}
          handleFavorite={handleFavorite}
        />
      </main>
    </div>
  );
};

export default Home;

```


Reloading the browser should print "Hello Chibuzor" on the screen.


In the `example.context.tsx`, we called the `useContext` hook and passed the `ExampleContext` whose data we want to consume. The `useContext` hook returns the data from the `ExampleContext` and the `Greet` component renders the data without receiving the data via props from the `ExampleProvider` component.

<br />


---


<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />



---

## Share Data across components

In this section, we are going to refactor our code to use the React context.

- create a `product.context.tsx` file in the `context` folder and copy the code below.

```tsx title="src/context/product.context.tsx"
import React, { createContext, useContext, useReducer } from "react";
import products from "constants/products";
import Product from "types/product";

type ProductData = {
  products: Product[];
  favorites: number[];
};

type ProductAction =
  | {
      type: "PRODUCTS";
      products: Product[];
    }
  | {
      type: "FAVORITES";
      favorites: number;
    };

const productReducer = (
  state: ProductData,
  action: ProductAction
): ProductData => {

  switch (action.type) {
    case "PRODUCTS":
      return { ...state, products: action.products };
case "FAVORITES":

      let favorites = state.favorites;

if (state.favorites.includes(action.favorites)) {
        favorites = favorites.filter((fav) => fav !== action.favorites);
      } else {
        favorites = [...state.favorites, action.favorites];
      }

return { ...state, favorites };
default:
      return state;
  }
};

const defaultValues: ProductData = {
  products,
  favorites: [],
};

const myProduct = {
  product: defaultValues,
  setProduct: (action: ProductAction): void => {},
};

const ProductContext = createContext<{
  product: ProductData;
  setProduct: React.Dispatch<ProductAction>;
}>(myProduct); //initialize context with default value

interface Props {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [product, setProduct] = useReducer(productReducer, defaultValues);

return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);

```




- We moved the logic for handling favorites inside the `productReducer`.
- We initialized the `ProductContext` with a default value.
- We export a `useProduct` function that exports the value of the `ProductContext`. If we don't export the `useProduct` function, we would have to call the `useContext` and pass `ProductContext` as its argument each time we want to consume the `ProductContext` data in any component.
- We need to update our components (*index.tsx*, *favorites.tsx*, *product-list.tsx*, *product-item.tsx* and *product-details.tsx*) to consume the data in the `ProductContext`.

```tsx title="src/pages/index.tsx"
import type { NextPage } from "next";
import ProductList from "components/product-list";
import Favorites from "components/favorites";
import { ProductProvider } from "context/product.context";

const Home: NextPage = () => {
  return (
    <div className="container">
      <main className="main-content">
        <ProductProvider>
          <Favorites />
          <ProductList />
        </ProductProvider>
      </main>
    </div>
  );
};

export default Home;
```

<details><summary>Show the favorites.tsx</summary>
<p>


```tsx title="src/components/favorites.tsx"
import Product from "types/product";
import { useProduct } from "context/product.context";

const Favorites: React.FC = () => {
  const { product } = useProduct();
  const myFavorites: Product[] = [];

  product.favorites.forEach((fav) => {
    const favorite = product.products.find((product) => product.id === fav);
    if (favorite) {
      myFavorites.push(favorite);
    }
  });
 
  return (
    <section className="favorites">
      <h2>My Favorite products</h2>
      {myFavorites.length ? (
        <ul>
          {myFavorites.map((favorite) => (
            <li key={favorite.id}>{favorite.title}</li>
          ))}
        </ul>
      ) : (
        <div>😂No favorite product!</div>
      )}
    </section>
  );
};

export default Favorites;
```

 </p>
</details>

<details><summary>Show the product-list.tsx</summary>
<p>

```tsx title="src/components/product-list.tsx"
import React from "react";
import ProductItem from "components/product-item";
import { useProduct } from "context/product.context";

const ProductList: React.FC = () => {
  const { product } = useProduct();
  return (
    <section className="product-container">
      {product.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductList;
```
 </p>
</details>

<details><summary>Show the product-item.tsx</summary>
<p>

```tsx title="src/components/product-item.tsx"
import React from "react";
import ProductDetails from "components/product-details";
import Product from "types/product";

interface Props {
  product: Product;
}
const ProductItem: React.FC<Props> = ({ product }) => {
  return (
    <div className="product-card">
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductItem;
```

 </p>
</details>

<details><summary>Show the product-details.tsx</summary>
<p>


```tsx title="src/components/product-details.tsx"
import React from "react";
import Product from "types/product";
import { useProduct } from "context/product.context";

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const { product: productData, setProduct } = useProduct();

  const handleFavorite = (productId: number) => {
    setProduct({ type: "FAVORITES", favorites: productId });
  };

  const isFavorite = productData.favorites.includes(product.id);

  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image">{product.title}</div>
      </div>
      <div className="add-to-cart">
        <button
          type="button"
          className="button"
          onClick={() => handleFavorite(product.id)}
        >
          <span>{isFavorite ? "❤️" : "❤︎"}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
```
 </p>
</details>


- If we reload our browser, our app should work as expected.

Our web application works as before, only this time the data is shared via the React Context API. The React context has some performance benefits when used properly.

<br />


## Conclusion

Okay, I promise, that is all there is to getting started with the React Context API.

In summary, to use a context.

- Create the context by calling `createContext` function.
- Make the Context.Provider the Parent component.
- Call the `useContext` hook and pass the context as an argument.

Here is the link to the github repo.
```
https://github.com/pseudoeazy/react-context-tutorial
```

Live URL for the complete app.

```
http://react-context-tutorial-sf2t.vercel.app/
```
