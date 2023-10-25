import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function UseOne() {
    return (
        <Sandpack
            dependencies={{
                "@refinedev/core": "latest",
                "react-router-dom": "latest",
                "react-router": "latest",
            }}
            startRoute="/"
            files={{
                "/App.tsx": {
                    code: AppTsxCode,
                    hidden: false,
                },
                "/product.tsx": {
                    code: ProductTsxCode,
                    hidden: false,
                },
                "/data-provider.ts": {
                    code: DataProviderCode,
                    hidden: false,
                },
            }}
        />
    );
}

const AppTsxCode = `
import React from "react";
import { Refine } from "@refinedev/core";

import { Product } from "./product.tsx";
import { dataProvider } from "./data-provider.ts";


export default function App() {
    return (
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            >
                <Product />
            </Refine>
    );
}
`.trim();

const DataProviderCode = `
import React from "react";
import { DataProvider } from "@refinedev/core";

export const dataProvider = (url: string): DataProvider => ({
  getOne: async ({ id, resource }) => {
    const response = await fetch(\`\${url}/\${resource}/\${id}\`);
      const data = await response.json();

      return {
          data,
      };
  },

  create: async () => {
      throw new Error("Not implemented");
  },
  update: async () => {
      throw new Error("Not implemented");
  },
  deleteOne: async () => {
      throw new Error("Not implemented");
  },
  getList: async () => {
      throw new Error("Not implemented");
  },
  getApiUrl: () => url,
});
`.trim();

const ProductTsxCode = `
import React from "react";
import { useOne, BaseKey } from "@refinedev/core";

export const Product: React.FC = () => {
    const { data, error, isError, isLoading } = useOne<IProduct>({
        resource: "products",
        id: "1",
    });

    if (isError) {
        return (
            <div>
                <h1>Error</h1>
                <pre>{JSON.stringify(error)}</pre>
            </div>
        );
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h4>{data?.data?.name}</h4>
            <p>Material: {data?.data?.material}</p>
            <small>ID: {data?.data?.id}</small>
        </div>
    );
};


interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
}
`.trim();
