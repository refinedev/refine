import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { divIcon, LatLngExpression, point } from "leaflet";

import Markers from "./markers.json";

import "leaflet/dist/leaflet.css";

const Map = () => {
    const customMarkerIcon = divIcon({
        className: "custom-marker-icon",
    });

    const customClusterIcon = (cluster: any) => {
        return divIcon({
            html: `<span>${cluster.getChildCount()}</span>`,
            className: "custom-marker-cluster",
            iconSize: point(33, 33, true),
        });
    };

    return (
        <MapContainer
            style={{
                flex: 1,
                width: "100%",
                height: "100%",
                zIndex: 0,
            }}
            center={[51.505, -0.09]}
            zoom={2}
            scrollWheelZoom={false}
            maxZoom={2}
            zoomControl={false}
            maxBounds={[
                [-80, -180],
                [90, 180],
            ]}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
                chunkedLoading
                polygonOptions={{
                    opacity: 0,
                    fillOpacity: 0,
                }}
                iconCreateFunction={customClusterIcon}
            >
                {Markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.coordinates as LatLngExpression}
                        icon={customMarkerIcon}
                    />
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default Map;
