```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/categories/create"]);
// visible-block-start
import { Select, useSelect } from "@pankod/refine-mantine";

interface ICategory {
    id: number;
    title: string;
}

const CategoryCreate: React.FC = () => {
    //highlight-start
    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
    });
    //highlight-end

    return (
        <Select
            label="Category"
            placeholder="Pick one"
            withinPortal
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
render(<RefineMantineDemo />);
```