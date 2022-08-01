import Search from "@components/search";
import { IResourceComponentsProps, useList } from "@pankod/refine-core";

export const CollectionsList: React.FC<IResourceComponentsProps> = () => {
    const result = useList({
        resource: "products",
    });

    return <Search products={result.data?.data} />;
};
