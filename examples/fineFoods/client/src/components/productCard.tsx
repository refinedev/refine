import React, { useState } from "react";

import { NumberInput, PlusSquareIcon } from "@components";
import { useBasketContext } from "@hooks";

export type ProductCardProps = {
    productImg: string;
    badgeTitle?: string;
    title: string;
    description: string;
    price: number;
    badgeBgColor?: string;
    productId?: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
    productImg,
    badgeTitle,
    title,
    description,
    price,
    badgeBgColor,
    productId,
}) => {
    const { dispatch } = useBasketContext();
    const [amount, setAmount] = useState(1);

    return (
        <div className="p-2 h-full">
            <div className="flex flex-row md:flex-col lg:flex-row justify-center items-center border border-gray-200 shadow-md rounded-lg overflow-hidden relative p-2 pt-0 md:pt-8 lg:pt-2 h-full">
                <span
                    className="absolute top-0 right-0 text-white rounded-bl-2xl py-0.5 px-3 bg-primary font-bold uppercase z-10"
                    style={{ backgroundColor: badgeBgColor }}
                >
                    {badgeTitle}
                </span>
                <div className="shrink-0">
                    <img
                        className="h-36 w-36 rounded-full object-cover"
                        src={productImg}
                        alt={title}
                    />
                </div>
                <div className="flex-auto pt-8 pb-4 px-2 h-full">
                    <h3 className="font-bold text-gray-800">{title}</h3>
                    <p className="text-sm">{description}</p>
                    <span className="font-bold text-gray-800 text-lg">
                        ${price / 100}
                    </span>
                    <div className="flex flex-grow gap-1 justify-end">
                        <NumberInput value={amount} setValue={setAmount} />
                        <button
                            className="hover:bg-gray-50 active:scale-95 transition-all"
                            onClick={() =>
                                dispatch({
                                    type: "addProduct",
                                    payload: { productId, amount },
                                })
                            }
                        >
                            <PlusSquareIcon className="text-primary w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
