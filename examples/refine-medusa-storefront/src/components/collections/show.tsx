import Search from "@components/search";
import {
    IResourceComponentsProps,
    GetListResponse,
    useList,
} from "@pankod/refine-core";
import { useRouter } from "next/router";

import { IPost } from "src/interfaces";

export const CollectionsShow: React.FC<
    IResourceComponentsProps<GetListResponse<IPost>>
> = () => {
    const router = useRouter();

    let collectionIds = router.query.id;

    if (typeof collectionIds === "string") {
        collectionIds = [collectionIds];
    }

    const result = useList({
        resource: "products",
        metaData: {
            collectionIds,
        },
    });

    return <Search products={result.data?.data} />;
};
