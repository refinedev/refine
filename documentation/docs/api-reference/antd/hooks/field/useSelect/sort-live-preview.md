```tsx live url=http://localhost:3000/products previewHeight=600px hideCode
setInitialRoutes(["/categories/create"]);
// visible-block-start
import { useSelect, Select, Form } from "@pankod/refine-antd";

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
            Order: 
            <Select value={order} style={{ width: 200 }} onChange={val => setOrder(val)} options={[
                {
                    label: "ASC",
                    value: "asc",
                }, 
                {
                    label: "DESC",
                    value: "desc",
                }
            ]} />
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
render(<RefineHeadlessDemo />);
```