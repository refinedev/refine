---
title: Mocking API calls in React Tests with Nock
description: How to test API calls in React?
slug: mocking-api-calls-in-react
authors: necati
tags: [react, testing, nock, jest, mocking]
image: https://refine.dev/img/refine_social.png
hide_table_of_contents: false
---

import testrun from '@site/static/img/blog/2022-08-04-mocking-api-calls/test-run.png';
import nockrecord from '@site/static/img/blog/2022-08-04-mocking-api-calls/nock-recorder-log.png';

## Introduction
Images are a significant part of modern-day web application development. Depending on how you use them, they can either make or mar your applications' developer and user experiences. Images impact user experience and are equally crucial in Search Engine Optimization (SEO) ranking when used right.
Traditionally, images are added to web pages with the HTML `img` tag. This might prove to be efficient for simple use-cases, but things quickly get untidy when dealing with a sizable amount of images. 

NextJS introduced a solution for delivering performant images on the web in v.10. It features a new Image component and built-in automatic image optimization. In the coming sections, you'll learn how to leverage this solution for optimizing and developing performant applications, thereby improving developer and end-user experiences.  
<!--truncate-->

I'll show how to write unit tests for API calls by mocking method in the simple React app.


Steps we'll cover: 

## Prerequisites

This article contains code samples, so a good background in coding in JavaScript and React is essential to proceed with the article. 


## Preparing Your Images for Optimization 

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

## The NextJS Image Component

The `<Image />` component is a batteries-included modern solution for serving images in NextJS applications. It's similar to the native HTML `<img/>` element but has a few differences.

The major difference between the two is the out-of-the-box image optimization, performance benefits that come with the NextJS `<Image/>` component, and a number of other useful features, which we'll explore in the coming sections. The Image component usage is the same as using any other component in NextJS and can be used and re-used depending on your needs.

## Using the `<Image/>` component

To get started, you'll need to import the `<Image />` component from `next/image` like so: 

```js
import Image from 'next/image'
```
And then use the component as shown below:

```js
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

```js

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

:::note You **should** always add the `width` and `height` props in the image component when using remote images because NextJS cannot determine the images dimension during the build process for proper page rendering to prevent layout shifts.
:::