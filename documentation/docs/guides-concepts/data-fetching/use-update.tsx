import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function UseUpdate() {
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

    update: async ({ resource, id, variables }) => {      
        console.log(variables, JSON.stringify(variables))
        const response = await fetch(\`\${url}/\${resource}/\${id}\`, {
            method: "PATCH",
            body: JSON.stringify(variables),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        return {
            data,
        };
    },

    create: async () => {
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
import { useOne, BaseKey, useUpdate } from "@refinedev/core";

export const Product: React.FC = () => {
    const { data, error, isError, isLoading: isLoadingUseOne } = useOne<IProduct>({
        resource: "products",
        id: "10",
    });

    const { mutate, isLoading: isLoadingUseUpdate } = useUpdate();

    const loading = isLoadingUseOne || isLoadingUseUpdate;

    if (isError) {
        return (
            <div>
                <h1>Error</h1>
                <pre>{JSON.stringify(error)}</pre>
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const incrementPrice = async () => {
        await mutate({
            resource: "products",
            id: "10",
            values: {
                price: Number(data?.data?.price) * 2,
            },
        });
    };

    return (
        <div>
            <h4>{data?.data?.name}</h4>
            <p>Material: {data?.data?.material}</p>
            <p>Price {data?.data?.price}</p>
            <button onClick={incrementPrice}>Increment Price</button>
        </div>
    );
};


interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
    price: string;
}
`.trim();
