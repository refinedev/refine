# Data provider Simple REST

`@refinedev/simple-rest` fournit un data provider pour les APIs REST avec une structure standard. Il suit le style de `json-server` et connecte les resources Refine à des endpoints HTTP.

## Installation

```sh
npm install @refinedev/simple-rest
```

## Utilisation de base

```tsx
import dataProvider from "@refinedev/simple-rest";

const App = () => (
  <Refine dataProvider={dataProvider("API_URL")}>
    {/* ... */}
  </Refine>
);
```

Utilisez ce provider lorsque votre backend expose des endpoints REST simples pour lister, créer, modifier et supprimer des resources. Pour des headers ou paramètres spécifiques, vous pouvez l'envelopper ou l'étendre.
