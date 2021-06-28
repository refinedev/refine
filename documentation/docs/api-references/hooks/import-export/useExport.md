---
id: useExport
title: useExport
---

`useExport` hook allows you to make your resources exportable. It gives you the props to pass to any Ant Design [`<Button>`][Button] to make it an export button.

It uses [`export-to-csv`][export-to-csv] under the hood to create `csv` files.

```ts
const { onClick, loading } = useExport(options);
```

> In many examples, instead of [`<Button>`][Button], [`<ExportButton>`][ExportButton] is used. This button is nothing more than a default Ant Design [`<Button>`][Button] with an icon and a default text.
> [Refer to ExportButton docs for more detailed information. &#8594][ExportButton]

[Button]: https://ant.design/components/button/
[ExportButton]: api-references/components/buttons/export.md
[export-to-csv]: https://github.com/alexcaza/export-to-csv