import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { CrudFilters, useList, useTranslate } from "@pankod/refine-core";
import { Stack, Grid } from "@pankod/refine-mui";

import { ICategory } from "interfaces";

type ProductItemProps = {
    setFilters?: (filters: CrudFilters) => void;
    filters: CrudFilters;
    categoryData: ICategory[];
    isLoading: boolean;
};

export const CategoryFilter: React.FC<ProductItemProps> = ({
    setFilters,
    filters,
    categoryData,
    isLoading,
}) => {
    const t = useTranslate();

    const [filterCategories, setFilterCategories] = useState<string[]>([]);

    useEffect(() => {
        setFilters?.([
            { ...filters[0] },
            {
                field: "category.id",
                operator: "contains",
                value: filterCategories,
            },
        ]);
    }, [filterCategories]);

    const toggleFilterCategory = (clickedCategory: string) => {
        const target = filterCategories.findIndex(
            (category) => category === clickedCategory,
        );

        if (target < 0) {
            setFilterCategories((prevCategories) => {
                return [...prevCategories, clickedCategory];
            });
        } else {
            const copyFilterCategories = [...filterCategories];

            copyFilterCategories.splice(target, 1);

            setFilterCategories(copyFilterCategories);
        }
    };

    return (
        <Stack>
            <Grid container columns={6} marginTop="10px">
                <LoadingButton
                    onClick={() => setFilterCategories([])}
                    variant={
                        filterCategories.length === 0 ? "contained" : "outlined"
                    }
                    size="small"
                    loading={isLoading}
                    sx={{
                        borderRadius: "50px",
                        marginRight: "10px",
                        marginBottom: "5px",
                    }}
                >
                    {t("stores.all")}
                </LoadingButton>
                {categoryData?.map((category: ICategory) => (
                    <Grid
                        item
                        key={category.id}
                        marginRight="10px"
                        marginBottom="5px"
                    >
                        <LoadingButton
                            variant={
                                filterCategories.includes(
                                    category.id.toString(),
                                )
                                    ? "contained"
                                    : "outlined"
                            }
                            size="small"
                            loading={isLoading}
                            sx={{
                                borderRadius: "50px",
                            }}
                            onClick={() =>
                                toggleFilterCategory(category.id.toString())
                            }
                        >
                            {category.title}
                        </LoadingButton>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};
