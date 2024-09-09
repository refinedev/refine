---
title: Framer Motion React Animations
description: We'll walk you through the features and functionalities of Framer Motion.
slug: framer-motion
authors: peter_osah
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/social.png
hide_table_of_contents: false
---

## Introduction

Modern web development relies heavily on animations to create a dynamic and interesting user experience. Creating animations in React applications can be done using traditional CSS or JavaScript however, it can become very cumbersome. Various libraries like GSAP, React Spring, anime.js, etc were created to combat the ambiguity in creating animations but one worthy to note is Framer Motion. Framer Motion is a famous React animation library that makes constructing complicated animations easier by providing utility animation components as well as hooks. In this article, we will walk you through the features and functionalities of Framer Motion.

## What is Framer motion?

[Framer-motion](https://www.framer.com/motion/) is an open-source React animation and gesture library that offers a low-level API for integrating animation and gestures into elements in React applications while preserving HTML and SVG semantics.

Framer-motion was made by Framer, the company behind the Framer site builder designed for creative professionals.

## Setting up Framer Motion in React.

To setup framer motion in a React project, you must install the framer motion package using the below commands

**npm**

```
npm install framer-motion
```

## Components in Framer

Framer Motion includes a set of key components that serve as the basis for producing animations They are:

### Motion

The motion component encapsulates `HTML` elements in `React` components, allowing you to animate them using initial and animate props. Motion components are **DOM** primitives designed specifically for **60fps** animation and gestures.

**Props available in motion components**

- #### `animate`:
  The `animate` prop is in responsible for animating `motion` components because it holds the CSS properties to be animated. It is an object that accepts a key-value pair representing the CSS property(in camel case) and its value, respectively.

An example of the animate prop on a motion component is provided below:

```tsx
<motion.div
  animate={{
    x: 0,
    backgroundColor: "#000",
    boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
    position: "fixed",
  }}
/>
```

in the example above, the properties `backgroundColor`, `boxShadow`, `position` are animated to their respective specified values.

##### Examples of text and image animations using motion animate props

- animating texts using its opacity

**Code:**

```tsx
<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="text-[40px] font-bold capitalize"
>
  Text animated using opacity
</motion.p>
```

From the code above, we can specify the initial animation property and value to be animated using the `initial` props and then animate that to another value using the `animate` props.

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/text-opacity-min.gif" alt="typescript zod" />
</div>

- Animating texts using its transform scale:

**Code:**

```tsx
<motion.p
  initial={{ scale: 0.5 }}
  animate={{ scale: 1 }}
  className="text-[40px] font-bold capitalize"
>
  Text animated using scale
</motion.p>
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/text-scale-min.gif" alt="typescript zod" />
</div>

- Animating texts using their opacity and scale: you can also combine properties to get the desired animation.

**Code:**

```tsx
<motion.p
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  className="text-[40px] font-bold capitalize"
>
  Text animated using opacity and scale
</motion.p>
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/text-scale-opacity-min.gif" alt="typescript zod" />
</div>

- Animating texts with translate transforms: We can create a translate animation by defining the x and y positions.

**Code:**

```tsx
<motion.p
  initial={{ x: -100, y: -100 }}
  animate={{ x: 1, y: 1 }}
  className="text-[30px] font-bold capitalize"
>
  Text animated using transform translate
</motion.p>
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/text-translate-min.gif" alt="typescript zod" />
</div>

- #### `layout`
  The `layout` props is effective in animating layouts (like **height** **width**, flex properties like **justify-content**, **flex-start**, etc). It does this performantly and doesn't trigger browser layout mechanisms with each animation frame by animating layout-related structures with transforms under the hood rather than the specified layout CSS property.

An example of the animate prop on a motion component is provided below:

```tsx
<motion.div layout />
```

##### Examples of text and image animations using motion layouts

Here is an example that uses motion layout to animate its expanded parent element on click:

**Code:**

```tsx
<motion.div
  layout
  data-expanded={isOpen}
  initial={{ borderRadius: 50 }}
  className="flex h-[100px] w-[100px] items-center justify-center bg-black data-[expanded=true]:h-[200px] data-[expanded=true]:w-[400px]"
  onClick={() => setIsOpen(!isOpen)}
>
  <motion.div layout className="h-10 w-10 rounded-full bg-white" />
</motion.div>
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/layout-animations-min.gif" alt="typescript zod" />
</div>

- #### `Gestures`
  `motion` components add a straightforward but effective collection of UI gesture handlers to React's core set of event listeners.
  At the moment, it supports gesture detection for **hover**, **tap**, **pan**, and **drag** is supported. You can add several event listeners to your motion component for each gesture.

An example of a gesture handler on a motion component is shown below:

Below is an example of a hover gesture handler:

```tsx
<motion.button
  whileHover={{
    scale: 1.2,
    transition: { duration: 1 },
  }}
  whileTap={{ scale: 0.9 }}
/>
```

##### Examples of text and image animations using motion gestures

Below is an example of a scale animation displayed on hover:

**Code:**

```tsx
<motion.div
  className="h-[80px] w-[200px] cursor-pointer rounded-[50px] bg-[#00ccff]"
  whileHover={{ scale: 1.1 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }}
/>
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/hover-gesture-min.gif" alt="typescript zod" />
</div>

- #### `Transitions`
  `motion` components can accept a `transition` prop, which specifies the type of animation used while animating CSS properties.
  In the transition props object, we can specify the `duration`, `delay`, `ease` properties of the transition.

##### Examples of animations using motion transitions

An example of the `transition` prop with `duration`, `ease`, and `delay` on a motion component is shown below:

**Code:**

```tsx
<motion.div
  className=" h-[200px] w-[200px] rounded-full bg-black"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    duration: 0.8,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01],
  }}
