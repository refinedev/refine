---
title: Developing Internal Tools in 2024
description: Internal tools are specialized software applications used by a company's back-office departments.
slug: internal-tools
authors: abdullah_numan
tags: [dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-03-07-internal-tools-development/social.png
hide_table_of_contents: false
---

## Introduction

This post provides an industry-centric perspective on the track custom internal tools development. We cover the trail of emergent technologies in web based internal tools development, and present a comprehensive guide on building enterprise tools with cutting-edge open source frameworks and libraries in the React/Node.js ecosystem.

Internal tools are specialized software applications used by a company's back-office departments. They empower a workforce by automating complex business processes and workflows for staff, managers, administrators and other stakeholders. Software based business process and workflow management helps companies achieve greater efficiency and productivity by enabling better collaboration among participants, more refined processes and streamlined workflows.

In this post, we briefly review the current state of the enterprise tools landscape to understand how internal tools development looks like entering 2024. We first get a brief historical account of how off-the-shelf desktop based internal tools solutions made their way to the web via cloud hosted applications. We evaluate the pros and cons of internal tool builder platforms and differentiate them from more custom development using cutting edge open source technologies in the React/Node.js ecosystem.

We emphasize on the importance of developing interoperable, extensible and future-adaptive bespoke enterprise tools with greater velocity and eficiency. To that end, we assess leading frameworks and tools in the React/Node.js ecosystem that are used for building internal tools from scratch. We then present a detailed guide on what to consider while building future proof internal tools and how Refine's architecture, core features and support packages are geared to build highly efficient, future-adaptive internal tools in 2024.

Steps we'll cover:

- [Business Process \& Workflow Automation: Traditional Internal Tools](#business-process--workflow-automation-traditional-internal-tools)
  - [Enterprise Internal Tools: Their Types and Features](#enterprise-internal-tools-their-types-and-features)
  - [Off-the-shelf Internal Tools](#off-the-shelf-internal-tools-pros-and-cons)
- [Custom Internal Tool Builders: No Code / Low Code Platforms](#custom-internal-tool-builders-no-code--low-code-platforms)
  - [Citizen Developers for No Code Internal Tools](#citizen-developers-for-no-code-internal-tools)
  - [Low Code Convenience for the Internal Tools Developer](#low-code-convenience-for-the-internal-tools-developer)
- [Custom Internal Tools Development with Open Source Technologies](#custom-internal-tools-development-with-open-source-technologies)
  - [Essentials of Internal Tools Development](#essentials-of-internal-tools-development)
- [Refine.js: a React Based Framework for Internal Tools Development](#refinejs-a-react-based-framework-for-internal-tools-development)

## Business Process & Workflow Automation: Traditional Internal Tools

Historically, internal tools such as Finance, Accounting and HR software were run offline on desktop based business computers. Major providers of enterprise software are SAP, Oracle, Microsoft, Salesforce, HubSpot and Zoho. They offer comprehensive suites of on-premise solutions that include ERP software, CRM systems, CMSs and host of other domain specific tools. Since the dot-com boom of 2000s, these off-the-shelf solutions are also available via cloud hosted web applications.

### Enterprise Internal Tools: Their Types and Features

A wide variety of internal tools that empower different aspects of a business exist today. They range from domain specific solutions such as Customer Relations Management (CRM) tools or customer support ticketing systems to comprehensive toolsets such as Enterprise Resource Planning (ERP) suites. Typically, an ERP software sets up the backbone of an enterprise tooling system and embodies, integrates and coordinates smaller interoperable business solutions such as CRM systems, CMSs, team collaboration tools, etc.

Below is a quick rundown of common enterprise internal tools used by stable busnesses.

- **Enterprise Resource Planning (ERP) Suite**
  An ERP tool provides comprehensive set of solutions for different business operations. It provides a single source of truth with a central database and a backbone that integrates applications specific to separate business units such as finance, HR, accounting, sales, logistics and supply chain manamgent, etc. Most ERP software divide unit-specific applications into modules that are plugged in to the central system according to business needs.

  Common examples of ERP suites are [SAP](https://www.sap.com/index.html), [Oracle NetSuite](https://www.netsuite.com/portal/home.shtml) and [Microsoft Dynamics](https://www.microsoft.com/en-us/dynamics-365). They provide on premise licenses, as well as tier based subscriptions to cloud hosted web versions.

- **Customer Relation Management Software**
  A CRM software automates sales related processes included in marketing, customer retention, profit generation, loyalty and customer satisfaction domains. A CRM tool generally offers integrations with an ERP system, its communications infrastructure, as well as its data analytics and business intelligence tools.

  Dominant CRMs such as [Salesforce](https://www.salesforce.com/) and [Zoho](https://www.zoho.com/) offer tier based subscriptions to cloud hosted web applications as well as on-premise licenses.

- **Admin Panels**
  An admin panel is a tool that facilitates role based access of digital resources to administrators, such as managers, editors, sales representatives, customer support reps. They allow these stakeholders to list, create, edit, update and delete resource items stored in company databases.

  Admin panels are common components of internal tools such as CRM software, CMSs and any application that requires admin users to perform CRUD (create, read, update, delete) actions. Typical features included in admin panels are user profile management, tabulated data as well as dashboards containing data visualizations, metric and analytics .

  For C level administrators and decision makers, user and roles management is a key feature implemented to allow structuring their organization. Approval workflow is another feature typical to admin panels for all levels of admin scopes.

- **Dashboards**
  Dashboards present data metrics, visualizations, reports and real-time analytics in a page specifically intended to provide insightful overview to a stakeholder. Dashboards are used in ERP software, admin panels, business intelligence software and any tool that offer central access and management of resources.

- **Business Intelligence Tools**
  Essentially, business intelligence tools specialize in capturing, transforming, manipulating and analyzing data. Generating reports and visualizations are integral parts of BI software. In most cases, data processing is handled by powerful engines running in the background. BI tools are also able to integrate with ERP systems and third party services.

- **Content Management Systems**
  CMSs have emerged to be business driving tools for all enterprises that use digital marketing to attract inbound customers. They are particularly an essential necessity for publishing SEO content online in blogs, FAQ portals and news sites. Generally, CMSs come with a backend admin panel from where authors, editors and moderators are able to create, regulate and publish content. Common content published in CMSs are articles, reports, and multimedia posts. Adding internationalization features helps customize content into regional languages and locales.

  There are a plenty of content management systems out there in the wild. Popular web based CMS frameworks such as [Wordpress](https://wordpress.com/), [Contentful](https://www.contentful.com/) and [Strapi](https://strapi.io/) operate under free and paid subscriptions.

- **Customer Support Ticketing Systems**
  Customer helpdesk ticketing systems manage incoming requests and equip enterprises to provide support to customers. Support ticketing systems implement approval mechanisms that involve stakeholders at several levels.

  Zendesk, Zoho Desk and Freshdesk are among top customer ticketing software of 2023. All are available under tiered subscriptions.

- **Collaboration Tools**
  Central to workforce empowerment are collaboration tools such as Slack, Google Groups, Discord, Discourse, Trello and a host of other technologies that foster workplace communication and teamwork. Most of them start with a free tier and offer commercial features on its top.

Apart from these common types, internal tools vary specific to industries. For example, inventory management software help automate and manage processes in warehouses, e-commerce stocks and sales stores. Logistics and supply chain software Refine complex workflows that involve multiple stakeholders. And there are other types of internal tools for sourcing and procurement, manufacturing, research & development and engineering, asset management, etc.

Besides implementing domain specific logic for each of these types, internal tools have to implement the following core functionalities:

- Security and Authorization
- Data fetching, processing and management
- User Experience and Interface Design

### Off-the-shelf Internal Tools

Internal tools provided by the above industry giants are battle tested solutions that fit the needs of well established businesses and enable digital transformations of average SMEs. Yet, these are not one-size-fits-all solutions and specific concerns -- including those in their own back office -- adopt new tools to meet emerging business needs.

**Pros**

- Benchmark setting solutions.
- Enable digital transformation and standardize workplace processes across industries.
- Develops common workforce culture.

**Cons**

- No one-size-fits-all solution.
- Overkill for small businesses with a few areas of concern.
- Vendor lock-in, which basically means sticking to one specific provider and adopt their solution, while being forced to discard a better outsider solution because it is not supported here.
- Little scope for innovation.
- Often limited third party integrations.
- Limited customization of GUI.

Off the shelf solutions are mostly not appropriate for small businesses just starting with a few concerns, limited technical capacity and a constrained budget. It is common for small businesses and startups nowadays to adopt an approach where they initially prefer custom tools development using **no-code platforms** and then when their business grows to a certain size, they subscribe to appropriate ERP or CRM solutions.

Larger enterprises with a spare budget seek to invest in building custom solutions around atypical and innovative business ideas. While it could be possible for them to build a new tool from scratch, in many simple cases, a more sensible approach is to take advantage of available options such as no-code / low-code internal tool builders.

## Custom Internal Tool Builders: No Code / Low Code Platforms

Uncommon business requirements, and disruptive ideas often lead enterprises to improvise and innovate solutions to problems seldom encountered or never came across before. For example, Google has hundreds of internal tools particular to their industry leading technology ventures. One illustrious example is Borgmon (now Monarch), a browser based monitoring and alerting tool developed to collect data about the impact of service changes in Google products. Obviously, it's Google, and they needed it. So, they built it from scratch.

### Citizen Developers for No Code Internal Tools

Enterprise level custom internal tools are typically less sophisticated, but business critical for average non-technical managers, administrators and decision makers. No Code platforms such as Google's AppSheet and Microsoft PowerApps are ideal go-to spots for citizen developers as they help get fully functional internal tools up and running in hours. Essential features such as authentication and authorization, security and monitoring are added out-of-the-box. No Code platforms facilitate building simple internal tools backed by a database / data source and customizable UI widgets / components. Within these platforms, non-tech folks enjoy a significant degree of developer freedom to choose databases and other components of the stack.

Apps developed best in no-code platforms are simple ones that involve a few resources, but often are used to collect real time data, particularly over a long period of time. Please feel free to check some of the [examples of what can be achieved on AppSheet](https://www.appsheet.com/templates).

Top downsides of these platforms are again vendor lock-in, excessive gamification of pricing plans, limited customizability and poor set of integration options. And most importantly for developers, there's no access to the application code.

### Low Code Convenience for the Internal Tools Developer

Low Code platforms takes no-code internal tool development to the next level by helping developers customize the generated app with access to the source code. Here too, essential features like authentication, authorization, security and monitoring come in-built. On top of choosing stack and UI components, developers can pick certain technologies like React for building the UI and markup with significant level of freedom.

Low-code development in platforms like OutSystems and Retool often means initializing a monolith scaffold with all essential features baked in, and then adding business process logic and user interfaces particular to requirements. Both Outsystems and Retool allow development of UI components with React. Low Code platforms seem to offer greater customizations than no-code counterparts.

However, as in no-code platforms, low-code apps are subject to vendor lock-in, limited customizability, almost no extensibility and narrow range of third party integration options. One notable bottleneck is that some platforms impose strict walled gardening with their own set of development tools that include their own domain specific languages and SDKs. For example, Retool has its own markup language called Toolscript that involves an additional learning curve besides industry standard alternatives like JSX.

## Custom Internal Tools Development with Open Source Technologies

Typically, after they attain a certain business maturity level, enterprises seek much greater customizability, extensibility and future adaptability of app features. At such landmarks, rebuilding the same internal tool ground up with a dedicated team of developers and open source technologies is an appropriate strategy. It is common to follow an iterative approach to continuously integrate enhancements to a core set of functionalities.

Bespoke development of web based internal tools with open source technolgies like React/Node.js has gained traction in recent years. This is mostly due to how JavaScript based frontend frameworks such as Next.js, Remix, Gatsby, Angular.js, Svelte, etc., have flourished over a decade and created space for whole lots of wildly offshooting UI frameworks and libraries.

Implementing elegantly designed complex UI components that are typical of internal tools that perform consistently across platforms and browsers are now made easy by React based UI design systems and frameworks like Ant Design, Material UI, Mantine and TailwindCSS.

Let's go through the important fundamentals of developing enterprise internal tools here, and in the sections ahead we relate to how Refine addresses these essentials for rapidly building future-proof internal tools.

### Essentials of Internal Tools Development

Modern internal tools development involves the following considerations that applies to developing all kinds of data heavy applications:

- **Scalability and adaptability**. Mostly shaped by architectural decisions and choice of underlying technologies.
- **Extensibility and integration support**.
- **Development speed and efficiency**. Depends on the team size, sprint cycles, and the velocity offered by development infrastructure, frameworks and libraries.
- **Developer experience**. Often aligns with optimal developer environment, technological choices and the team culture that enables development of a product.
- **User experience, interface design and implementation**
- **Backend API integration, data fetching and management**

**Interoperability of Services**

In addition, enterprise systems also need to consider **interoperability** of tools between business units. This is implemented with a cloud hosted database that acts as a single source of truth for all business resources accessed by individual units, and they talk to each other when they need while executing their respective operations.

## Refine.js: a React Based Framework for Internal Tools Development

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-03-07-internal-tools-development/refine.jpeg" alt="Internal tools" />
</div>

[Refine.js](https://github.com/refinedev/refine) is in the mix as a React based meta framework that empowers enterprises with wide range of technologies in building extensible and future adaptive internal tools. Refine compares to industry standard competitors in the ecosystem, such as Redwood and React Admin. It sets a benchmark with support for a wider range of state-of-the-art backend and UI systems.

In the sections ahead, we present some guiding insight into how Refine compares to its competitors in the light of its capabilities in realizing the above considerations.

### Scalability and Adaptability

Refine is architectured with scalability and adaptability in mind. It has a headless core that is minimally coupled to a cascade of contexts which must be configured externally using providers and accessed with a set of core hooks. Minimal coupling ensures a wider integration surface that offers unconstrained customizability of app layers with appropriately configured providers.

Refine's architecture makes its core extremely flexible and adaptable to changes in libraries that underpin its core components and ecosystem of support packages. This makes developing scalable and extensible internal tools with Refine more convenient than frameworks like Redwood.js which is coupled to certain backend and UI design systems.

### Extensibility and Integration

Refine's core is headless. This gives greater freedom to extension via a wider integration surface to all possible options for a particular provider. For example, the data layer of a Refine app can be integrated to any backed API with its particular data provider configuration. The same logic applies to UI framework integrations.

Refine offers extensions and integrations to backend API and UI frameworks with the help of two-way adapters -- one side connecting to the core and the other side interfacing with third party services.

Bidirectional adaptation makes Refine a versatile framework that empowers enterprises to build complex, multitenant internal tools with optimal speed and efficiency.

### Development Speed and Efficiency

Internal tools development has to be fast and efficient. This is attested historically by the suites and modules that ERP software is delivered under licenses and subscription plans -- as well as by modern speedy development using builder platforms. Enterprises want their tools delivered seamless, packaged and ready. This is because they've got businesses to do.

Development speed and efficiency depends on team size, sprint cycles and the frameworks and libraries selected in the stack. Choice of libraries direct the velocity of development. This happens by how well a library is documented, supported, and open to extension and adaptation in the future. Well documented, extensible and future adaptible frameworks and libraries help quickly produce stable, maintainable and scalable code.

Refine facilitates faster internal tools development by leveraging under the hood state-of-the-art libraries like React Query, React Hook Form and React Table. Refine retools these libraries in its backyard by extending and enhancing them with adapter packages. For example, Refine augments the capabilities of [React Hook Form](https://www.react-hook-form.com/) in its [Refine React Hook Form](https://github.com/refinedev/refine/tree/main/packages/react-hook-form) support package. With Refine's headless architecture and two-way adapter for React Hook Form, any UI framework can be chained to provision complex form components and hooks inside pages. For instance, with the help of the [`useTable()`](https://refine.dev/docs/data/hooks/use-table/) data hook, Refine's support package for [Ant Design](https://refine.dev/docs/ui-integrations/ant-design/introduction/) enables creating complex tables in an admin panel with a few lines of code.

In other words, Refine's open ecosystem of underlying and supplementary libraries helps achieve faster development velocity and efficiency while building internal tools.

### Developer Experience

Working with Refine and its ecosystem of libraries gives a joyful experience to internal tools developers. You should come up to speed with cutting edge frameworks and libraries that stabilized and trended in recent years. React Table, for example, went through a major overhaul in 2022, but its support in Refine remains seamless. Similar case with UI libraries such as Ant Design and Material UI.

### User Experience and UI Design

Refine is focused on helping build scalable internal tools with extensibility and adaptability to future changes in mind. Refine extends major UI systems like Ant Design and Material UI to produce interfaces / components with minimal lines of code. Thanks to its expansive support for top React based UI frameworks, it enables implementing elegant, responsive, cross browser compatible dashboards, admin panels and data visualizations using their existing components without any need to host large collections of custom components on its own.

See the list of adapters for [React based UI frameworks supported in Refine](https://refine.dev/docs/ui-integrations/ant-design/introduction/).

Refine provides unconstrained freedom in terms of any UI library integration.

### Backend API and Data

Refine offers unmatched flexibility in backend API integration. Again, Refine's two-way adaptability ensures unconstrained integration of its core to a growing list of backend API providers. The list includes [Strapi, Supabase, Appwrite, Airtable and more](https://refine.dev/docs/packages/list-of-packages/#data-provider-packages). Besides, Refine is geared to easily accommodate custom backend APIs built with frameworks like Nest.js, Rails and Django with a declarative [`dataProvider`](https://refine.dev/docs/data/data-provider/) object.

Refine's minimal coupling ensures a greater surface for backend API integration with the help of data providers. This gives Refine an upper edge over Redwood which is coupled to a backend that offers somewhat tedious integrations to external APIs via Prisma and other middlewares.

**Interoperability and Multiple Data Sources**

Internal tools are centered around a single source of data that is shared across business units. Interoperability of internal tools is essential to enterprise operations. Refine is geared to implement interoperable modules by connecting to a single data source with a primary data provider. In BI tools, that usually fetch and process data from multiple sources, multiple data providers can also be used to access the necessary data.

**Multitenancy**

Multitenancy is perhaps the most important part of internal tools. Roles based access to resources are integral features in any internal tool. Admin panels, dashboards, CMSs, CRMSs, all need role based access. Refine's support for major multitenancy packages like [Cerbos](https://cerbos.dev/), [Casbin](https://casbin.org/), [AccessControl.js](https://onury.io/accesscontrol/), all help implement RBAC in an internal tool application with ease.

**Data Fetching and Management**

Refine leverages latest libraries like React Query, [GraphQL Request](https://github.com/jasonkuhrt/graphql-request) and [GraphQL Query Builder](https://github.com/atulmy/gql-query-builder) for data fetching, caching, state manamgent and error handling. Refine's core handles many of the data heavy tasks with the help of these future adaptive solutions.

## The Way Forward

Enterprise internal tools development largely depends on the complexity of the requirements, the business maturity of the organization, technical level of managers and budgetary constraints. A simple tool like a project tracker could be easily built by non-tech managers. For more complex requirements and atypical business problems / solutions bespoke development with open source technologies is the way to go.

With a rich ecosystem of future adaptive technologies, support for growing list of backend API and UI integrations, Refine is fully equipped to make internal tools development in 2024 a breeze. You can build complex systems like CRMs, admin panels, dashboards, data visualization and more.

Feel free to check out Refine's [examples](https://refine.dev/docs/examples/) and [templates](https://refine.dev/templates/) to learn more about the internal tools you can build with Refine.
