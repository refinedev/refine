---
title: Nextjs image optimization with examples
description: Built-in image optimization using next image component
slug: using-next-image
authors: michael
tags: [nextjs]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-17-using-next-image/social.png
hide_table_of_contents: false
---

## Introduction
Images are a significant part of modern-day web application development. Depending on how you use them, they can either make or mar your applications' developer and user experiences. Images impact user experience and are equally crucial in Search Engine Optimization (SEO) ranking when used right.
Traditionally, images are added to web pages with the HTML `img` tag. This might prove to be efficient for simple use-cases, but things quickly get untidy when dealing with a sizable amount of images. 

NextJS introduced a solution for delivering performant images on the web in v.10. It features a new Image component and built-in automatic image optimization. In the coming sections, you'll learn how to leverage this solution for optimizing and developing performant applications, thereby improving developer and end-user experiences.  


Steps we'll cover: 

- [Preparing Your Images for Optimization](#preparing-your-images-for-optimization)
- [The NextJS Image Component](#the-nextjs-image-component)
- [Using the `<Image/>` component](#using-the-image-component)
- [The Image Component Properties](#the-image-component-properties)
- [Optional next/image Props](#optional-props)
- [Configuration Options](#configuration-options)


## Prerequisites

This article contains code samples, so a good background in coding in JavaScript and React is essential to proceed with the article. 

## Preparing your images for optimization 

Before you dive into using the Image component, it's important to prepare your images in order to achieve optimum performance results. If you are dealing with a dynamic and large amount of images, you may want to consider a Content Delivery Network (CDN) such as Cloudinary to host your images. CDNs provide many images and application performance benefits such as automatic caching, file compression, and image resizing on the fly.

Here is a non-exhaustive list of things you should consider before serving your images to end-users:

1. **Choose the right format** 

    The three most popular image formats on the web are JPEG, PNG, and WebP. Of all three, WebP is highly recommended due to its many advantages and performance benefits.
    
    WebP is a modern image format that provides superior lossy and lossless image compression for web images without compromising quality. It provides faster load times and is widely supported by browsers. [WebP-Converter](https://webp-converter.com/) is a good tool for converting your images to WebP.
    
2. **Resize images**

    Serving the right images for the right device sizes is a vital part of image optimization on the web. Serving a huge 1080x800 image for users with 100x100 device sizes will lead to your users downloading unnecessary bandwidth, which can slow down page loads and hurt performance metrics. The [Responsive Breakpoints Generator](https://responsivebreakpoints.com) tool by Cloudinary is a good tool for generating multiple image file sizes for different screen sizes.
    
3. **Compress images**
    
    A good rule of thumb for image optimization is to keep your images below 1 Mb. Large file sizes should be reduced to a reasonable threshold without sacrificing image quality. Tools such as [TinyPNG](https://tinypng.com), [Compressor.io](https://compressor.io) are great for image compression.
    

Once you're done optimizing your images manually, you can now proceed to use the NextJS Image component for maximum image optimization benefits. 

---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />

---
## The NextJS image component

The [`<Image />`](https://nextjs.org/docs/api-reference/next/image) component is a batteries-included modern solution for serving images in NextJS applications. It's similar to the native HTML `<img/>` element but has a few differences.

The major difference between the two is the out-of-the-box image optimization, performance benefits that come with the NextJS `<Image/>` component, and a number of other useful features, which we'll explore in the coming sections. The Image component usage is the same as using any other component in NextJS and can be used and re-used depending on your needs.

## Using the `<Image/>` component

To get started, you'll need to import the `<Image />` component from `next/image` like so: 

```tsx
import Image from 'next/image'
```
And then use the component as shown below:

```tsx
import Image from 'next/image'
import profilePic from '../public/profile.webp'

const Profile = () => {
    return (
        <>
            <h1> User Profile </h1>
            <Image
                src={profilePic}
                alt='user profile picture'
            />
        </>
    )
}
```

What's interesting to note is that `next/image` automatically generates `width`, `height`, and `blurDataURL` values for statically imported images. These values are used to prevent [Cummulative Layout Shift](https://web.dev/cls/) (CLS) before the image is finally loaded. It's also possible to pass these values explicitly.

Alternatively, you can pass a remote image string value to the `src` prop by using either relative or absolute URLs: 

```ts
import Image from 'next/image'

const Profile = () => {
    return (
        <>
            <h1> User Profile </h1>
            <Image
                // Absolute URL
                src='https://unsplash.com/photos/XV1qykwu82c'
                alt='User profile picture'
                width={300}
                height={300}
            />
        </>
    )
}
```

:::note 
You **should** always add the `width` and `height` props in the image component when using remote images because NextJS cannot determine the images dimension during the build process for proper page rendering to prevent layout shifts.
:::

---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />


---

## The image component properties

The `<Image />` component accepts a number of properties (props) that enhance its performance. Basically, there are three kinds of properties that can be passed to the component. These include: **required,** **optional**, and **advanced** props. Let's walk through them one by one.

### `next/image` required props  
The `<Image />`  component requires three kinds of properties in its most basic usage. The `src`, `width`, and `height` props.

### **`src`** 

The `src` props accept two types of values: a statically imported local image object or a path string to an external absolute or relative image URL. In the previous examples, we saw how to import local static images from the `public` folder and how to pass an absolute URL string.

For relative external URL strings, e.g. `user.png`, a `domains` configuration is required in `next.config.js` to provide a list of allowed hostnames to which the relative URL will resolve. This is to prevent the abuse of external URLs by malicious users. We'll come to how to configure the `domains` object later in the article. 
    
###  **`width` and `height`** 
 
 The `width` and `height` props basically determine how much space an image takes up on a page or how scaled it is in relation to its container. 
 The `width` and `height` props can represent either the image's *rendered* or *original* width, depending on the value of `layout`.
 
  Using `layout="intrinsic"` or `layout="fixed"`, the `width` and `height` props refers to the *rendered* width and height values in pixels. This will affect how large the image appears.
 
  Using `layout="responsive"` or `layout="fill"`, the `width` and `height` props refers to the image's *original* dimensions in pixel, so this will affect the aspect ratio (i.e. how scaled the image is in relation to its container).
 
 ## `next/image` optional props

In addition to the required props, the `<Image />`  component accepts a number of commonly-used optional properties.

### **`layout`** 

Accepts a string value that determines how images react to changes in viewport sizes. Defaults to `intrinsic` and its four possible values include: 

1. **`intrinsic`** - default value for the `layout` prop. Gives the image enough space to render using its *original* width and height dimension. Try out a demo [here](https://image-component.nextjs.gallery/layout-intrinsic).


2. **`fixed`** - sizes the image to fit the exact `width` and `height` props values. Generates a `srcSet` with pixel density descriptors of 1x and 2x. Try it out [here](https://image-component.nextjs.gallery/layout-fixed).

3. **`fill`** - causes an image to expand in *width and height* to fill its parent element's width and height. Ensure you add `position: relative` to the parent element. This value is usually used with the `objectFit` property and is recommended for images in which you don't know their sizes in advance. Check out a demo [here](https://image-component.nextjs.gallery/layout-fill).

4. **`responsive`** - scales the image to fit the *width* of its parent container. Ensure you add `display: block` to the parent container. Try out a demo [here](https://image-component.nextjs.gallery/layout-responsive).


### **`loader`** 

This is a custom function that resolves external image URLs. It can be passed as a prop or set in the `images` section of `next.config.js`. When used inline as a prop, it supersedes the one defined in `next.config.js`. The function basically resolves the `src`, `width`, and `quality` parameters into a URL string as a path for an external image. An example is shown below:

```ts
import Image from 'next/image'

const customLoader = ({ src, width, quality }) => {
  return `https://s3.amazonaws.com/demo/image/${src}?w=${width}&q=${quality || 75}`
}

const MyImage = (props) => {
  return (
    <Image
        src="profilePic.webp" // This will resolve into: https://s3.amazonaws.com/demo/image/profilePic.webp?width=300&q=80
        width={300}
        height={300}
        alt="User profile picture"
        quality={80}
        loader={customLoader}
    />
  )
}
```


### **`placeholder`**  
Defines a placeholder to use before the original image is fully loaded. Possible values are `blur` or `empty`. Defaults to `empty`.

When `empty`, an empty space is shown until the original image is fully loaded.

When set to `blur`, the `blurDataURL` value will be used as a placeholder. If `src` is a statically imported image and the image format is any of `.jpg`, `.png`, `.webp`, and `.avf`, an automatically generated image will be passed as a value to the `blurDataURL` prop: 

```ts
import Image from 'next/image'
import cat from '../public/cat.webp'

<Image
    src={cat}
    alt="A picture of white cats"
    width={500}
    height={450}
    placeholder="blur"
/>
```

### **`priority`** 

This prop is particularly useful for images visible above the fold - i.e, the portion of a web page that is visible without scrolling. Images visible above the fold, such as images on a landing page, should use the `priority` prop for the performance boost. This prop tells the browser to preload the image as it's considered a high priority. Lazy loading will be automatically disabled for images using `priority`. It takes a Boolean value and defaults to false: 

```ts
<Image
    src="user.webp"
    alt="User profile photo"
    width={300}
    height={300}
    priority
/>
```


### **`quality`** 
An integer that specifies the quality of the optimized image. Its values range between `1` and `100` where `100` is the best quality. Defaults to `75`:

```ts
<Image
    src="user.webp"
    alt="User profile photo"
    width={300}
    height={300}
    quality={80}
/>
```

### **`sizes`**
 One effective way to dramatically reduce [Cummulative Layout Shift](https://web.dev/cls/) is by sizing images responsively. This helps the browser to allocate enough space for the image before it's fully loaded, so it doesn't distort the page's layout.  
  
One powerful feature of `next/image` Image component is automatic source set generation. This means NextJS can internally generate different sizes of an image and determine which of the images to download for a specific viewport size.

 `next/image` uses the `deviceSizes` and `imageSizes` properties in `next.config.js` to generate a `srcSet` to improve image delivery and performance metrics. You can optionally configure the `deviceSizes` and `imageSizes` properties if you have specific use-cases.

The `sizes` prop only works for images with `layout="responsive"` or `layout="fill"`. The `sizes` property lets us define a set of media conditions (e.g., viewport width) and slot width to tell the browser what size of image to download from the automatically-generated source set when a certain media condition is true.
Below is an example from the next/image [docs](https://nextjs.org/docs/api-reference/next/image#sizes) showing how this works.


```ts
import Image from 'next/image'

const Example = () => (
    <div >
        <Image
            src="/mock.png"
            layout="fill"
            sizes="(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw"
        />
    </div>
)
```
:::tip
You can learn more about the [srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) and [sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) attributes on MDN.
:::


### `next/image` advanced props
There are use-cases where you may need to customize the image's behavior. Find below some of the advanced props you can use on the `<Image />` component.

### **`blurDataURL`**

A base64-encoded image [DATA URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) to be used as a placeholder image before the `src` image fully loads. It will be enlarged and blurred, so a very small image of 10px or less is recommended. Only takes effect when combined with `placeholder="blur"`.

```ts
<Image
    src="https://unsplash.com/photos/XV1qykwu82c"
    alt="Cover photo"
    width={700}
    height={500}
    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA...'
    placeholder="blur"
/>
```
:::tip
[Plaiceholder](https://plaiceholder.co/) is a good tool for generating base64-encoded images. 
:::

### **`loading`**
Specifies the loading behavior of the image. Accepts two possible values `lazy` and `eager`. Defaults to `lazy`.

When set to `lazy`, loading the image is deferred until it reaches a calculated distance from the viewport. This value should be used for images that are below the fold.

When set to `eager`, load the image immediately as soon as the page is mounted. Beware of using the `eager` prop as it's turned out to hurt performance drastically.

```ts
<Image
    src="/background.webp"
    alt="Page background photo"
    width={800}
    height={750}
    loading='lazy'
/>
```

### **`objectFit`**
Sets how an image should be sized to its parent element when using `layout="fill"`. This value is passed to the [object-fit CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) for the src image. Its possible values are `fill`, `cover`, or `contain`:

```ts
<Image
    src="/user.webp"
    alt="User profile photo"
    width={300}
    height={300}
    objectFit="cover"
/>
```

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>




### **`objectPosition`**
Specifies the alignment of the image contents within the image's box. This value is passed to the [object-position CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) applied to the image. Defaults to `50% 50%`:

```ts
<Image
    src="/user.webp"
    alt="User profile photo"
    width={300}
    height={300}
    objectPosition="right bottom"
/>
```

### **`onLoadingComplete`**

When the original image is fully loaded, the callback function is triggered. The function accepts one parameter, an object with the properties:
    
- [`naturalHeight`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalHeight)
- [`naturalWidth`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth)
    

```ts
const MyProfile = (props) => {

const handleImageLoad = ({naturalWidth, naturalHeight}) => {
    console.log(naturalWidth, naturalHeight)
}

  return (
    <Image
        src="profilePic.webp" 
        width={300}
        height={300}
        alt="User profile picture"
        onLoadingComplete={handleImageLoad}
    />
  )
}
```

### **`style`**

Lets you add custom CSS styles to the underlying image element. To enable custom styling on the `<Image />` component, you can also target the image with `className`. Note that styles applied by the `layout` prop will take precedence over the `style` prop. Also, if you modify an image's width using the `style` prop, you must set `height="auto"` or the image will be distorted.

```javascript
<Image
    src="/background.webp"
    alt="Waterfall"
    width={800}
    height={800}
    style={{ opacity: 0.5 }}
    className="user_photo"
    />
```

## `next/image` configuration options
In order to use external images, a configuration is required to protect your application from malicious users. You can do so using the `domains` and `loader` properties in `next.config.js`.


### **`loader`** 

You may want to use a cloud provider to optimize images instead of using Next.js' built-in Image Optimization API. You can configure the `loader` and `path` prefix in your `next.config.js` file, which will allow you to use relative URLs (e.g. `"me.webp"`) in the `src` prop. The loader will then transform the relative URLs into absolute URLs. You can configure it like so: 

```javascript
module.exports = {
  images: {
    loader: 'amazon',
    path: 'https://s3.amazonaws.com/demoapp/'
  },
}
```


### **`domains`** 
The `domains` configuration can be used to provide a list of allowed hostnames for external images. This helps to prevent your application from malicious users. For example, the following configuration will ensure your external images starts with `s3.amazonaws.com`. Any other protocol or unmatched hostname will respond with 400 Bad Request.

```ts
module.exports = {
    images: {
    domains: ['s3.amazonaws.com']
  },
}
```



## Conclusion

Congratulations if you made it this far! In this article, you learned how to use `next/image` to deliver optimized images in NextJS through automatic lazy-loading, preloading of critical images, automatic sizing across devices, automatic support for modern image formats, and how to improve the performance of your application metrics using the `<Image />` component.


We hope this article helps you get started with building amazing developer and user experiences by leveraging the numerous customization options and features of the Image component to score good performance points.