/>
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/transition-properties-min.gif" alt="typescript zod" />
</div>

the transition props can also receive props that specify which sort of animation to utilize (**Tween**, **Spring**, or **Inertia**).

**Code:**

```tsx
<motion.div
    className="flex items-center justify-center text-white w-[200px] h-[200px] rounded-full bg-black"
    animate={{ y: 100 }}
    transition={{ type: "spring", stiffness: 200 }}
    >
        Transition : Spring
</motion.div>

<motion.div
    className="flex items-center justify-center text-white w-[200px] h-[200px] rounded-full bg-black"
    animate={{ y: 100, pathLength: 1 }}
    transition={{ type: "tween", duration: 3, }}
    >
        Transition: Tween
</motion.div>

<motion.div
    className="flex items-center justify-center text-white w-[200px] h-[200px] rounded-full bg-black"
    animate={{ y: 100 }}
    transition={{ type: "inertia", velocity: 120 }}
    >
        Transition: Inertia
</motion.div>
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/transition-types-min.gif" alt="typescript zod" />
</div>

#### Examples of other animations with motion components

### AnimatePresence

Components removed from the React tree can be animated out using the `AnimatePresence` component.

This component solves many cases such as animating an element on react that was conditionally rendered as React lacks a lifecycle method that supports the notification of components to be unmounted as well as allowing them to defer unmounting until after an action (like an animation) has been executed.

#### Examples of animations using AnimatePresence

An example below is an animation done on a conditionally rendered div box.

**Code:**

```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="mt-20 flex h-screen max-h-screen w-full flex-col items-center justify-start">
      <div className="flex flex-col items-center p-0 pb-[50px]">
        <motion.button
          className="rounded-[10px] bg-black p-4 text-white"
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? "Hide" : "Show"}
        </motion.button>
      </div>

      <AnimatePresence>
        {show ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="m-0 flex h-[150px] w-[150px] items-center justify-center rounded-[30px] bg-black text-white"
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/animation-presence-min.gif" alt="typescript zod" />
</div>

## Hooks in Framer

### useSpring

A motion value can be animated in a spring fashion through the `useSpring` hook.

The `useSpring` hook generates a motion value that animates to its latest target value using a spring animation. The target can be set manually using `.set` methods, or automatically by handing in another motion value.

`useSpring` can be initialized with a number.

```tsx
const spring = useSpring(0);
```

Or, with a motionValue provided by framer

```tsx
const x = useMotionValue(0);
const spring = useSpring(x);
```

UseSpring can be configured using the [standard spring transition options](https://www.framer.com/motion/transition/#spring).

```tsx
useSpring(x, { stiffness: 1000, damping: 10 });
```

#### Use cases of the useSpring hook.

An example is to utilize the `useSpring` hook to animate the scale parameters of an element when the `useEffect hook` is triggered or when the element is hovered over.

**Code:**

```tsx
import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const App = () => {
  const x = useSpring(0.5);
  const y = useSpring(0.5);

  useEffect(() => {
    x.set(1);
  }, []);

  return (
    <div>
      <motion.div
        className="flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-black p-4 text-sm text-white"
        style={{ scale: x }}
      >
        Spring scale animation on useEffect (component mounts)
      </motion.div>

      <motion.div
        className="flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-black p-4 text-sm text-white"
        onHoverStart={() => y.set(1)}
        style={{ scale: y }}
      >
        Spring scale animation on Hover
      </motion.div>
    </div>
  );
};
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/use-spring-min.gif" alt="typescript zod" />
</div>

### useScroll

The `useScroll` hook is a hook in Framer Motion that is used to watch scroll positions on an element or page. It is frequently used to create scroll-linked animations such as progress bars and parallax effects.

the `useScroll` hook returns four motion values:

- **ScrollX/Y**: The absolute scroll position of the X and Y axis (in pixels).
- **scrollXProgress/YProgress**: The scroll position (of the X and Y axis) between the specified offsets, expressed as a value between 0 and 1.

#### Use cases of the useScroll hook.

Let's look at an example of how we can use motion values to construct the classic scroll indicator. Simply send the `scrollYProgress` motion value to the styleX style property of the progress bar element, as demonstrated in the code example below.

**Code:**

```tsx
<motion.div className="progress-bar bg-red-500 fixed top-0 left-0 right-0 h-2.5 origin-left" style={{ scaleX }} />
  <h1>
    <code>useScroll</code> with spring smoothing
  </h1>

  <article>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
      rhoncus quam.
    </p>
    <p>
      Fringilla quam urna. Cras turpis elit, euismod eget ligula quis,
      imperdiet sagittis justo. In viverra fermentum ex ac vestibulum.
      Aliquam eleifend nunc a luctus porta. Mauris laoreet augue ut felis
      blandit, at iaculis odio ultrices. Nulla facilities. Vestibulum cursus
      ipsum tellus, eu tincidunt neque tincidunt a.
    </p>
    <h2>Sub-header</h2>
    <p>
      In eget sodales arcu, consectetur efficitur metus. Duis efficitur
      tincidunt odio, sit amet laoreet massa fringilla eu.
    </p>
    <p>
      Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
      Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
      Proin sit amet lacus mollis, semper massa ut, rutrum mi.
    </p>
    <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
    <p>
      Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
      leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
    </p>
    <h2>Sub-header</h2>
    <p>
      Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
      aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
      sem, sit amet tempor nulla. Quisque fermentum felis faucibus, vehicula
      metus ac, interdum nibh. Curabitur vitae convallis ligula. Integer ac
      enim vel felis pharetra laoreet. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Pellentesque hendrerit ac augue quis
      pretium.
    </p>
    <p>
      Morbi ut scelerisque nibh. Integer auctor, massa non dictum tristique,
      elit metus efficitur elit, ac pretium sapien nisl nec ante. In et ex
      ultricies, mollis mi in, euismod dolor.
    </p>
    <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
    <p>
      Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
      Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
      Proin sit amet lacus mollis, semper massa ut, rutrum mi.
    </p>
    <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
    <p>
      Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
      leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
    </p>
    <h2>Sub-header</h2>
    <p>
      Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
      aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
      sem, sit amet tempor nulla. Quisque fermentum felis faucibus, vehicula
      metus ac, interdum nibh. Curabitur vitae convallis ligula. Integer ac
      enim vel felis pharetra laoreet. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Pellentesque hendrerit ac augue quis
      pretium.
    </p>
    <p>
      Morbi ut scelerisque nibh. Integer auctor, massa non dictum tristique,
      elit metus efficitur elit, ac pretium sapien nisl nec ante. In et ex
      ultricies, mollis mi in, euismod dolor.
    </p>
    <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
  </article>
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/use-scroll-min.gif" alt="typescript zod" />
</div>

The `useScroll` motion values can be combined with other motion value hooks, such as `useTransform` and `useSpring`, to create sophisticated animations like the one shown below.

**Code:**

```tsx
const data = [
  {
    id: 1,
    text: "Canyon",
    url: "https://images.pexels.com/photos/19561297/pexels-photo-19561297.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 2,
    text: "Kyoto",
    url: "https://images.pexels.com/photos/19488566/pexels-photo-19488566/free-photo-of-kyoto.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 3,
    text: "Forest",
    url: "https://images.pexels.com/photos/19237996/pexels-photo-19237996/free-photo-of-empty-road-in-forest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 4,
    text: "Vietnam",
    url: "https://images.pexels.com/photos/18707547/pexels-photo-18707547/free-photo-of-a-curved-road-in-the-mountains-with-a-motorcycle.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
];

function Images({ text, url }: { text: string; url: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [10, 20]), {
    stiffness: 100,
    damping: 5,
  });
  return (
    <section className="relative h-screen border">
      <div className="absolute inset-0 rounded-[5px]" ref={ref}>
        <img className="absolute h-full w-full" src={url} alt={text} />
        <motion.h2
          className="absolute left-[45%] top-[50%] -translate-x-1/2 text-[20px] font-bold leading-[1.2] -tracking-[2px] text-red-500"
          style={{ scale }}
        >
          {text}
        </motion.h2>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="App">
      {data.map((img) => (
        <Images key={img.id} text={img.text} url={img.url} />
      ))}
    </div>
  );
}
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/usescroll-img-min.gif" alt="typescript zod" />
</div>

### useTransform

The `useTransform` hook generates a motionValue by modifying the output of one or more other motionValues.

```tsx
const opacity = useTransform(
  x,
  // Map x from these values:
  [0, 100],
  // Into these values:
  [1, 0],
);
```

We may use the `useTransform` to define a new motion value called opacity. By specifying an input and output range, we can say, "When x is 0, opacity should be 1. When x is 100, opacity should be zero."

#### Use cases of the useTransform hook.

An example is to utilize the `useTransform` hook to animate the background parameters of an element on hover.

**Code:**

```tsx
import { motion, useTransform, motionValue } from "framer-motion";

const App = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const backgroundColor = useTransform(x, [0, 100], ["#fff", "#000"]);

  const color = useTransform(y, [0, 100], ["#000", "#fff"]);

  return (
    <div>
      <motion.div
        className="flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-black p-4 text-sm text-white"
        style={{
          backgroundColor,
          color,
        }}
        animate={{
          transition: {
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          },
        }}
        onMouseEnter={() => {
          x.set(100);
          y.set(100);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        useTransform hook background color animation on hover
      </motion.div>
    </div>
  );
};
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/usetransform-min.gif" alt="typescript zod" />
</div>

Another example is to combine the `useTransform` hook with the `useSpring` hook to get a spring animation on a transformed motion value on hover.

**Code:**

```tsx
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

const App = () => {
  const springConfig = { stiffness: 100, damping: 5 };

  const scaleMV = useMotionValue(0.5);
  const transformMV = useMotionValue(50);

  const scale = useSpring(useTransform(scaleMV, [0, 1], [0, 1]), springConfig);

  const translateX = useSpring(
    useTransform(transformMV, [0, 100], [0, 50]),
    springConfig,
  );

  return (
    <div>
      <motion.div
        className="flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-black p-4 text-sm text-white"
        style={{
          scale,
          rotateX: translateX,
        }}
        onMouseEnter={() => {
          scaleMV.set(1);
          transformMV.set(50);
        }}
        onMouseLeave={() => {
          scaleMV.set(0.5);
          transformMV.set(0);
        }}
      >
        useTransform combination with useSpring
      </motion.div>
    </div>
  );
};
```

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/usetransform-usespring-min.gif" alt="typescript zod" />
</div>

### useVelocity

When a motion value is supplied, the `useVelocity` hook takes it and provides a new one that updates with the velocity of the motion value.

**Code:**

```tsx
import { useMotionValue, useVelocity } from "framer-motion";

function Component() {
  const x = useMotionValue(0);

  const xVelocity = useVelocity(x);

  useEffect(() => {
    return xVelocity.onChange((latestVelocity) => {
      console.log("Velocity", latestVelocity);
    });
  }, []);

  return <motion.div style={{ x }} />;
}
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/usevelocity-min.gif" alt="typescript zod" />
</div>

#### Use cases of the useVelocity hook.

In the example below, we create a velocity motion value (which updates when the element moves) from a spring animation and then translate it to a scale and background motion value, which we will utilize on our element.

```tsx
const App = () => {
  const pink = (saturation: number) => `hsl(327, ${saturation}%, 50%)`;
  const x = useMotionValue(0);

  const xSmooth = useSpring(x, { damping: 50, stiffness: 400 });

  /**
   * Create a motion value from the smoothed output of x
   */
  const xVelocity = useVelocity(xSmooth);

  /**
   * Transform the velocity of x into a scale motion value
   */
  const scale = useTransform(xVelocity, [-3000, 0, 3000], [2, 1, 2], {
    clamp: false,
  });

  /**
   * Transform the velocity of x into a range of background color intensities
   */
  const backgroundColor = useTransform(
    xVelocity,
    [-2000, 0, 2000],
    [pink(100), pink(0), pink(100)],
  );

  return (
    <div>
      <motion.div
        className="h-20 w-20 rounded-[30px] bg-[#ff008c]"
        drag="x"
        dragElastic={1}
        dragConstraints={{ left: -200, right: 200 }}
        style={{ x, scale, backgroundColor }}
      />
    </div>
  );
};
```

**View:**

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-06-20-framer-motion/usetransform-usespring-min.gif" alt="typescript zod" />
</div>

## When to use Framer Motion

#### Complex Animations

If your project is something where you need complex animations that involve multi-step or multiple elements, Framer Motion quickly becomes the best way to handle such kinds of robust APIs and features.

#### Performance

If performance is a critical point in your application, Framer Motion was built for performance and will easily handle the animations of even hundreds of elements on the screen.

#### Interactive UI

For making interactive user interfaces, it allows you to make elements react to the user input smoothly and visually appealingly, which generally provides tools like gestures and drag animations.

#### State-based Animations

If you want to animate components based on changing state, Framer Motion is seamless with React's state and props; it makes developing dynamic animations very easy.

#### Ease of Use

If you'd like a library that can easily be integrated and used in your React project, Framer Motion exposes a user-friendly API with features and examples that are well documented.

#### Custom Animations

In case the need arises for more refined and controlled fine-tuning of your animations, with Framer Motion, you can define your animations down to the smallest detail.

#### Choreographed Animations

For choreographed or synchronized animations, Framer Motion includes tools such as variants and keyframes to make their management super easy.

## Conclusion

In this article, we learned how to use various Framer Motion components and props to create stunning animations with Framer motion. Framer Motion has more amazing features in its [documentation](https://www.framer.com/motion/) that we did not cover in this tutorial. You should check them out.
I hope this article becomes useful to you in building animations in React.
