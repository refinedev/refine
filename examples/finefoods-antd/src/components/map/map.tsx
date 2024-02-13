import {
    Children,
    cloneElement,
    FC,
    isValidElement,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { mapStyles } from "./styles";
import { useConfigProvider } from "../../context";

interface MapProps extends Exclude<google.maps.MapOptions, "center"> {
    center?: google.maps.LatLngLiteral;
    onDragStart?: Function;
}

const MapComponent: FC<PropsWithChildren<MapProps>> = ({
    children,
    center,
    zoom = 12,
    onDragStart,
    ...options
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (map && center) {
            map?.setCenter({
                lat: center.lat,
                lng: center.lng,
            });
        }
    }, [center]);

    useEffect(() => {
        if (map) {
            map.setOptions({ ...options, zoom, center });
            if (onDragStart) {
                map.addListener("dragstart", onDragStart);
            }
        }
    }, [map]);

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    return (
        <>
            <div ref={ref} style={{ flexGrow: "1", height: "100%" }} />
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    // eslint-disable-next-line
                    return cloneElement<any>(child, { map });
                }
            })}
        </>
    );
};

const MapWrapper: FC<PropsWithChildren<MapProps>> = (props) => {
    const { mode } = useConfigProvider();

    return (
        <Wrapper apiKey={"AIzaSyCfS48X6U0TTsJN4xIHSTkXITimmYGSWjk"}>
            <MapComponent {...props} styles={mapStyles[mode]} />
        </Wrapper>
    );
};

export default MapWrapper;
