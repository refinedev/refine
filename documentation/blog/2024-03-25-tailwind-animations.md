---
title: Tailwind Animations with Examples
description: Understanding the cleanup function of the useEffect hook in React. Learn how to clean up side effects in React components to prevent memory leaks and improve performance.
slug: tailwind-animations
authors: peter_osah
tags: [tailwind]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-03-25-tailwind-animations/social.png
hide_table_of_contents: false
---

## Introduction

`TailwindCSS` is a widely used, utility-first `CSS` framework that enables developers to easily create modern, responsive, and visually appealing user interfaces. Tailwind’s utility-first approach makes it easy to create `CSS` animations. This article will illustrate how to use `TailwindCSS` to add beautiful and complicated animations to your websites or applications.

Steps we'll cover:

- [Built-in utility classes in Tailwind for animating elements](#built-in-utility-classes-in-tailwind-for-animating-elements)
  - [animate-none](#animate-none)
  - [animate-spin](#animate-spin)
  - [animate-ping](#animate-ping)
  - [animate-pulse](#animate-pulse)
- [animate-bounce](#animate-bounce)
- [Create custom animations in Tailwind:](#create-custom-animations-in-tailwind)
  - [Add keyframes to the Tailwind config file.](#add-keyframes-to-the-tailwind-config-file)
  - [Extend animation in the Tailwind config file.](#extend-animation-in-the-tailwind-config-file)
- [Animate elements using arbitrary values in Tailwind.](#animate-elements-using-arbitrary-values-in-tailwind)

## Built-in utility classes in Tailwind for animating elements

Tailwind provides built-in utility classes for an array of animations that can be added to elements.

### animate-none

This utility class applies no animation to an element. It assures that the element is not affected by animation, even if it is contained in a parent element with an animation class.

**Markup**:

```html
<div className="animate-none bg-blue-500 p-5">
  <h3>Animation here</h3>
</div>
```

### animate-spin

This utility class Adds a linear spin animation to element. It can be useful on elements such as loading indicators.

**Markup**:

```html
<div class="flex justify-center">
  <svg class="animate-spin">
    <!-- ... -->
  </svg>
</div>
```

**View**:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-03-25-tailwind-animations/2-min.gif" alt="tailwind animations" />
</div>

### animate-ping

This utility class causes an element to scale and fade, much like a radar ping or a ripple in the sea. It can be beneficial on items that function as notification indications or attention-grabbing elements.

**Markup**:

```html
<div class="flex justify-center">
  <span class="relative flex h-16 w-16">
    <span
      class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"
    ></span>
    <span
      class="relative inline-flex h-16 w-16 rounded-full bg-blue-500"
    ></span>
  </span>
</div>
```

**View**:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-03-25-tailwind-animations/3-min.gif" alt="tailwind animations" />
</div>

### animate-pulse

This utility class makes an element fade in and out gradually – This class is handy for things like skeleton loaders.

**Markup**:

```html
<div class="flex justify-center">
  <div class="h-16 w-16 animate-pulse rounded-full bg-blue-400"></div>
</div>
```

**View**:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-03-25-tailwind-animations/4-min.gif" alt="tailwind animations" />
</div>

## animate-bounce

This utility class adds a bounce animation to an element. It is useful for elements like scroll indicators.

**Markup**:

```html
<div class="flex justify-center">
  <div class="h-16 w-16 animate-bounce rounded-full bg-blue-500"></div>
</div>
```

**View**:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-03-25-tailwind-animations/5-min.gif" alt="tailwind animations" />
</div>

## Create custom animations in Tailwind:

Tailwind allows us to easily construct custom animations that are not provided as built-in utility classes.
All we need to do is define your animation's keyframes in the `tailwind.config.js` file and expand the theme setup to create a new animation.

We will illustrate this with a simple animation on the Refine logo as shown below:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-03-25-tailwind-animations/6-min.gif" alt="tailwind animations" />
</div>

### Add keyframes to the Tailwind config file.

We will open the `tailwind.config.js` file in the root directory of the project and add an empty keyframes object to the `theme.extend` object. Now, inside this keyframes object, we'll add and specify our new slide animation as shown below.

```tsx
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        refine: {
          "0%": {
            left: "0%",
          },
          "20%": {
            left: "-50%",
          },
          "40%": {
            left: "0%",
          },
          "60%": {
            left: "50%",
          },
          "80%": {
            left: "0%",
          },
          "100%": {
            left: "0%",
          },
        },
      },
    },
  },
  plugins: [],
};
```

### Extend animation in the Tailwind config file.

After adding the values to our keyframes object in the `tailwind.config.js` file, we create a custom animation that uses this keyframe. We will add this animation name to a new `animation` object inside the `theme.extend` object as shown below:

```tsx
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        refine: {
          "0%": {
            left: "0%",
          },
          "20%": {
            left: "-50%",
          },
          "40%": {
            left: "0%",
          },
          "60%": {
            left: "50%",
          },
          "80%": {
            left: "0%",
          },
          "100%": {
            left: "0%",
          },
        },
      },
      animation: {
        "refine-slide": "refine 2s infinite",
      },
    },
  },
  plugins: [],
};
```

Next, we add the animation to the markup. To define a custom animation utility class in markup, use the format `animate-[nameOfAnimation]`. In our example, the name of the custom animation we added to the `tailwind.config.js` file is `refine-slide`, but when we specify the animation utility class in our 'HTML' markup, it is `animate-refine-slide`.

**Markup**:

```html
<div class="flex justify-center">
  <img
    class="animate-refine-slide relative h-16 w-16"
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRixkXz-MD-PkV6BOiGL5SAkJi9XGAyE9lLLQ&usqp=CAU"
  />
</div>
```

**View**:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-03-25-tailwind-animations/7-min.gif" alt="tailwind animations" />
</div>

## Animate elements using arbitrary values in Tailwind.

In some cases, you may want to create an animation that will only be used once in your application. Rather than extending your animations in your `Tailwind.config.js` file, `Tailwind` offers a better option in such scenarios by using arbitrary values. To use them, place the animation properties, separated by underscores, between a pair of square brackets following the animate keyword in the markup, as shown below:

```tsx
animate -
  [
    animationName_easingFunction_durationInSeconds_iterationsCount_delayInSeconds_direction,
  ];
```

For example, if you want to create a one-off "wiggle" animation, you can declare the animation keyframes in your `CSS` file, then proceed to the markup and declare the animation as an arbitrary value as shown below:

**keyframe in `CSS` File**:

```css
@keyframes wiggle {
  0% {
    transform: skewX(9deg);
  }
  10% {
    transform: skewX(-8deg);
  }
  20% {
    transform: skewX(7deg);
  }
  30% {
    transform: skewX(-6deg);
  }
  40% {
    transform: skewX(5deg);
  }
  50% {
    transform: skewX(-4deg);
  }
  60% {
    transform: skewX(3deg);
  }
  70% {
    transform: skewX(-2deg);
  }
  80% {
    transform: skewX(1deg);
  }
  90% {
    transform: skewX(0deg);
  }
  100% {
    transform: skewX(0deg);
  }
}
```

**Markup**:

```html
<div class="flex justify-center">
  <div
    class="h-16 w-16 animate-[wiggle_1s_ease-in-out_infinite] rounded-full bg-blue-500"
  ></div>
</div>
```

**View**:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-03-25-tailwind-animations/8-min.gif" alt="tailwind animations" />
</div>

## Conclusion

In this article, We took a dive into `Tailwind` built-in utility classes for animation as well as how to use `Tailwind` CSS's theme configuration feature to add custom animations. We also learned how to create one-off animations with `Tailwind` arbitrary values.
Tailwind is an excellent `CSS` framework, and its utility-first approach, combined with its theme extension features, makes it popular among developers.
