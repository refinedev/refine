```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/categories/create"]);
// visible-block-start
import { Select, useSelect, Button } from "@pankod/refine-mantine";

interface ICategory {
    id: number;
    title: string;
}

const ProductCreate: React.FC = () => {
    const [order, setOrder] = React.useState<"asc" | "desc">("asc");

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        // highlight-next-line
        defaultValue: 11,
    });

    return (
        <>
            <Select
                label="Category"
                placeholder="Select a category"
                withinPortal
                {...selectProps}
            />
        </>
    );
};
// visible-block-end
setRefineProps({
    resources: [
        {
            name: "posts",
            create: ProductCreate,
        },
    ],
});
render(<RefineMantineDemo />);
```