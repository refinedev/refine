```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { useAutocomplete } from "@refinedev/mui";
import { Autocomplete, TextField } from "@mui/material";

interface ICategory {
  id: number;
  title: string;
}

const PostCreate: React.FC = () => {
  const { autocompleteProps } = useAutocomplete<ICategory>({
    resource: "categories",
    // highlight-start
    onSearch: (value) => [
      {
        field: "title",
        operator: "contains",
        value,
      },
    ],
    // highlight-end
  });

  return (
    <Autocomplete
      {...autocompleteProps}
      getOptionLabel={(item) => item.title}
      isOptionEqualToValue={(option, value) =>
        value === undefined ||
        option?.id?.toString() === (value?.id ?? value)?.toString()
      }
      placeholder="Select a category"
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
  );
};
// visible-block-end
render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          create: "posts/create",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```
