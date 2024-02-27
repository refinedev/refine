import { useState } from "react";

import { NumberInput, PlusSquareIcon } from "@components";
import { useBasketContext } from "@hooks";
import { IProduct } from "@interfaces";

type ProducrtListItemProps = {
  product: IProduct;
};

export const ProductListItem: React.FC<ProducrtListItemProps> = ({
  product,
}) => {
  const { dispatch } = useBasketContext();
  const [amount, setAmount] = useState(1);

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
      <img
        className="h-32 w-32 flex-none rounded-full object-cover"
        src={product.images[0].url}
      />
      <div className="flex-auto flex-col text-center md:text-left">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
      </div>
      <div className="w-16 shrink-0 text-lg font-bold text-gray-800">
        ${product.price / 100}
      </div>
      <div className="flex shrink-0 gap-4">
        <NumberInput value={amount} setValue={setAmount} />
        <button
          className="bg-primary flex h-8 items-center gap-1 rounded-lg pl-2 pr-4 font-bold text-white transition-all hover:bg-orange-500 active:scale-95"
          onClick={() =>
            dispatch({
              type: "addProduct",
              payload: { productId: product.id, amount },
            })
          }
        >
          <PlusSquareIcon className="h-6 w-6 text-white" />
          Add to Card
        </button>
      </div>
    </div>
  );
};
