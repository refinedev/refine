import Search from "@components/search";
import {
    IResourceComponentsProps,
    GetListResponse,
    useList,
} from "@pankod/refine-core";
import { IPost } from "src/interfaces";

export const CollectionsList: React.FC<
    IResourceComponentsProps<GetListResponse<IPost>>
> = () => {
    const result = useList({
        resource: "products",
    });

    return <Search products={result.data?.data} />;
};
