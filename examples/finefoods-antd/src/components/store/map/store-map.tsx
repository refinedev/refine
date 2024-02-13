import { Flex } from "antd";
import _debounce from "lodash/debounce";
import { Map, MapMarker } from "../../map";
import { IStore } from "../../../interfaces";
import { useCallback } from "react";
import { convertLatLng } from "../../../utils";

type Props = {
    store: IStore;
    lat?: number;
    lng?: number;
    onDragEnd?: ({ lat, lng }: { lat: number; lng: number }) => void;
};

export const StoreMap = (props: Props) => {
    const onDragEndDebounced = useCallback(
        _debounce((lat, lng) => {
            if (props.onDragEnd) {
                props.onDragEnd({ lat, lng });
            }
        }, 1000),
        [],
    );

    const handleDragEnd = (e: any) => {
        if (!props.onDragEnd) return;

        const { lat, lng } = convertLatLng({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
        onDragEndDebounced.cancel();
        onDragEndDebounced(lat, lng);
    };

    const lat = Number(props.lat);
    const lng = Number(props.lng);

    return (
        <Flex
            style={{
                height: "100%",
                width: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Map
                center={{
                    lat,
                    lng,
                }}
                zoom={10}
            >
                {lat && lng && (
                    <MapMarker
                        key={props.store.id}
                        icon={{
                            url: "/images/marker-store-pick.svg",
                        }}
                        position={{
                            lat,
                            lng,
                        }}
                        onDragEnd={handleDragEnd}
                    />
                )}
            </Map>
        </Flex>
    );
};
