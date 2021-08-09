import { useList, useNavigation } from "@pankod/refine";
import GoogleMapReact from "google-map-react";

import { MapMarker } from "components/map";

import { IOrder } from "interfaces";

export const DeliveryMap: React.FC = () => {
    const { data: orderData } = useList<IOrder>("orders", {
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
    });

    const defaultProps = {
        center: {
            lat: 40.73061,
            lng: -73.935242,
        },
        zoom: 11,
    };

    const { show } = useNavigation();

    return (
        <div style={{ height: "550px", width: "100%" }}>
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
                            <img
                                src="images/map/user.svg"
                                onClick={() => show("orders", order.id)}
                            />
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
                            <img
                                src="images/map/courier.svg"
                                onClick={() => show("orders", order.id)}
                            />
                        </MapMarker>
                    );
                })}
            </GoogleMapReact>
        </div>
    );
};
