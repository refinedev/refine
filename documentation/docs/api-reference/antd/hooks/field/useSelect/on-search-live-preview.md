```tsx live url=http://localhost:3000 previewHeight=600px
setInitialRoutes(["/categories/create"]);
// visible-block-start
import { useSelect, Select } from "@pankod/refine-antd";

interface ICategory {
    id: number;
    title: string;
}

const PostCreate: React.FC = () => {
    const [order, setOrder] = React.useState<"asc" | "desc">("asc");

    const { selectProps } = useSelect<ICategory>({
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
            name: "posts",
            create: PostCreate,
        },
    ],
});
render(<RefineAntdDemo />);
```