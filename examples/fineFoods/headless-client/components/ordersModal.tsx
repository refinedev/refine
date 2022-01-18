import { useRef } from "react";
import { useCreate, useNavigation } from "@pankod/refine-core";

import {
    useBasketContext,
    useOrdesModalContext,
    useOnClickOutside,
} from "../hooks";

import { OrderModalProductItem } from "../components";
import { OrderSuccess, Close } from "../components/icons";
import { IOrder } from "../interfaces";

export const OrdersModal = () => {
    const ref = useRef(null);
    const { replace } = useNavigation();
    const { setOrdersModalVisible } = useOrdesModalContext();
    const { orders, totalPrice, products, dispatch } = useBasketContext();
    const { mutate } = useCreate<IOrder>();

    const handleClickOutside = () => {
        setOrdersModalVisible(false);
    };
    useOnClickOutside(ref, handleClickOutside);

    return (
        <>
            <div className="fixed inset-0 z-50 opacity-40 bg-black"></div>
            <div className="fixed inset-0 z-50 flex items-center">
                <div ref={ref} className="w-[500px] bg-white mx-auto">
                    <div className="relative bg-primary p-2">
                        <button
                            className="absolute top-2 right-2"
                            onClick={() => setOrdersModalVisible(false)}
                        >
                            <Close className="w-6 h-6 text-white" />
                        </button>
                        <OrderSuccess className="bg-primary" />
                    </div>
                    <div className="p-4">
                        <div className="flex flex-col gap-2">
                            {orders.map((order, index) => (
                                <OrderModalProductItem
                                    key={index}
                                    order={order}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex justify-center items-center gap-2">
                                Total:
                                <span className="font-bold text-lg text-gray-800">
                                    {orders.length} items / ${totalPrice / 100}
                                </span>
                            </div>
                            <button
                                onClick={() =>
                                    mutate(
                                        {
                                            resource: "orders",
                                            values: {
                                                products,
                                                amount: totalPrice,
                                            },
                                            successNotification: false,
                                        },
                                        {
                                            onSuccess: (data) => {
                                                replace(
                                                    "/order/[id]",
                                                    `/order/${data.data.id}`,
                                                );
                                                setOrdersModalVisible(false);
                                                dispatch({
                                                    type: "resetBasket",
                                                });
                                            },
                                        },
                                    )
                                }
                                className="bg-primary text-white hover:bg-orange-600 text-lg px-4 font-bold border border-primary rounded-md"
                            >
                                Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
