```tsx live url=http://localhost:3000/products previewHeight=600px hideCode
setInitialRoutes(["/categories/create"]);
// visible-block-start
import { useSelect, Form, Select, Input } from "@pankod/refine-antd";

interface ICategory {
    id: number;
    title: string;
}

const ProductCreate: React.FC = () => {
    const [order, setOrder] = React.useState<"asc" | "desc">("asc");

    const { selectProps, onSearch } = useSelect<ICategory>({
        resource: "categories",
        
        // highlight-start
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            }
        ]
        // highlight-end
    });

    return (
        <>
            <p>
                Filter:
                <Input onChange={(value) => onSearch(value)} />
            </p>

            <Form layout="vertical">
                <Form.Item
                    label="Select Category"
                    name="category"
                >
                    <Select {...selectProps} />
                </Form.Item>
            </Form>
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
render(<RefineAntdDemo />);
```