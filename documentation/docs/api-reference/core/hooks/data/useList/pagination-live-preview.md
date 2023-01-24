```tsx live url=http://localhost:3000/products previewHeight=420px hideCode
setInitialRoutes(["/products"]);

// visible-block-start
import { useList, HttpError } from "@pankod/refine-core";

interface IProduct {
    id: number;
    name: string;
    material: string;
}

const ProductList: React.FC = () => {
    const { data, isLoading, isError } = useList<IProduct, HttpError>({
        resource: "products",
        //highlight-start
        config: {
            pagination: {
                current: 2,
                pageSize: 20,
            },
        },
        //highlight-end
    });

    const products = data?.data ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    <h4>
                        {product.name} - ({product.material})
                    </h4>
                </li>
            ))}
        </ul>
    );
};

// visible-block-end

setRefineProps({
    resources: [
        {
            name: "products",
            list: ProductList,
        },
    ],
});

render(<RefineHeadlessDemo />);
```
