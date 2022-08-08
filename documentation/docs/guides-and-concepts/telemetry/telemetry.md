---
id: telemetry
title: Telemetry
sidebar_label: Telemetry
---

# Telemetry


## Summary

**refine** implements a **simple** and **transparent** telemetry module for collecting usage statistics defined in a **very limited scope**. 

Tracking is totally **secure** and **anonymous**. It includes no personally identifiable Information and **does not use cookies**. Participation is optional and users may easily **opt-out**.


## Why do we need this?

We try to answer the question **how many users are actively using the Refine framework**. This information is critical for open-source projects like Refine to better understand their communities and measure their growth metrics.


## How do we collect data?

The tracking happens when a Refine application is loaded on the user's browser. On application init, a single HTTP request is sent to [https://telemetry.refine.dev](https://telemetry.refine.dev). The request body is encrypted with JSON Web Encryption (JWE) standard  ([ietf.org/doc/html/rfc7516](https://datatracker.ietf.org/doc/html/rfc7516)) to be decrypted securely on Refine servers.

There are no consequent requests on that session, as we do NOT collect any behavioral information such as _page views_, _button clicks_, etc.


## What is collected?

The HTTP call has a JSON payload having the following application-specific attributes:

| Value         | Type      | Description                                                                                                     |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| providers     | boolean[] | List of providers used in the project (auth, data, router, live, notification, auditLog, i18n or accessControl) |
| version       | string    | Version of the refine package.                                                                                  |
| resourceCount | number    | Number of total resources.                                                                                      |

Additionaly following information is extracted and collected from the HTTP header:

| Value      | Description                                           |
| ---------- | ----------------------------------------------------- |
| IP Address | IP Address of the machine the request is coming from. |
| Hostname   | Hostname of the machine the request is coming from.   |
| Browser    | Browser and browser version.                          |
| OS         | OS and OS version.                                    |

## How to opt-out?

You can opt out of telemetry by simply adding `disableTelemetry` prop to the `<Refine />` component.