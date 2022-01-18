import { useBasketContext } from "../hooks";
import { IBasketOrder } from "../interfaces";

export const OrderModalProductItem: React.FC<{ order: IBasketOrder }> = ({
    order,
}) => {
    const { products } = useBasketContext();
    const { amount, productId } = order;
    const product = products.find((p) => p.id === productId);

    return (
        <div className="flex justify-between items-center border-b p-1">
            <div className="flex items-center gap-2">
                <img
                    className="rounded-full w-12 h-12 object-cover object-center"
                    src={product?.images[0].url}
                    alt={product?.name}
                />
                <div>{product?.name}</div>
            </div>
            <div className="flex-none">
                <span className="font-semibold">
                    ${(product?.price ?? 0) / 100}
                </span>{" "}
                x {amount}
            </div>
        </div>
    );
};
