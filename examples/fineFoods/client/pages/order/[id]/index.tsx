import { useLayoutEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { LayoutWrapper } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import JSConfetti from "js-confetti";
import { gsap, Power3 } from "gsap";

import { FastMotocycleIcon, OrderIcon } from "@components";
import { IOrder } from "@interfaces";
import { API_URL, TRANSLATIONS_BON_APPETIT } from "src/constants";

type OrderPageProps = {
    order: IOrder;
};

export const OrderDetail: React.FC<OrderPageProps> = ({ order }) => {
    const el = useRef<any>();
    const q = gsap.utils.selector(el);

    const [showMessage, setShowMessage] = useState(false);
    const [timeline] = useState(() => gsap.timeline());

    useLayoutEffect(() => {
        const jsConfetti = new JSConfetti();
        setTimeout(() => {
            jsConfetti.addConfetti();
        }, 500);

        const motoAnimation = timeline.to(q(".moto"), {
            rotate: -30,
            duration: 1,
            scale: 1.2,
            ease: Power3.easeIn,
            onComplete: () => {
                timeline.to(q(".moto"), {
                    x: 200,
                    duration: 4,
                    rotate: 0,
                    ease: Power3.easeOut,
                    onComplete: () => {
                        setShowMessage(true);
                    },
                });
            },
        });
        return () => {
            motoAnimation.kill();
        };
    }, []);

    return (
        <LayoutWrapper>
            <div
                ref={el}
                className="container bg-white overflow-hidden rounded-xl"
            >
                <div className="flex flex-wrap justify-center sm:justify-start  items-center gap-4 py-4 px-8 bg-green-600 text-white">
                    <OrderIcon />
                    <h1 className="main-title text-center text-3xl md:text-5xl font-bold uppercase">
                        Order received
                    </h1>
                </div>
                <div className="p-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Order Summary
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-16 mt-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-lg text-gray-700">
                                    Order Number:
                                </h4>
                                <p>#{order.orderNumber}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-lg text-gray-700">
                                    Order Date:
                                </h4>
                                <p>{order.createdAt}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-lg text-gray-700">
                                    Total:
                                </h4>
                                <p>
                                    {order.products.reduce(
                                        (a, b) => a + b.price,
                                        0,
                                    ) / 100}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-gray-700">
                                Order Details
                            </h4>
                            {order.products.map((product, index) => (
                                <p key={product.id}>
                                    <strong>{index + 1}. </strong>
                                    {product.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="p-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Delivery Details
                    </h1>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 mt-2">
                        <div className="flex flex-col gap-2">
                            <h4 className="font-bold text-lg text-gray-700">
                                Address
                            </h4>
                            <p>{order.adress.text}</p>
                            <h4 className="font-bold text-lg text-gray-700">
                                Estimated Delivery Time
                            </h4>
                            <p>12:55</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                            <img
                                className="rounded-full h-32 w-32"
                                src={order.courier.avatar[0].url}
                                alt={order.courier.name}
                            />
                            <div className="flex flex-col mt-16 md:mt-0 gap-4 relative">
                                {showMessage && (
                                    <a
                                        className="message border-2 border-primary font-semibold px-4 py-2 rounded-full text-primary hover:text-orange-600 hover:border-orange-600 active:scale-95 transition-all"
                                        href={`https://example.admin.refine.dev/orders/show/${order.id}`}
                                        rel="noreferrer"
                                    >
                                        Manage the order
                                    </a>
                                )}
                                <FastMotocycleIcon className="moto" />
                                <p>
                                    <strong>{order.courier.name}</strong> will
                                    deliver your order in 30 minutes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="flex flex-wrap justify-start md:justify-center items-center gap-1 p-8 opacity-50">
                    {TRANSLATIONS_BON_APPETIT.map((p, index) => (
                        <p
                            key={p}
                            className="text-2xl"
                            style={{
                                fontWeight: index % 2 === 0 ? 800 : 500,
                            }}
                        >
                            {p}
                        </p>
                    ))}
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default OrderDetail;

export const getServerSideProps: GetServerSideProps = async (conp) => {
    const { id } = conp.query;

    try {
        const { data: orderData } = await dataProvider(API_URL).getOne({
            resource: "orders",
            id: id as string,
        });

        return {
            props: { order: orderData },
        };
    } catch (error) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
};
