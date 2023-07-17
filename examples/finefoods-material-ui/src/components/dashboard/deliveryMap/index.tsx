import { useList, useNavigation } from "@refinedev/core";
import Box from "@mui/material/Box";

import { Map, MapMarker } from "../../../components";
import { IOrder } from "../../../interfaces";

export const DeliveryMap: React.FC = () => {
    const { data: orderData } = useList<IOrder>({
        resource: "orders",
        config: {
            filters: [
                {
                    field: "status.text",
                    operator: "eq",
                    value: "On The Way",
                },
            ],
            pagination: {
                pageSize: 1000,
            },
        },
    });

    const defaultProps = {
        center: {
            lat: 40.73061,
            lng: -73.935242,
        },
        zoom: 13,
    };

    const { show } = useNavigation();

    return (
        <Box sx={{ height: "576px", width: "100%", position: "relative" }}>
            <Map {...defaultProps}>
                {orderData?.data.map((order) => {
                    return (
                        <MapMarker
                            key={order.id}
                            onClick={() => show("orders", order.id)}
                            icon={{
                                url: "/images/marker-courier.svg",
                            }}
                            position={{
                                lat: Number(order.adress.coordinate[0]),
                                lng: Number(order.adress.coordinate[1]),
                            }}
                        />
                    );
                })}
                {orderData?.data.map((order) => {
                    return (
                        <MapMarker
                            key={order.id}
                            onClick={() => show("orders", order.id)}
                            icon={{
                                url: "/images/marker-location.svg",
                            }}
                            position={{
                                lat: Number(order.store.address.coordinate[0]),
                                lng: Number(order.store.address.coordinate[1]),
                            }}
                        />
                    );
                })}
            </Map>
        </Box>
    );
};
