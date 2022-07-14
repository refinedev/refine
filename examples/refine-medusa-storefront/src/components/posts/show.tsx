import { useList, useOne, useShow } from "@pankod/refine-core";
import { ProductView } from "..";

export const PostShow: React.FC = () => {
    const { queryResult } = useShow();
    const { data } = queryResult;
    const record = data?.data;

    const { data: relatedProducts } = useList({
        resource: "products",
    });

    console.log(record);

    return (
        <>
            {record ? (
                <ProductView
                    product={record}
                    relatedProducts={relatedProducts?.data ?? []}
                />
            ) : null}
        </>
    );
};
