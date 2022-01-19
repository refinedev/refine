import { useState } from "react";

import { NumberInput } from "../components";
import { PlusSquareIcon } from "../components/icons";
import { useBasketContext } from "../hooks";
import { IProduct } from "../interfaces";

type ProducrtListItemProps = {
    product: IProduct;
};

export const ProductListItem: React.FC<ProducrtListItemProps> = ({
    product,
}) => {
    const { dispatch } = useBasketContext();
    const [amount, setAmount] = useState(1);

    return (
        <div className="flex items-center flex-col md:flex-row gap-4 md:gap-8">
            <img
                className="flex-none rounded-full w-32 h-32 object-cover"
                src={product.images[0].url}
            />
            <div className="flex-auto flex-col text-center md:text-left">
                <h3 className="font-bold text-gray-800 text-lg">
                    {product.name}
                </h3>
                <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="shrink-0 font-bold text-gray-800 text-lg w-16">
                ${product.price / 100}
            </div>
            <div className="flex gap-4 shrink-0">
                <NumberInput value={amount} setValue={setAmount} />
                <button
                    className="flex items-center gap-1 bg-primary text-white font-bold rounded-lg pl-2 pr-4 h-8 hover:bg-orange-500 transition-all active:scale-95"
                    onClick={() =>
                        dispatch({
                            type: "addProduct",
                            payload: { productId: product.id, amount },
                        })
                    }
                >
                    <PlusSquareIcon className="text-white w-6 h-6" />
                    Add to Card
                </button>
            </div>
        </div>
    );
};
