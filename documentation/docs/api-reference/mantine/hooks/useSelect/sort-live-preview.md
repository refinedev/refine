```tsx live url=http://localhost:3000 previewHeight=600px
setInitialRoutes(["/categories/create"]);
// visible-block-start
import { Select, useSelect, Button } from "@pankod/refine-mantine";

interface ICategory {
    id: number;
    title: string;
}

const CategoryCreate: React.FC = () => {
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
            <Button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>Toggle Order</Button>
            <Select
                label="Category"
                placeholder="Pick one"
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
            name: "categories",
            create: CategoryCreate,
        },
    ],
});
render(<RefineMantineDemo />);
```