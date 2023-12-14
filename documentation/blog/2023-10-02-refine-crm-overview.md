---
title: Building a Complete React CRM App with Refine, Ant Design and GraphQL
description: We'll explore the key features of our CRM app, the technologies we used.
slug: react-crm-with-refine
authors: necati
tags: [refine, react]
is_featured: true
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-10-02-refine-crm-overview/social.jpg
hide_table_of_contents: false
---

![Image description](https://refine.ams3.cdn.digitaloceanspaces.com/CRM-app/crm-general.gif)

I want to introduce our newest example app – a full-fledged React CRM (Customer Relationship Management) application built using refine, Ant Design, and GraphQL.

👉 [Live Demo](https://example.crm.refine.dev/)

👉 [You can find the source code on GitHub here](https://github.com/refinedev/refine/tree/master/examples/app-crm)

This example is open-source, which means anyone can freely utilize and customize the source code as they see fit. It's not just another application; it's a comprehensive solution that boasts all the features and functionalities required for an accurate enterprise-level application.

Moreover, this application serves as a guiding light for all developers. Whether you're a seasoned pro or just starting, our project is a valuable resource that can be used as a reference to better understand best practices and modern development techniques.

We'll publish an article series and Video tutorials on YouTube on building this CRM app from scratch. You can follow the refine to get notified when it's ready!

Twitter: https://twitter.com/refine_dev
GitHub: https://github.com/refinedev/refine

## Introduction

This article briefly overviews the CRM application built using refine, an open-source React framework designed for rapidly developing web applications.

We'll explore the key features of our CRM app, the technologies we used, and how you can adapt this template for various business needs.

Step we'll cover:

- [Key Features of the CRM App](#key-features-of-the-crm-app)
- [Technologies Used](#technologies-used)
- [Best Practices and Ecosystem Integration](#best-practices-and-ecosystem-integration)
- [Where Can You Use This CRM As A Reference Template?](#where-can-you-use-this-crm-as-a-reference-template)

## Key Features of the CRM App

Our CRM application is feature-rich and comes with everything you need to manage customer relationships efficiently:

### Dashboard

The Dashboard provides an at-a-glance overview of your CRM activities. It displays key metrics, recent customer interactions, and upcoming events, offering valuable insights to help you make informed decisions.

![Image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/halx7sfl9ctke1fu3w35.png)

<br/>
<br/>

### Calendar Integration

Effortlessly manage appointments, meetings, and important events with the integrated Calendar feature. Stay organized and ensure you never miss a crucial interaction with your customers.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m2v8ghazuheiznefwat9.png)

<br/>
<br/>

### Scrumboard-Project Kanban

Our Scrumboard or Project Kanban page streamlines project management. Visualize project progress, manage tasks, and facilitate team collaboration with ease. Move tasks through customizable boards to keep your projects on track.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0hcll7tbqx3t71i6v7a9.png)

<br/>
<br/>

### Sales Pipeline

Effectively manage your sales process from lead generation to deal closure. The Sales Pipeline provides a visual representation of your sales stages, helping your team prioritize leads and track conversions.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q5uoj722wasvw2fx8z49.png)

<br/>
<br/>

### Companies

The Companies page allows you to organize and categorize your business contacts. Maintain detailed profiles for each company, including contact information, communication history, and associated contacts.

![Imag](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gjlahcc1icfthu2n31ar.png)

<br/>
<br/>

### Contacts

Manage individual contacts efficiently using the Contacts page. Keep track of customer interactions, schedule follow-ups, and access critical contact information quickly.

![Imag](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4c0ef7tv7nktax4gt3oz.png)

<br/>
<br/>

### Quotes

Create, send, and manage quotes seamlessly with the Quotes feature. Generate professional quotes for your customers, track their status, and convert them into sales.

![Image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9rqj0pzgkrure7ov5mr9.png)

<br/>
<br/>

### Administration

The Administration section empowers you to configure and customize your CRM application to suit your specific business needs. Manage user roles, access permissions, and system settings effortlessly.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m5deq6ceue79kloeuryz.png)

<br/>

### Authentication & Authorization

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m1r04i2h0cf1jegasbte.png)

This example app is a comprehensive set of features that ensures you can streamline your customer interactions, project management, and sales processes, all within a single, user-friendly platform. Whether you're managing contacts, tracking sales, or overseeing projects, our CRM app provides the tools you need for success.

## Technologies Used

Our CRM app's modular structure and use of open-source tools make it adaptable to various business needs. So you can build all kinds of web apps like internal tools, admin panels, or dashboards on top of it.

To bring our CRM app to life, we leveraged several cutting-edge technologies:

### 1. refine

[refine](https://github.com/refinedev/refine) served as the backbone of our CRM application. It offers a wide range of tools and components for easily building data-intensive applications.

refine's internal hooks and components simplify the development process and eliminate repetitive tasks by providing industry-standard solutions for crucial aspects of a project, including authentication, access control, routing, networking, state management, and i18n.

### 2. Ant Design

[Ant Design](https://ant.design/), a popular UI library, provided the sleek and responsive user interface that our CRM app needed. Its pre-built components saved us time and effort.

It's consistent and polished UI components ensured a professional and user-friendly interface. refine has a built-in integration for Ant Design.

### 3. GraphQL

We used [GraphQL](https://graphql.org/) for effective data retrieval and updating from our server. Additionally, we integrated [GraphQL Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/) to manage real-time modifications.

For instance, on the Project Kanban page, tasks get updated automatically when cards are dragged and dropped between sections.

![Image](https://refine.ams3.cdn.digitaloceanspaces.com/CRM-app/real-time.gif)

GraphQL's efficient data-fetching capabilities made working with large datasets a breeze. It's flexibility allowed us to tailor our queries to our exact requirements.

refine has built-in data provider support for GraphQL.You can set it up during the project creation phase.

## Best Practices and Ecosystem Integration

Throughout the development process, we adhered to best practices and incorporated elements from the broader ecosystem. This ensures our CRM app is not only functional but also scalable and maintainable.

The group responsible for the CRM example app is the core refine framework team. Feel free to explore the best practices within the ecosystem!

## Where Can You Use This CRM As A Reference Template?

Our CRM template isn't limited to just one use case. You can adapt it for various purposes, including:

- **B2B Applications**: Streamline customer interactions in a business-to-business context.
- **Internal Tools**: Use it as an internal tool to manage employee or departmental tasks and interactions.
- **All CRUD Applications**: The template's versatility means it can serve as the foundation for creating all sorts of CRUD applications.

## Conclusion

In this article, we've introduced you to our CRM application built with refine. We've highlighted its key features, the technologies we used, and the advantages of our approach. With this CRM template, you have the power to tailor your customer relationship management system to meet your unique business needs. Whether you're running a B2B operation, need an efficient internal tool, or want a versatile CRUD application, our CRM template has you covered.
