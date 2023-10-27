import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function OneToMany() {
    return (
        <Sandpack
            dependencies={{
                "@refinedev/core": "latest",
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

  getMany: async ({ ids, resource }) => {
    // converting array to query-string (eg. [1,2,3] => id=1&id=2&id=3)
    const idQuery = ids.map((id) => \`id=\${id}\`).join("&");
    const response = await fetch(\`\${url}/\${resource}?\${idQuery}\`);
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
import { useOne, useMany, BaseKey } from "@refinedev/core";

export const Product: React.FC = () => {
    const { data: productData, isLoading: productLoading } = useOne<IProduct>({
        resource: "products",
        id: 123,
    });
    const product = productData?.data;

    const { data: reviewsData, isLoading: reviewsLoading } =
        useMany<IProductReview>({
            resource: "product-reviews",
            ids: product?.reviews?.map((review) => review.id) || [],
            queryOptions: {
                enabled: !!product?.reviews?.length,
            },
        });
    const rewiews = reviewsData?.data;

    const loading = productLoading || reviewsLoading;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h4>{product?.name}</h4>
            <p>Material: {product?.material}</p>
            <p>Price {product?.price}</p>

            <h5>Reviews</h5>
            <ul>
                {rewiews?.map((review) => (
                    <li key={review.id}>
                        <p>Rating: {review.rating}</p>
                        <p>{review.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};


interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
    price: string;
    description: string;
    reviews: {
        id: BaseKey;
    }[];
    detail: {
        id: BaseKey;
    };
}

interface IProductReview {
    id: BaseKey;
    rating: number;
    comment: string;
    user: {
        id: BaseKey;
    }
}
`.trim();
