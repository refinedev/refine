import Search from "@components/search";
import { IResourceComponentsProps, useTable } from "@pankod/refine-core";
import { useRouter } from "next/router";

export const CollectionsShow: React.FC<IResourceComponentsProps> = () => {
    const router = useRouter();

    let collectionIds = router.query.id;

    if (typeof collectionIds === "string") {
        collectionIds = [collectionIds];
    }

    const { tableQueryResult } = useTable({
        resource: "products",
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
