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

interface MapProps extends Exclude<google.maps.MapOptions, "center"> {
    center?: google.maps.LatLngLiteral;
}

const MapComponent: FC<PropsWithChildren<MapProps>> = ({
    children,
    center,
    zoom = 12,
    ...options
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (map) {
            map.setOptions({ ...options, zoom, center });
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
    return (
        <Wrapper apiKey={import.meta.env.VITE_APP_MAP_ID}>
            <MapComponent {...props} />
        </Wrapper>
    );
};

export default MapWrapper;
