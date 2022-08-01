import { useContext, useEffect } from "react";
import {
    useList,
    useNavigation,
    useShow,
    useCreate,
} from "@pankod/refine-core";
import { ProductView } from "..";
import { CardContext } from "@lib/context";

export const ProductShow: React.FC = () => {
    const { queryResult } = useShow();
    const { data } = queryResult;
    const record = data?.data;

    const { data: relatedProducts } = useList({
        resource: "products",
    });

    const { setCartId } = useContext(CardContext);
    const { mutate, data: cartData } = useCreate();

    const cardIdFromLocalStorage = localStorage.getItem("cardId");

    const createCart = async () => {
        await mutate({
            resource: "carts",
            values: {},
        });

        setCartId(cartData?.data.cart?.id);

        localStorage.setItem("cardId", cartData?.data.cart?.id);
    };

    useEffect(() => {
        cardIdFromLocalStorage ? null : createCart();
    }, []);

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
