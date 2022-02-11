import { useBasketContext } from "@hooks";
import { IBasketOrder } from "@interfaces";

export const OrderModalProductItem: React.FC<{ order: IBasketOrder }> = ({
    order,
}) => {
    const { products } = useBasketContext();
    const { amount, productId } = order;
    const product = products.find((p) => p.id === productId);

    return (
        <div className="flex items-center justify-between border-b p-1">
            <div className="flex items-center gap-2">
                <img
                    className="h-12 w-12 rounded-full object-cover object-center"
                    src={product?.images[0].url}
                    alt={product?.name}
                />
                <p>{product?.name}</p>
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
