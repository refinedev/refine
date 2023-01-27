```tsx live url=http://localhost:3000/products previewHeight=600px hideCode
setInitialRoutes(["/categories/create"]);
// visible-block-start
import { useSelect, Select, Button } from "@pankod/refine-antd";

interface ICategory {
    id: number;
    title: string;
}

const ProductCreate: React.FC = () => {
    const [order, setOrder] = React.useState<"asc" | "desc">("asc");

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        // highlight-start
        sort: [
            {
                field: "title",
                order,
            }
        ]
        // highlight-end
    });

    return (
        <>
            <Select placeholder={`Ordered Categories: ${order}`} {...selectProps} style={{ width: 200 }} />
            <Button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>Toggle Order</Button>
        </>
    );
};
// visible-block-end
setRefineProps({
    resources: [
        {
            name: "categories",
            create: ProductCreate,
        },
    ],
});
render(<RefineHeadlessDemo />);
```