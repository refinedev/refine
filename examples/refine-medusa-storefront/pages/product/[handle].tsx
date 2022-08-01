import { useContext, useEffect } from "react";
import { useList, useCreate, LayoutWrapper } from "@pankod/refine-core";
import { CardContext } from "@lib/context";
import { ProductView } from "@components/product";

const ProductShow: React.FC = () => {
    const { data } = useList({
        resource: "products",
        config: {
            filters: [
                {
                    field: "handle",
                    operator: "eq",
                    value: "hoodie",
                },
            ],
        },
    });

    const record = data?.data?.[0];

    const { data: relatedProducts } = useList({
        resource: "products",
    });

    const { setCartId } = useContext(CardContext);
    const { mutate, data: cartData } = useCreate();

    const cardIdFromLocalStorage =
        typeof window !== "undefined" ? localStorage.getItem("cardId") : "";

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
        <LayoutWrapper>
            {record ? (
                <ProductView
                    product={record as any}
                    relatedProducts={relatedProducts?.data ?? ([] as any)}
                />
            ) : null}
        </LayoutWrapper>
    );
};

export default ProductShow;
