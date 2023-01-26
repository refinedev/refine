```css live shared
body {
    padding: 4px;
    background: white;
}

form {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: 300px;
}

button {
    margin-top: 8px;
    max-width: 100px;
}
```

```tsx live url=http://localhost:3000/products/create previewHeight=250px
setInitialRoutes(["/products/create"]);
// visible-block-start
import { useState } from "react";
import { useCreate, HttpError } from "@pankod/refine-core";

interface IProduct {
    id: number;
    name: string;
    material: string;
}

interface FormValues {
    name: string;
    material: string;
}

const ProductCreate: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        name: "",
        material: "",
    });

    const { mutate } = useCreate<IProduct, HttpError, FormValues>();

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        mutate({
            resource: "products",
            values: formValues,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
                required
                type="text"
                name="name"
                id="name"
                value={formValues.name}
                onChange={handleOnChange}
            />
            <label htmlFor="material">Material</label>
            <input
                required
                type="text"
                name="material"
                id="material"
                value={formValues.material}
                onChange={handleOnChange}
            />
            <button type="submit">Create</button>
        </form>
    );
};

// visible-block-end
setRefineProps({
    resources: [
        {
            name: "products",
            create: ProductCreate,
        },
    ],
});
render(<RefineHeadlessDemo />);
```
