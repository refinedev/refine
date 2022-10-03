## refine Swag Store


![Screenshot](./cover-image.png)


## Live App Link
Here is the deployed version.
https://store.refine.dev/


## About

### Participants

refine.dev - [GitHub](https://github.com/pankod/refine) - [Twitter](https://twitter.com/refine_dev) - [Discord](https://discord.gg/refine)


### Description
This is a complete eCommerce storefront app built with refine, Medusa.js, Next.js, and Stripe.

We were planning to build a swag store for our open source project called refine.

We had two options when it came to building this shop.

The first option was to deploy a ready-made solution like Shopify, and the second was to create a custom solution.

Since refine can be used to build eCommerce storefronts with SSR support, we started looking for Headless eCommerce solutions.
During this process, we met with the Medusajs, and we decided that the solution offered by Medusajs fit us quite well. 
Starting from this, we decided to use the Medusa.js commerce server and built the storefront app with refine and Next.js. 
 
In that way, we could share complete eCommerce store solutions with the open source community. Also, it helps us to test our framework with a real-world use case.

We deployed our Medusa commerce server fastly without pain. First, we deployed our admin interface and created products, collections, and other stuff. 
For the UI, we used [Vercel's eCommerce template](https://demo.vercel.store/). Since there is no payment step involved in Vercel's eCommerce template, we took advantage of the (nextjs-starter-medusa)[https://github.com/medusajs/nextjs-starter-medusa] for checkout and account features.

So basically, we built a complete eCommerce storefront by combining Vercel's eCommerce template with nextjs-starter-medusa.

Currently, we are using this store and have already processed real shopping transactions with credit cards and gift codes. 

 The app includes the following features:
- Authentication & Authorization
- Product Listing
- Account information pages
- Product detail
- Shopping cart
- Payment with Stripe
- Gift Code feature

### Preview


![App preview](https://refine-store.fra1.cdn.digitaloceanspaces.com/video/refine-store-demo.gif)                                                               
   
                                                                              
                                                                   
## Set up Project   
### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Stripe Account](https://stripe.com/)
- [Medusa Account](https://medusa-commerce.com/)

### Install Project

Clone the project

```
git clone https://github.com/pankod/refine --depth 1
```

Go to the project directory.

```
npm install
```

### Running the development server.

```bash
npm run bootstrap -- --scope refine-store
```

```bash
npm run start -- --scope refine-store
```


## Resources
- [refine documentation](https://refine.dev/docs/tutorials/headless-tutorial/)
- [Medusa documentation](https://docs.medusajs.com/advanced/backend/endpoints/add-storefront)