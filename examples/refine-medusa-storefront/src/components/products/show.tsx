import { useList, useNavigation, useShow } from "@pankod/refine-core";
import { ProductView } from "..";

export const ProductShow: React.FC = () => {
    const { queryResult } = useShow();
    const { data } = queryResult;
    const record = data?.data;

    const { data: relatedProducts } = useList({
        resource: "products",
    });

    const { createUrl } = useNavigation();

    console.log("createUrl", createUrl);

    return (
        <>
            {record ? (
                <ProductView
                    product={record.product as any}
                    relatedProducts={relatedProducts?.data ?? ([] as any)}
                />
            ) : null}
        </>
    );
};
