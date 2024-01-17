---
title: Data Fetching
---

import { Sandpack, FocusOnDataProviderFile, AddDataProviderToRefine } from "./sandpack.tsx";

<Sandpack>

In this chapter, we'll be learning about the basics of data fetching in Refine. `<Refine />` component accepts a `dataProvider` prop which is used to handle all the data fetching and mutation operations with a simple interface. While Refine supports many data providers out of the box, for sake of this tutorial, we'll be creating our own data provider and connecting it to a [fake REST API](https://api.fake-rest.refine.dev/).

To learn more about the supported data providers, [Supported Data Providers](/docs/guides-concepts/data-fetching/#supported-data-providers) section of the Data Fetching guide.

## Creating a Data Provider

We'll be implementing each of the methods one by one to make sure we're covering all the implementation details for each method. We'll be using `fetch` to make our requests to the API. You can use any library you want to make the requests.

First, we'll create an `src/data-provider.ts` file in our project. This file will contain all the methods we need to implement for our data provider. <FocusOnDataProviderFile>Check out the `data-provider.ts`</FocusOnDataProviderFile> in the right panel to see an empty data provider.

Then, we'll pass our `dataProvider` to `<Refine />` component in `src/App.tsx` file with the `dataProvider` prop.

Try to add the following code to your `src/App.tsx` file:

```tsx
// We're also removing the `<WelcomePage />` component from the file.
import { Refine } from "@refinedev/core";

import { dataProvider } from "./data-provider";

export default function App(): JSX.Element {
  return <Refine dataProvider={dataProvider}></Refine>;
}
```

If you're having hard time updating file, <AddDataProviderToRefine>Click to update the file</AddDataProviderToRefine>.

In the next chapter, we'll be learning about the fetching a record using Refine's `useOne` hook and implementing the `getOne` method in our data provider.

</Sandpack>
