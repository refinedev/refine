```tsx live url=http://localhost:3000/products previewHeight=200px hideCode
setInitialRoutes(["/categories/create"]);
// visible-block-start
import { useSelect, HttpError } from "@pankod/refine-core";

interface ICategory {
    id: number;
    title: string;
}

const ProductCreate: React.FC = () => {
    const [order, setOrder] = React.useState<"asc" | "desc">("asc");

    const { options } = useSelect<ICategory>({
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
            <label>
                Sort Items:
                <select value={order} onChange={(val: any) => setOrder(val.target.value)}>
                    <option>asc</option>
                    <option>desc</option>
                </select>
            </label>
            <br />
            <label>
                Select a category:
                <select>
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
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