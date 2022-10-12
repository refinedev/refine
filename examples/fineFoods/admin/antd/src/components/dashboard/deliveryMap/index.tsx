import { useList, useNavigation } from "@pankod/refine-core";

import { Map, MapMarker } from "components";
import CourierSvg from "components/icons/courier.svg";
import LocationSvg from "components/icons/location.svg";

import { IOrder } from "interfaces";

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
        <Map {...defaultProps}>
            {orderData?.data.map((order) => {
                return (
                    <MapMarker
                        key={order.id}
                        onClick={() => show("orders", order.id)}
                        icon={{
                            url: CourierSvg,
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
                            url: LocationSvg,
                        }}
                        position={{
                            lat: Number(order.store.address.coordinate[0]),
                            lng: Number(order.store.address.coordinate[1]),
                        }}
                    />
                );
            })}
        </Map>
    );
};
