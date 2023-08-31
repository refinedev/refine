import { Card, Col, Row, theme } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
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
    const { token } = theme.useToken();
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
            title={
                <span>
                    <GlobalOutlined style={{ color: token.colorPrimary }} />
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Companies
                    </Text>
                </span>
            }
            bodyStyle={{
                padding: 0,
                overflow: "hidden",
            }}
        >
            <Row gutter={[32, 32]} justify="space-between">
                <Col span={16}>
                    <div style={{ height: "330px" }}>
                        <MapContainer
                            style={{ flex: 1, width: "100%", height: "100%" }}
                            center={[51.505, -0.09]}
                            zoom={1}
                            scrollWheelZoom={false}
                            maxZoom={3}
                            zoomControl={false}
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
                </Col>
                <Col span={8}>
                    <div className={styles.countries}>
                        {Countries.map((country) => (
                            <div key={country.id} className={styles.item}>
                                <div>
                                    <img
                                        src={country.flag}
                                        alt={country.name}
                                        className={styles.flag}
                                    />
                                    <Text>{country.name}</Text>
                                </div>

                                <Text>{country.count}</Text>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Card>
    );
};
