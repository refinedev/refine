---
"@pankod/refine-core": minor
---

Feat: Added ability to manage breadcrumb component globally via options

## Usage
```jsx
<Refine
options= {{
   breadcrumb: false, // hide globally
}}
```
or
```jsx
<Refine
options= {{
   breadcrumb: <MyCustomBreadcrumbComponent /> // custom component
}}
```