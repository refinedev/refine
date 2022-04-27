import {
    useTranslate,
    IResourceComponentsProps,
    useTable,
} from "@pankod/refine-core";
import { Grid } from "@pankod/refine-mui";

import { ProductItem } from "components";

import { IProduct } from "interfaces";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { tableQueryResult, setPageSize } = useTable<IProduct>({
        resource: "products",
    });

    console.log("table", tableQueryResult);

    return (
        <>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {tableQueryResult.data &&
                    tableQueryResult.data.data.map((i: IProduct) => (
                        <Grid item xs={2} sm={3} md={3} key={i.id}>
                            <ProductItem
                                name={i.name}
                                key={i.id}
                                images={i.images}
                                price={i.price}
                                id={i.id}
                                description={i.description}
                                isActive={i.isActive}
                                createdAt={i.createdAt}
                                category={i.category}
                                stock={i.stock}
                            />
                        </Grid>
                    ))}
            </Grid>
            <button onClick={() => setPageSize((prev) => prev + 10)}>
                load more
            </button>
        </>
    );
};
