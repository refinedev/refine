---
title: Create an admin panel with Supabase in 5 minutes
description: Learn how Refine AI can help you create an admin panel with supabase in 5 minutes
slug: supabase-refine-ai
authors: ozgur
tags: [supabase, admin panel, AI, fast]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/supabase-admin-panel/supabase-ai-big.png
hide_table_of_contents: false
is_featured: true
---

Admin panels are a must for a lot of businesses and teams. From small groups to larger organizations, being able to see all the information at a glance is incredibly helpful. The issue is how long it takes. You might have a lot of resources to wire up, dozens of pages to create and stitch together, and even if you’re using Refine, it can still take a while.

That changed when I started using Refine AI V2 with Supabase.

With Refine AI, your days- or weeks-long admin panel project might be done in minutes.

![zzztweta](https://refine.ams3.cdn.digitaloceanspaces.com/blog/supabase-admin-panel/HR-gif.gif)

_Demo: A finished Refine AI admin panel with resources like employees, expenses, and assets._

Supabase gives you a complete PostgreSQL backend—authentication, auto-generated APIs, real-time subscriptions, file storage—all out of the box. Refine AI V2 takes it further: point it at your Supabase database, and it generates a complete admin panel in minutes. Not just scaffolding—actual working CRUD pages, forms, routing, the whole thing.

---

## Why Supabase?

If you haven't used Supabase yet, think of it as a complete backend-as-a-service built on PostgreSQL. You get a real database (not some proprietary thing), instant APIs, authentication, and file storage. The generous free tier is perfect for getting started, and it scales when you need it to.

For admin panels specifically, Supabase is ideal because everything you need is already there. No spending a day setting up auth or figuring out how to generate API endpoints—it's done.

![Supabase Database Schemas (2)](https://refine.ams3.cdn.digitaloceanspaces.com/blog/supabase-admin-panel/database-supabase.png)

---

## What is Refine AI?

Refine AI V2 is an AI-powered tool that generates complete internal tools. You connect it to your database, it analyzes your schema, and then you can chat with it to build exactly what you need. It's like having a developer who knows Refine inside-out and can scaffold pages instantly.

The code it generates isn't throw-away prototype code either—it's production-ready React with TypeScript, following best practices, ready to customize.

---

### Step 1: Create the project

Here's where it gets fun. Head over to [ai.refine.dev/v2](https://ai.refine.dev/v2) and click "Start building with Refine AI."

First, pick your UI framework. For this project, we'll use shadcn/ui, but you can choose whichever you prefer.

![AI Refine DevTools Wizard](https://refine.ams3.cdn.digitaloceanspaces.com/blog/supabase-admin-panel/choose-framework)

Afterward, it's as simple as connecting your Supabase project to Refine AI—just choose the project you want to use as your backend.

![develop.ai.refine.dev_v2_wizard_dy1oU4xf_backend](https://refine.ams3.cdn.digitaloceanspaces.com/blog/supabase-admin-panel/wizard-backend.png)

If you don't have one, you can also use the sample HR API, which is an almost exact copy of what you'll see here.

![DevTools Backend Wizard](https://refine.ams3.cdn.digitaloceanspaces.com/blog/supabase-admin-panel/backend-wizard-2.png)

### Step 2: Let the AI Analyze Your Database

![DevTools Refine AI Wizard](https://refine.ams3.cdn.digitaloceanspaces.com/blog/supabase-admin-panel/wizard-3.png)

After you connect to your Supabase database, click Continue and let AI analyze your schema. You can ask it questions or have it make changes, but for this walkthrough, we won't make any edits.

Give your tables a final look before pressing Continue again.

- All your tables and their structure
- What type each column is (text, numbers, dates, UUIDs, etc.)
- How tables relate to each other (those foreign key relationships)
- Constraints and default values

### Step 3: Generate production-ready code

Now that Refine AI has analyzed our schema thoroughly, we can start generating pages.

![Refine AI project start screen](https://refine.ams3.cdn.digitaloceanspaces.com/blog/supabase-admin-panel/ai-example-1)
_Start screen: "What would you like to do first?" with options like creating an Employee list page with a data table._

You'll be greeted by a page like the one above, and the AI will offer a few options to start your project. You're free to use the chat to give your own instructions, but picking one of the suggested options is usually more than enough.

For this guide, we'll first create the Employee list page, which appears at the top of the suggestions.

![Generated Employee list page](https://refine.ams3.cdn.digitaloceanspaces.com/blog/supabase-admin-panel/ai-example-2)
_Generated Employee list with a data table alongside the chat and follow-up suggestions._

In less than a minute, the AI generates the list resource page, and it's fully explorable. It's as simple as clicking a suggested action or typing what you want. AI will create pages from your resources, and if you don't like the layout or how the data is represented, just tweak it, Refine AI handles the wiring.

If you simply go with the suggestions, you'll end up with a project like the one below in under an hour.

![zzztweta](https://refine.ams3.cdn.digitaloceanspaces.com/blog/supabase-admin-panel/HR-gif.gif)

_Demo: A working admin panel created with Refine AI in minutes._

Fully working, fully customizable, fully yours—an admin panel built with maintainable, readable code.

---

## Why This Matters

The process used to be: set up a project, install dependencies, configure the data provider, build the list page, build the create form, build the edit form, build the show page, wire up the routes... repeat for every resource. It's not that hard, but it's time-consuming and honestly kind of boring. Even with Refine, it takes time—time you could spend on other things.

Refine AI changes that. You go from idea to working admin panel in minutes. Your Supabase schema becomes a fully functional admin panel in the blink of an eye.

**You can actually ship things quickly**. Internal tools that would take days? Done in an afternoon. Customer dashboards? Up and running by lunch. MVPs that need to move fast? No problem.

**You spend time on what matters**. Every app needs basic CRUD. Every admin panel needs tables and forms. Those are solved problems. With AI handling the scaffolding, you can focus on the unique parts—your business logic, custom workflows, integrations, the features that actually differentiate your product.

**You're more productive, not replaced**. This isn't about AI taking over development. It's about AI being your pair programmer for the boring parts. You still make the architectural decisions. You still write the custom logic. You just don't waste time rebuilding data tables for the hundredth time.

I've been using this workflow for my projects, and honestly, I don't think I'll go back to building admin panels the old way.

---

## Give It a Try

If you're building an admin panel (or need to), try this out. Seriously. It takes 15 minutes to see what it can do, and Supabase's free tier is more than enough to experiment.

👉 **[Start building with Refine AI V2](https://refine.dev/ai)**

**Helpful links:**

- [Refine Documentation](https://refine.dev/docs) – if you want to dig deeper into customization
- [Supabase Docs](https://supabase.com/docs) – everything about your backend
- [Refine Discord](https://discord.gg/refine) – join the community, ask questions, share what you build

Let us know what you build with Refine AI! Share it on Twitter or Discord and tag us!

---

_P.S. — This entire workflow, from connecting Supabase to having a working admin panel, took me less time than writing this post. That's the point._ ⚡
