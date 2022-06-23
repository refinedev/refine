import { useList, useNavigation } from "@pankod/refine-core";
import { Box } from "@pankod/refine-mui";
import GoogleMapReact from "google-map-react";

import { MapMarker } from "components/mapMarker";
import { LocationIcon, CourierIcon } from "components/icons";
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
        <Box sx={{ height: "576px", width: "100%", position: "relative" }}>
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
                            <LocationIcon
                                sx={{ width: "36px", height: "36px" }}
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
                            <CourierIcon
                                sx={{ width: "64px", height: "64px" }}
                                onClick={() => show("orders", order.id)}
                            />
                        </MapMarker>
                    );
                })}
            </GoogleMapReact>
        </Box>
    );
};
