import { LoadingButton } from "@mui/lab";
import { useList } from "@pankod/refine-core";
import { Stack, Grid } from "@pankod/refine-mui";

import { ICategory } from "interfaces";

export const CategoryFilter: React.FC = () => {
    const { data: categoryData, isLoading: categoryIsLoading } =
        useList<ICategory>({
            resource: "categories",
            config: {
                pagination: { pageSize: 30 },
            },
        });

    return (
        <Stack>
            <Grid container columns={6} marginTop="10px">
                {categoryData?.data.map((category) => (
                    <Grid
                        item
                        key={category.id}
                        marginRight="10px"
                        marginBottom="5px"
                    >
                        <LoadingButton
                            variant="outlined"
                            size="small"
                            loading={categoryIsLoading}
                            sx={{
                                borderRadius: "50px",
                            }}
                        >
                            {category.title}
                        </LoadingButton>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};
