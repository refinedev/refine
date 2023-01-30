```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/categories/create"]);
// visible-block-start
import { useSelect, Select, Form } from "@pankod/refine-antd";

interface ICategory {
    id: number;
    title: string;
}

const CategoryCreate: React.FC = () => {
    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        // highlight-next-line
        defaultValue: 11,
    });

    return (
        <Select 
            placeholder="Select a category" style={{ width: 300 }}
            {...selectProps}
        />
    );
};
// visible-block-end
setRefineProps({
    resources: [
        {
            name: "categories",
            create: CategoryCreate,
        },
    ],
});
render(<RefineAntdDemo />);
```