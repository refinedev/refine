---
title: When to use dangerouslySetInnerHTML in React?
description: Find out when to use dangerouslySetInnerHTML in React and how it can help avoid XSS attacks.
slug: use-react-dangerouslysetinnerhtml
authors: clara_ekekenta
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-25-react-dangerouslyInnerhtml/social.png
hide_table_of_contents: false
---




## Introduction
Rendering HTML markup from rich text created in a WYSIWYG editor might be difficult. Because numerous pieces of logic are required to make things work as they should. This can be attributed to the fact that React uses a browser-independent system to manipulate the DOM elements, thus preventing direct interaction with the DOM. Things can be pretty much easier and faster with dangerouslySetInnerHTML.

In this tutorial, we'll see how to use `dangerouslySetInnerHTML` in a React application.

Step we'll cover:
- [What is dangerouslySetInnerHTML?](#what-is-dangerouslysetinnerhtml)
- [When to use dangerouslySetInnerHTML?](#when-to-use-dangerouslysetinnerhtml)

## What is dangerouslySetInnerHTML?
**React dangerouslySetInnerHTML** is an HTML property that makes it easy to programmatically set the HTML elements from an external source. It has replaced the innerHTML used in the browser DOM.
dangerouslySetInnerHTML helps React know how to handle the HTML elements in a component where the contents are to be rendered.

## When to use dangerouslySetInnerHTML?
**dangerouslySetInnerHTML** is mostly used in any application where you need to render formatted text in a div element. Also, you can use it to render content exactly as you have formatted it. For instance, let's consider a blog application. The body of a blog is usually formatted with headers, paragrams, images, code blocks, etc.

To render such contents in a React application, you'll need to manipulate the DOM to get the HTML elements in the contents and set them to an element using innerHTML. Because React does not allow direct interaction with the DOM, your content will end up not being displayed as it should. However, when dangerouslySetInnerHTML is applied, React recognizes the HTML tags and correctly renders them.

Due to its vulnerability to cross-site scripting (XSS) attacks, dangerouslySetInnerHTML might constitute a major threat to your application, as the name suggests. However, DOMPurify has proven to be a highly effective tool in overcoming such difficulties. DOMPurify is a DOM-only XSS sanitizer for HTML for preventing XSS attacks by stripping out all dangerous HTML in content rendered in an application.

For example, if users are permitted to insert HTML directly into a web page via a form field, hackers can embed malicious code into the application, causing the application to behave inappropriately or even resulting in data loss. Consider the following code:

```tsx
const App = () => {
  const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`;

  return (
    <div dangerouslySetInnerHTML={{__html: data}} />
  );
}
```
A piece of JavaScript code was embedded in the above code. This will trigger an alert each time a user tries to access the application. This is because the data was not sanitized before being rendered in the application. The above code will return the below result.

```tsx
lorem ipsum <img src="" onerror="alert('mailicious message');" />
```


As shown below, you can sanitize the data to remove all malicious code and scripts embedded in it.

```tsx
import DOMPurify from 'dompurify';

const App = () => {
  const data = `lorem <b onmouseover="alert('mailicious message');">test</b>`

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(data)
  })

  return (
   dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data)}}></div>
  );
}

export default App;
```
The above code will strip out the script in the data that has been rendered on the application and the result below.

```tsx
 lorem test <img src="">
```

---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />



---


### Building a simple example app
To demonstrate how dangerouslySetInnerHTML works in a React application, let's build a simple blog application. To make things easier, we'll use  [superplate](https://github.com/pankod/superplate) CLI to create React apps.

To get started, create a new app with the command below.

```
npx superplate-cli blog
```
The above command will prompt you to choose the configuration for your project. Your selection should look like the screenshot below.

<div class="img-container" align-items="center" style={{alignSelf:"center", width:"400px"}} >
   <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-25-react-dangerouslyInnerhtml/dangerouslySetInnerhtml-cli.png"  alt="dangerouslySetInnerhtml cli" />
</div>

<br/>



Once you complete the prompts, Superlate will install all the required packages and set up the project folders for your application.

Now install the Dompurify module to sanitize the HTML codes we'll render in the app.

```
npm install dompurify @types/dompurify
```

Next, open the application in your favorite text editor. Then create a `data.json` file in the src folder of the project and add the dummy data below.

```tsx
{
  "blogs": [
    {
      "title": "<h3>Node.js for begineers</h3>",
      "content": "<p>Lorem ipsum dolor <b>sit</b> amet consectetur adipisicing elit. <strike>Enim ex a</strike> veniam, molestiae praesentium culpa, mollitia officiis quas quia vitae voluptates</p>"
    },
    {
      "title": "<h3>Sit amet consectetur adipisicing eli</h3>",
      "content": "<p>Lorem ipsum dolor <b>sit</b> amet consectetur adipisicing elit. <strike>Enim ex a</strike> veniam, molestiae praesentium culpa, mollitia officiis quas quia vitae voluptates</p>"
    },
    {
      "title": "<h3>Sit amet consectetur adipisicing eli</h3>",
      "content": "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <i>Enim ex a</i> veniam, molestiae praesentium culpa, mollitia officiis quas quia vitae voluptates</p>"
    }
  ]
}
```
In the above JSON data, we created some HTML formatted blog data we'll render to the application.

Now update the code in the `pages/index.ts` file to render the data with the code snippet below.

```tsx
import React from "react";
import DOMPurify from "dompurify";
import { Row, Col, Container, Card } from "react-bootstrap";
import data from "../data.json"

const Home: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="my-5 flex-grow-1">
      <Row>
        {(data.blogs.map((data) => (
          <Col md={4} key={data.title} className="mb-3">
            <Card className="border-none">
              <Card.Body>
                <Card.Title>
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data.title)}}></div>
                 </Card.Title>
                <Card.Text>
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data.content)}}></div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )))}
      </Row>
    </Container>
    </div>
  );
};

export default Home;
```

In the above code snippet, we imported dompurify to sanitize the contents in the blog, react-bootstrap components to style the application, and the dummy JSON data we created. Then in the card, we looped through the blogs to access and render the data in the objects.

 For the Card title and Text, we added div elements and attached the **dangerouslySetInnerHTML** property to render the contents according to how they were formatted.

 To allow the div where the contents are rendered to have children, we passed in the `--html` key to **dangerouslySetInnerHTML** and wrapped the content to be rendered in the dompurify **sanitize** method.



<div class="img-container" align-items="center" >
   <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-25-react-dangerouslyInnerhtml/dangerouslySetInnerhtml-usage.png"  alt="dangerouslySetInnerhtml usage" />
</div>

<br/>

In the above screenshot, `dangerouslySetInnerHTML` has rendered the contents just the way they were been formatted to look like.

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>

## Conclusion
dangerouslySetInnerHTML in a React application. We started by explaining what dangerouslySetInnerHTML is, when to use it, and the best practices for using it in a React application.
