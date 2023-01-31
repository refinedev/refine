```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/categories/create"]);
// visible-block-start
import {
    Autocomplete,
    useAutocomplete,
    TextField,
    Button,
} from "@pankod/refine-mui";

interface ICategory {
    id: number;
    title: string;
}

const CategoryCreate: React.FC = () => {
    const [order, setOrder] = React.useState<"asc" | "desc">("asc");
    const { autocompleteProps } = useAutocomplete<ICategory>({
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
            <Autocomplete
                {...autocompleteProps}
                getOptionLabel={(item) => item.title}
                isOptionEqualToValue={(option, value) =>
                    value === undefined || option.id.toString() === value.toString()
                }
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Category"
                    margin="normal"
                    variant="outlined"
                    required
                    />
                )}
            />
            <Button 
                onClick={() => setOrder(order === "asc" ? "desc" : "asc")} 
                variant="contained" 
                size="small"
            >Toggle Order</Button>
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
render(<RefineMuiDemo />);
```