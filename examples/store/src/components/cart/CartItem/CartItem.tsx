import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "clsx";
import { useDelete, useInvalidate, useUpdate } from "@pankod/refine-core";
import { LineItem } from "@medusajs/medusa";
import { formatAmount } from "medusa-react";

import { Quantity } from "@components";
import { useCartContext, useUI } from "@lib/context";

import s from "./CartItem.module.css";

const placeholderImg = "/product-img-placeholder.svg";

interface CartItemProps {
    item: LineItem;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { closeSidebarIfPresent } = useUI();
    const [removing, setRemoving] = useState(false);
    const [quantity, setQuantity] = useState<number>(item.quantity);

    const { mutateAsync: deleteMutate, isLoading: deleteIsLoading } =
        useDelete();
    const { mutate: updateMutate, isLoading: updateIsLoading } = useUpdate();
    const invalidate = useInvalidate();

    const { cart } = useCartContext();

    const isLoading = useMemo(() => {
        return updateIsLoading || deleteIsLoading;
    }, [deleteIsLoading, updateIsLoading]);

    useEffect(() => {
        setRemoving(isLoading);
    }, [isLoading]);

    const updateItem = (quantity: number) => {
        return updateMutate(
            {
                resource: `carts/${cart?.id}/line-items`,
                id: item.id,
                values: { quantity },
            },
            {
                onSuccess: () => {
                    invalidate({
                        resource: "carts",
                        invalidates: ["detail"],
                        id: cart?.id,
                    });
                },
            },
        );
    };

    const handleChange = async ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(value));
        updateItem(Number(value));
    };

    const increaseQuantity = async (n = 1) => {
        const val = Number(quantity) + n;
        setQuantity(val);
        updateItem(val);
    };

    const removeItem = async () => {
        try {
            await deleteMutate(
                {
                    resource: `carts/${cart?.id}/line-items`,
                    id: item.id,
                },
                {
                    onSuccess: () => {
                        invalidate({
                            resource: "carts",
                            invalidates: ["detail"],
                            id: cart?.id,
                        });
                    },
                },
            );
        } catch (error) {
            console.log("Error", error);
        }
    };

    useEffect(() => {
        if (item.quantity !== Number(quantity)) {
            setQuantity(item.quantity);
        }
    }, [item.quantity]);

    if (!cart) {
        return null;
    }

    const getAmount = (amount: number | undefined | null) => {
        return formatAmount({
            amount: amount || 0,
            region: cart.region,
        });
    };

    return (
        <li
            className={cn(s.root, {
                "pointer-events-none opacity-50": removing,
            })}
        >
            <div className="flex flex-row space-x-4 py-4">
                <div className="border-product-gray relative z-0 h-16 w-16 cursor-pointer overflow-hidden rounded-[4px] border-[1px] border-solid p-1">
                    <Link
                        href={{
                            pathname: "/product/[handle]",
                            query: { handle: item.variant.product.handle },
                        }}
                    >
                        <Image
                            onClick={() => closeSidebarIfPresent()}
                            className={s.productImage}
                            width={64}
                            height={64}
                            src={
                                item.variant.product.thumbnail || placeholderImg
                            }
                            alt={item.variant.product.title || "Product Image"}
                            unoptimized
                        />
                    </Link>
                </div>
                <div className="flex flex-1 flex-col gap-1 text-base">
                    <Link
                        href={{
                            pathname: "/product/[handle]",
                            query: { handle: item.variant.product.handle },
                        }}
                    >
                        <span
                            className={s.productName}
                            onClick={() => closeSidebarIfPresent()}
                        >
                            {item.title}
                        </span>
                    </Link>
                    <div className="text-sm tracking-wider">
                        {item.variant.title}
                    </div>
                </div>
                <div className="flex flex-col justify-between space-y-2 text-sm">
                    <span>{getAmount(item.total)}</span>
                </div>
            </div>
            <Quantity
                value={quantity}
                handleRemove={removeItem}
                handleChange={handleChange}
                increase={() => increaseQuantity(1)}
                decrease={() => increaseQuantity(-1)}
                max={item.variant.inventory_quantity}
            />
        </li>
    );
};
