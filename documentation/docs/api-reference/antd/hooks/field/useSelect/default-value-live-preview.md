```tsx live url=http://localhost:3000/products previewHeight=200px hideCode
setInitialRoutes(["/categories/create"]);
// visible-block-start
import { useSelect, Select, Form } from "@pankod/refine-antd";

interface ICategory {
    id: number;
    title: string;
}

const ProductCreate: React.FC = () => {
    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        // highlight-next-line
        defaultValue: 11,
    });

    return (
        <Form layout="vertical">
            <Form.Item
                label="Select Category"
                name="category"
            >
                <Select {...selectProps} />
            </Form.Item>
        </Form>
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