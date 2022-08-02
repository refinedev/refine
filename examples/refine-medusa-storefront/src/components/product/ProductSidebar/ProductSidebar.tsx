import s from "./ProductSidebar.module.css";
import { FC, useContext, useEffect, useState } from "react";

import { ProductOptions } from "@components/product";
import { Button, Text, Rating, Collapse, useUI } from "@components/ui";
import {
    getProductVariant,
    selectDefaultOptionFromProduct,
    SelectedOptions,
} from "../helpers";
import { useCreate } from "@pankod/refine-core";
import { CartContext } from "@lib/context";
import { MedusaProduct } from "@interfaces/index";

interface ProductSidebarProps {
    product: MedusaProduct;
    className?: string;
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
    // const addItem = useAddItem();
    const { openSidebar, setSidebarView } = useUI();
    const [loading, setLoading] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

    useEffect(() => {
        selectDefaultOptionFromProduct(product, setSelectedOptions);
    }, [product]);

    const variant = getProductVariant(product, selectedOptions);

    const { cartId } = useContext(CartContext);

    const { mutate, data } = useCreate();

    useEffect(() => {
        if (data) {
            setSidebarView("CART_VIEW");
            openSidebar();
            setLoading(false);
        }
    }, [data]);

    const addToCart = async () => {
        setLoading(true);
        try {
            mutate({
                resource: `carts/${cartId}/line-items`,
                values: {
                    variant_id: variant.id as string,
                    quantity: 1,
                },
            });
        } catch (err) {
            setLoading(false);
        }
    };

    return (
        <div className={className}>
            <ProductOptions
                options={product.options}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
            />
            <Text
                className="pb-4 break-words w-full max-w-xl"
                html={product.description || ""}
            />
            <div className="flex flex-row justify-between items-center">
                <Rating value={4} />
                <div className="text-accent-6 pr-1 font-medium text-sm">
                    36 reviews
                </div>
            </div>
            <div>
                <Button
                    aria-label="Add to Cart"
                    type="button"
                    className={s.button}
                    onClick={() => addToCart()}
                    loading={loading}
                    disabled={variant?.availableForSale === false}
                >
                    Add To Cart
                </Button>
            </div>
            <div className="mt-6">
                <Collapse title="Care">
                    This is a limited edition production run. Printing starts
                    when the drop ends.
                </Collapse>
                <Collapse title="Details">
                    This is a limited edition production run. Printing starts
                    when the drop ends. Reminder: Bad Boys For Life. Shipping
                    may take 10+ days due to COVID-19.
                </Collapse>
            </div>
        </div>
    );
};

export default ProductSidebar;
