import React from "react";

import { IProduct } from "../interfaces";

type ProducrtListItemProps = {
    product: IProduct;
};

export const ProductListItem: React.FC<ProducrtListItemProps> = ({
    product,
}) => {
    return (
        <div className="flex items-center flex-col md:flex-row gap-8">
            <img
                className="flex-none rounded-full w-32 h-32 object-cover"
                src={product.images[0].url}
            />
            <div className="flex-auto flex-col">
                <h3 className="font-bold text-gray-800 text-lg">
                    {product.name}
                </h3>
                <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="shrink-0 font-bold text-gray-800 text-lg w-16">
                ${product.price / 100}
            </div>
            <button className="shrink-0 bg-primary text-white font-bold rounded-lg px-4 w-32 h-8">
                Add to Card
            </button>
        </div>
    );
};
