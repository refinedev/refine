---
id: comparison
title: Comparison | Refine vs React-Admin vs AdminBro vs Retool
---

:::note
This comparison table strives to be as accurate and as unbiased as possible. If you use any of these libraries and feel the information could be improved, feel free to suggest changes (with notes or evidence of claims) using the "Edit this page" link at the bottom of this page.
:::

-   ✅ &nbsp;1st-class, built-in, and ready to use with no added configuration or code
-   🟡 &nbsp;Supported, but as an unofficial 3rd party or community library/contribution
-   🔶 &nbsp;Supported and documented, but requires extra user-code to implement
-   🛑 &nbsp;Not officially supported or documented.

| Features                       | Refine                                                                | React-Admin [_(Website)_][react-admin]     | AdminBro[_(Website)_][adminjs]   | Retool[_(Website)_][retool] |
| ------------------------------ | --------------------------------------------------------------------- | ------------------------------------------ | -------------------------------- | --------------------------- |
| Github Repo / Stars            | [![][stars-refine]][gh-refine]                                        | [![][stars-react-admin]][gh-react-admin]   | [![][stars-adminjs]][gh-adminjs] | -                           |
| Bundle Size                    | [![][bp-refine]][bpl-refine] 🚀 🚀                                        | [![][bp-react-admin]][bpl-react-admin]     | [![][bp-adminjs]][bpl-adminjs]   | -                           |
| Pricing                        | Open Source                                                           | Open Source / Enterprise Edition           | Open Source                      | [_Pricing_][retool-pricing] |
| Platform Requirements          | React                                                                 | React                                      | Node.js - React                  | Cloud / Self-hosted         |
| Supported UI Frameworks        | **Ant Design, Material UI, Tailwind, anything...**🚀                    | Material-UI                                | Own UIs                          | Own UIs                     |
| Headless                       | **Yes**🚀                                                              | No                                         | No                               | No                          |
| Access Control                 | **RBAC, LDAP, ACL, ABAC, etc.**🚀                                      | RBAC                                       | RBAC                             | RBAC                        |
| Next.js/SSR Support            | **Yes** 🚀                                                             | No                                         | No                               | No                          |
| Live/Realtime                  | Yes with two mode `auto` and `manual` 🚀                               | Yes - just Immediately(Enterprise Edition) | No                               | No                          |
| Audit Log                      | No - Coming Soon                                                      | Yes - Enterprise Edition                   | No                               | Yes                         |
| State Management               | React Query                                                           | Redux - Redux Saga                         | Redux                            | -                           |
| Routing                        | React Router, React Location, Next.js Router or Any Routing Library 🚀 | React Router                               | React Router                     | -                           |
| Devtools                       | Yes - React Query Devtool                                             | Yes - Redux DevTools                       | No                               | No                          |
| Own Advanced Tutorial Examples | Yes - **50+** Examples 🚀                                              | Yes - Few Examples                         | No                               | No                          |
| Architecture                   | **Hooks Based**  🚀                                                    | Component Based                            | Hooks Based                      | -                           |
| Project Creator CLI            | ✅ &nbsp;[_(Superplate)_][pankod-superplate]                           | 🛑                                          | 🛑                                | 🛑                           |
| Auth Provider                  | ✅                                                                     | ✅                                          | ✅                                | ✅                           |
| Data Provider                  | ✅                                                                     | ✅                                          | 🔶                                | ✅                           |
| i18n                           | ✅                                                                     | ✅                                          | ✅                                | -                           |
| Router Provider                | ✅                                                                     | 🛑                                          | 🛑                                | -                           |
| Notification Provider          | ✅                                                                     | 🛑                                          | 🛑                                | -                           |
| GraphQL Support                | ✅                                                                     | 🔶                                          | 🟡                                | ✅                           |
| Customization                  | ✅                                                                     | 🔶                                          | 🔶                                | 🛑                           |
| Basic Form                     | ✅                                                                     | ✅                                          | ✅                                | ✅                           |
| Editable Table                 | ✅                                                                     | ✅ &nbsp;Enterprise Edition                 | 🛑                                | ✅                           |
| Tree Select                    | ✅                                                                     | ✅ &nbsp;Enterprise Edition                 | 🛑                                | 🛑                           |
| Markdown                       | ✅                                                                     | ✅ &nbsp;Enterprise Edition                 | 🛑                                | ✅                           |
| Calendar                       | ✅                                                                     | ✅ &nbsp;Enterprise Edition                 | 🛑                                | ✅                           |
| Caching                        | ✅                                                                     | ✅                                          | 🛑                                | 🛑                           |
| API Caching                    | ✅                                                                     | 🛑                                          | 🛑                                | 🛑                           |
| Multi Level Menu               | ✅                                                                     | ✅ &nbsp;Enterprise Edition                 | 🟡                                | ✅                           |
| Typescript                     | ✅                                                                     | ✅                                          | ✅                                | -                           |
| Modal Form                     | ✅                                                                     | ✅ &nbsp;Enterprise Edition                 | 🛑                                | ✅                           |
| Drawer Form                    | ✅                                                                     | 🔶                                          | 🛑                                | 🛑                           |
| Step Form                      | ✅                                                                     | ✅ &nbsp;Enterprise Edition                 | 🛑                                | 🛑                           |
| Theming                        | ✅                                                                     | ✅                                          | 🔶                                | ✅                           |
| CSV Import/Export              | ✅                                                                     | 🟡                                          | 🟡                                | ✅                           |

<!-- -->

[stars-refine]: https://img.shields.io/github/stars/pankod/refine?label=%F0%9F%8C%9F
[gh-refine]: https://github.com/pankod/refine
[bpl-refine]: https://bundlephobia.com/result?p=@pankod/refine-core
[bp-refine]: https://badgen.net/bundlephobia/minzip/@pankod/refine-core?label=💾
[pankod-superplate]: https://pankod.github.io/superplate/

<!-- -->

<!-- -->

[react-admin]: https://marmelab.com/react-admin/
[react-enterprise]: https://marmelab.com/ra-enterprise/
[stars-react-admin]: https://img.shields.io/github/stars/marmelab/react-admin?label=%F0%9F%8C%9F
[gh-react-admin]: https://github.com/marmelab/react-admin
[bpl-react-admin]: https://bundlephobia.com/result?p=react-admin
[bp-react-admin]: https://badgen.net/bundlephobia/minzip/react-admin?label=💾

<!-- -->

<!-- -->

[adminjs]: https://adminbro.com/index.html
[stars-adminjs]: https://img.shields.io/github/stars/SoftwareBrothers/adminjs?label=%F0%9F%8C%9F
[gh-adminjs]: https://github.com/SoftwareBrothers/adminjs
[bpl-adminjs]: https://bundlephobia.com/result?p=admin-bro
[bp-adminjs]: https://badgen.net/bundlephobia/minzip/admin-bro?label=💾

<!-- -->

<!-- -->

[retool]: https://retool.com/
[retool-pricing]: https://retool.com/pricing/

<!-- -->
