import { useState, useEffect } from "react";
import {
    CrudFilters,
    getDefaultFilter,
    useList,
    useTranslate,
} from "@refinedev/core";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { ICategory } from "../../interfaces";

type ProductItemProps = {
    setFilters: (filters: CrudFilters) => void;
    filters: CrudFilters;
};

export const CategoryFilter: React.FC<ProductItemProps> = ({
    setFilters,
    filters,
}) => {
    const t = useTranslate();

    const [filterCategories, setFilterCategories] = useState<string[]>(
        getDefaultFilter("category.id", filters, "in") ?? [],
    );

    const { data: categories, isLoading } = useList<ICategory>({
        resource: "categories",
    });

    useEffect(() => {
        setFilters?.([
            {
                field: "category.id",
                operator: "in",
                value:
                    filterCategories.length > 0 ? filterCategories : undefined,
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
                <Grid item p={0.5}>
                    <LoadingButton
                        onClick={() => setFilterCategories([])}
                        variant={
                            filterCategories.length === 0
                                ? "contained"
                                : "outlined"
                        }
                        size="small"
                        loading={isLoading}
                        sx={{
                            borderRadius: "50px",
                        }}
                    >
                        {t("stores.all")}
                    </LoadingButton>
                </Grid>
                {categories?.data.map((category: ICategory) => (
                    <Grid item key={category.id} p={0.5}>
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
