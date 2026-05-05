# Data provider Simple REST

`@refinedev/simple-rest` предоставляет data provider для REST APIs со стандартной структурой. Он следует стилю `json-server` и соединяет resources Refine с HTTP endpoints.

## Installation

```sh
npm install @refinedev/simple-rest
```

## Basic usage

```tsx
import dataProvider from "@refinedev/simple-rest";

const App = () => (
  <Refine dataProvider={dataProvider("API_URL")}>
    {/* ... */}
  </Refine>
);
```

Используйте provider, если backend предоставляет простые REST endpoints для list, create, update и delete. Для custom headers или special params его можно обернуть или расширить.
