import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function OneToOne() {
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
                    active: true,
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
    const { data: productData, isLoading: productLoading } = useOne<IProduct>({
        resource: "products",
        id: 123,
    });

    const { data: categoryData, isLoading: categoryLoading }  = useOne<ICategory>({
        resource: "categories",
        id: productData?.data?.category?.id,
        queryOptions: {
            enabled: !!productData?.data?.category?.id,
        },
    });

    loading = productLoading || categoryLoading;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h4>{productData?.data?.name}</h4>
            <p>Material: {productData?.data?.material}</p>
            <p>Price {productData?.data?.price}</p>
            <p>Category: {categoryData?.data?.title}</p>
        </div>
    );
};


interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
    price: string;
    category: {
        id: BaseKey;
    }
}

interface ICategory {
    id: BaseKey;
    title: string;
}
`.trim();
