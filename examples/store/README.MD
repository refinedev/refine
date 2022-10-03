







## refine Swag Store



## About

### Participants

## Description

We were planing to build swag store for our open source project called refine.

We had two options when it came to building this shop.

The first option was to deploy a ready-made solution like Shopify, and the second was to create a custom solution.

Since refine can be used to build eCommerce storefronts with SSR support, we started looking for Headless eCommerce solutions.
During this process, we met with the Medusajs, and we decided that the solution offered by Medusajs fit us quite well. 
Starting from this, we dediced to use Medusajs as a backend and built the storefront app with refine and Next.js. 
 
In that way, we were able to share complete ecommerce store solution with open source community. Also, it helps us to test our framework with real world use case.

We deployed our backend Medusa fastly without pain. Firsty, we deployed our admin interface and created products, collections, and other stuff. 
For the UI we used [Vercel's eCommerce template](https://demo.vercel.store/). Since there are no payment step involved in Vercel's eCommerce template, we took advantage of the (nextjs-starter-medusa)[https://github.com/medusajs/nextjs-starter-medusa] for checkout and account features.

So basicly we built complete eCommerce storefront by combining Vercel's eCommerce template with nextjs-starter-medusa.

Currently, we are using this store and already processed real shopping transactions with credit cards and gift codes. 
Here is the deployed version.
https://store.refine.dev/



 The app includes the following features:
- Product listing
- Authentication & Authorization
- Product detail
- Shopping cart
- Payment with Stripe
- Gift Code feature
  


Our basic requirements for the shop were:

  * It should be easy to use for our users.
  * It should be easy to maintain for us.
  * It should be easy to extend for us.


# refine-next


This project was generated with [superplate](https://github.com/pankod/superplate).

## Getting Started

superplate is a Next.js all-in-one project generator. Create your project with the tools you need without spending hours on setting them up.

## Available Scripts

### Running the development server.

```bash
    npm run dev
```

### Building for production.

```bash
    npm run build
```

### Running the production server.

```bash
    npm run start
```

## Learn More

To learn more about **superplate**, please check out the [Documentation](https://github.com/pankod/superplate).


### **CSS / styled-jsx**

Next.js comes with built-in support for CSS and styled-jsx. Styled-jsx is full, scoped and component-friendly CSS support for JSX (rendered on the server or the client).

[Go To Documentation](https://github.com/vercel/styled-jsx)


### **ESLint**

A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Maintain your code quality with ease.

[Go To Documentation](https://eslint.org/docs/user-guide/getting-started)



## License

MIT
