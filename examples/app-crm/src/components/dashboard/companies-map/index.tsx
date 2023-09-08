import { useNavigation } from "@refinedev/core";
import { Card, Button } from "antd";
import { GlobalOutlined, RightCircleOutlined } from "@ant-design/icons";
import { divIcon, point, LatLngExpression } from "leaflet";
import { MapContainer, GeoJSON, Marker } from "react-leaflet";
import type { GeoJsonObject } from "geojson";
import MarkerClusterGroup from "react-leaflet-cluster";

import "leaflet/dist/leaflet.css";

import { Text } from "../../text";
import CustomGeoJson from "./custom.geo.json";
import Markers from "./markers.json";
import Countries from "./countries.json";

import styles from "./index.module.css";

export const CompaniesMap: React.FC = () => {
    const { list } = useNavigation();

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
        <Card
            style={{ height: "100%" }}
            bodyStyle={{
                padding: 0,
                overflow: "hidden",
            }}
            title={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <GlobalOutlined />
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Companies
                    </Text>
                </div>
            }
            extra={
                <Button
                    onClick={() => list("companies")}
                    icon={<RightCircleOutlined />}
                >
                    See all companies
                </Button>
            }
        >
            <div
                style={{
                    height: "318px",
                    marginTop: "2px",
                    position: "relative",
                }}
            >
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
                                position={
                                    marker.coordinates as LatLngExpression
                                }
                                icon={customMarkerIcon}
                            />
                        ))}
                    </MarkerClusterGroup>

                    <GeoJSON
                        data={CustomGeoJson as GeoJsonObject}
                        style={{
                            fillColor: "#F0F0F0",
                            color: "#CCCCCC",
                            weight: 1.2,
                        }}
                    />
                </MapContainer>
            </div>
            <div className={styles.countries}>
                {Countries.map((country) => {
                    return (
                        <div className={styles.item} key={country.id}>
                            <img
                                className={styles.flag}
                                src={country.flag}
                                alt={`${country.name} flag`}
                            />
                            <div>{country.shortName}</div>
                            {country.count}
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
