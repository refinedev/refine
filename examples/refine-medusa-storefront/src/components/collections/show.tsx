import { useRouter } from "next/router";
import { IResourceComponentsProps, useTable } from "@pankod/refine-core";

import Search from "@components/search";
import { useCartContext } from "@lib/context";

export const CollectionsShow: React.FC<IResourceComponentsProps> = () => {
    const router = useRouter();
    const { cartId } = useCartContext();

    let collectionIds = router.query.id;

    if (typeof collectionIds === "string") {
        collectionIds = [collectionIds];
    }

    const { tableQueryResult } = useTable({
        resource: "products",
        initialFilter: [
            {
                field: "cart_id",
                value: cartId,
                operator: "eq",
            },
        ],
        permanentFilter: [
            {
                field: "collection_id",
                operator: "eq",
                value: collectionIds,
            },
        ],
    });

    return <Search products={tableQueryResult.data?.data} />;
};
