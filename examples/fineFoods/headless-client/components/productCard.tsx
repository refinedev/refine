import React, { useState } from "react";

import {
    PlusSquareIcon,
    ChevronUpIcon,
    ChevronDownIcon,
} from "../components/icons";
import { useBasketContext } from "../hooks";

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
                <div className="flex-auto pt-8 pb-4 px-4">
                    <h3 className="font-bold text-gray-800">{title}</h3>
                    <p className="text-sm">{description}</p>
                    <span className="font-bold text-gray-800 text-lg">
                        ${price / 100}
                    </span>
                    <div className="flex gap-1 items-center justify-end">
                        <div className="relative h-8">
                            <input
                                className="pl-2 border w-16 rounded-md h-full"
                                value={amount}
                                onChange={(event) => {
                                    setAmount(Number(event.target.value));
                                }}
                            />
                            <button className="border absolute right-0 top-0 h-1/2">
                                <ChevronUpIcon
                                    onClick={() =>
                                        setAmount((prev) => prev + 1)
                                    }
                                    className="text-primary w-4 h-full"
                                />
                            </button>
                            <button className="border absolute right-0 bottom-0 h-1/2">
                                <ChevronDownIcon
                                    onClick={() =>
                                        setAmount((prev) => prev - 1)
                                    }
                                    className="text-primary w-4 h-full"
                                />
                            </button>
                        </div>
                        <button
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
