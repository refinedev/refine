# Data provider Simple REST

`@refinedev/simple-rest` proporciona un data provider para APIs REST con una estructura estándar. Está basado en el estilo de `json-server` y permite conectar recursos de Refine con endpoints HTTP.

## Instalación

```sh
npm install @refinedev/simple-rest
```

## Uso básico

```tsx
import dataProvider from "@refinedev/simple-rest";

const App = () => (
  <Refine dataProvider={dataProvider("API_URL")}>
    {/* ... */}
  </Refine>
);
```

## Cuándo usarlo

Usa este provider cuando tu backend expone endpoints REST simples para listar, crear, actualizar y eliminar recursos. Si tu API requiere autenticación, headers personalizados o parámetros especiales, puedes envolver o extender el provider.

## Más información

Revisa la documentación de data providers de Refine para adaptar la integración a tu backend.
