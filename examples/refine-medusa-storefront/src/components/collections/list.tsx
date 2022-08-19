import { IResourceComponentsProps, useList } from "@pankod/refine-core";

import Search from "@components/search";
import { useCartContext } from "@lib/context";

export const CollectionsList: React.FC<IResourceComponentsProps> = () => {
    const { cartId } = useCartContext();

    const result = useList({
        resource: "products",
        config: {
            filters: [
                {
                    field: "cart_id",
                    value: cartId,
                    operator: "eq",
                },
            ],
        },
    });

    return <Search products={result.data?.data} />;
};
