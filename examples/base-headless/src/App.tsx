import {
    Refine,
    DataProvider,
    BaseKey,
    AuthBindings,
    useList,
} from "@refinedev/core";
import axios from "axios";

export const HomePage = () => {
    const { data: products } = useList<IProducts>({
        resource: "products",
        pagination: { current: 1, pageSize: 5 },
        sorters: [{ field: "price", order: "asc" }],
        filters: [{ field: "material", operator: "eq", value: "Wooden" }],
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

interface IProducts {
    id: BaseKey;
    name: string;
    material: string;
    price: string;
}

const API_URL = "http://localhost:3001";

export const authProvider = (url: string): AuthBindings => ({
    login: async ({ email, password }) => {
        const response = await fetch(`${url}/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        localStorage.setItem("token", data.token);

        return {
            success: true,
        };
    },

    check: async () => {
        const token = localStorage.getItem("token");
        return {
            authenticated: !!token,
            error: new Error("Unauthorized"),
        };
    },

    logout: async () => {
        localStorage.removeItem("token");
        return {
            success: true,
        };
    },

    onError: async () => {
        throw new Error("Not implemented");
    },
});

export const dataProvider = (url: string): DataProvider => ({
    getList: async ({ resource, filters, pagination, sorters }) => {
        // We simplified query string generation to keep the example application short and straightforward.
        // For more detailed and complex implementation examples, you can refer to the source code of the data provider packages.
        // https://github.com/refinedev/refine/blob/next/packages/simple-rest/src/provider.ts

        // filter and sorter interface supports multiple filters and sorters.
        // but we know that we only have one filter and one sorter in this example.
        // to keep the example simple, we only use the first filter and sorter.
        const filter = filters?.[0];
        const sorter = sorters?.[0];

        const params = [];

        if (filter && "field" in filter) {
            params.push(`${filter.field}=${filter.value}`);
        }

        if (sorter && "field" in sorter) {
            params.push(`_sort=${sorter.field}`);
            params.push(`_order=${sorter.order}`);
        }

        // pagination is optional, so we need give default values if it is undefined.
        const { current = 1, pageSize = 10 } = pagination ?? {};
        params.push(`_start=${(current - 1) * pageSize}`);
        params.push(`_end=${current * pageSize}`);

        // combine all params with "&" character to create query string.
        const query = params.join("&");

        const response = await fetch(`${url}/${resource}?${query}`);
        const data = await response.json();

        return {
            data,
            total: data.length,
        };
    },

    getOne: async () => {
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
        <Refine
            dataProvider={dataProvider(API_URL)}
            authProvider={authProvider(API_URL)}
        >
            <HomePage />
        </Refine>
    );
}
