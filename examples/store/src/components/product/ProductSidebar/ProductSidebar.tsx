import { Dispatch, SetStateAction, useEffect } from "react";
import { Product, ProductVariant } from "@medusajs/medusa";

import { ProductOptions } from "@components/product";
import { Button, Text } from "@components/ui";
import { selectDefaultOptionFromProduct, SelectedOptions } from "../helpers";
import { useCartContext, useUI } from "@lib/context";

import s from "./ProductSidebar.module.css";

interface ProductSidebarProps {
    product: Product;
    className?: string;
    selectedOptions?: SelectedOptions;
    setSelectedOptions?: Dispatch<SetStateAction<SelectedOptions>>;
    variant?: ProductVariant;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({
    product,
    className,
    setSelectedOptions = () => undefined,
    selectedOptions = {},
    variant,
}) => {
    const { openSidebar, setSidebarView } = useUI();

    useEffect(() => {
        selectDefaultOptionFromProduct(product, setSelectedOptions);
    }, [product]);

    const { addItem } = useCartContext();

    return (
        <div className={className}>
            <ProductOptions
                options={product.options}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
            />
            <Text
                className="w-full max-w-xl break-words pb-4"
                html={product.description || ""}
            />
            {variant && (
                <Button
                    aria-label="Add to Cart"
                    className={s.button}
                    onClick={async () => {
                        await addItem?.({
                            variantId: variant.id,
                            quantity: 1,
                        });

                        setSidebarView("CART_VIEW");
                        openSidebar();
                    }}
                    disabled={variant.inventory_quantity === 0}
                >
                    {variant.inventory_quantity > 0
                        ? "Add to Cart"
                        : "Soon in Stock"}
                </Button>
            )}
        </div>
    );
};
