import { Refine, DataProvider, useList } from "@refinedev/core";

const HomePage = () => {
    const { data: products } = useList({
        resource: "products",
    });

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products?.data?.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = (url: string): DataProvider => ({
    getList: async ({ resource }) => {
        const response = await fetch(`${url}/${resource}`);
        const data = await response.json();

        return {
            data,
            total: data.length,
        };
    },

    getOne: async () => {
        throw new Error("Not implemented");
    },

    getMany: async () => {
        throw new Error("Not implemented");
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

    getApiUrl: () => url,
});

export default function App() {
    return (
        <Refine dataProvider={dataProvider(API_URL)}>
            <HomePage />
        </Refine>
    );
}
