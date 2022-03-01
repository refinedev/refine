import { useList, useNavigation } from "@pankod/refine-core";
import GoogleMapReact from "google-map-react";

import { MapMarker } from "components/map";
import { UserIcon, CourierIcon } from "components/icons";

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
        <GoogleMapReact
            bootstrapURLKeys={{
                key: process.env.REACT_APP_MAP_ID,
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
            {orderData?.data.map((order) => {
                return (
                    <MapMarker
                        key={order.id}
                        lat={order.adress.coordinate[0]}
                        lng={order.adress.coordinate[1]}
                    >
                        <UserIcon onClick={() => show("orders", order.id)} />
                    </MapMarker>
                );
            })}

            {orderData?.data.map((order) => {
                return (
                    <MapMarker
                        key={order.id}
                        lat={order.store.address.coordinate[0]}
                        lng={order.store.address.coordinate[1]}
                    >
                        <CourierIcon onClick={() => show("orders", order.id)} />
                    </MapMarker>
                );
            })}
        </GoogleMapReact>
    );
};
