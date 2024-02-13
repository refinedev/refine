import { useList, useNavigation } from "@refinedev/core";
import { Map, MapMarker } from "../../map";
import { IStore } from "../../../interfaces";
import { Card, Flex, List, Typography } from "antd";
import { useRef, useState } from "react";
import { StoreStatus } from "../status";
import {
    EnvironmentOutlined,
    PhoneOutlined,
    UserOutlined,
} from "@ant-design/icons";

type SelectedStore = {
    x: number;
    y: number;
} & IStore;

export const AllStoresMap = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [selectedStore, setSelectedStore] = useState<SelectedStore | null>(
        null,
    );

    const { edit } = useNavigation();

    const { data: storeData } = useList<IStore>({
        resource: "stores",
        config: {
            pagination: {
                mode: "off",
            },
        },
    });
    const stores = storeData?.data || [];

    const handleClick = (e: any, id: number) => {
        const domEvent = e?.domEvent;
        const y = domEvent?.clientY;
        const x = domEvent?.clientX;
        const bounds = parentRef.current?.getBoundingClientRect();
        const store = stores.find((s) => s.id === id);

        if (bounds && store && x && y) {
            setSelectedStore({
                ...store,
                // center the card on the marker
                x: x - bounds.left,
                y: y - bounds.top,
            });
        }
    };

    return (
        <Flex
            ref={parentRef}
            style={{
                height: "100%",
                width: "100%",
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
            }}
        >
            <Map
                center={{
                    lat: 40.73061,
                    lng: -73.935242,
                }}
                onPositionChange={() => {
                    setSelectedStore(null);
                }}
                zoom={10}
            >
                {stores?.map((store) => {
                    const lat = Number(store.address?.coordinate?.[0]);
                    const lng = Number(store.address?.coordinate?.[1]);

                    if (!lat || !lng) return null;

                    return (
                        <MapMarker
                            key={store.id}
                            icon={{
                                url: "/images/marker-store.svg",
                            }}
                            position={{
                                lat,
                                lng,
                            }}
                            onClick={(e: any) => {
                                handleClick(e, store.id);
                            }}
                        />
                    );
                })}
            </Map>
            {selectedStore && (
                <Card
                    styles={{
                        body: {
                            padding: "16px",
                        },
                    }}
                    style={{
                        position: "absolute",
                        top: selectedStore?.y,
                        left: selectedStore?.x,
                    }}
                >
                    <Flex align="center" justify="space-between" gap={32}>
                        <Typography.Title
                            level={5}
                            onClick={() => {
                                edit("stores", selectedStore.id);
                            }}
                            style={{
                                cursor: "pointer",
                                fontWeight: "400",
                                marginBottom: "0px",
                            }}
                        >
                            {selectedStore.title}
                        </Typography.Title>
                        <StoreStatus value={selectedStore.isActive} />
                    </Flex>
                    <List
                        dataSource={[
                            {
                                title: <EnvironmentOutlined />,
                                value: selectedStore.address.text,
                            },
                            {
                                title: <UserOutlined />,
                                value: selectedStore.email,
                            },
                            {
                                title: <PhoneOutlined />,
                                value: selectedStore.gsm,
                            },
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <Flex gap={8}>
                                    <Typography.Text type="secondary">
                                        {item.title}
                                    </Typography.Text>
                                    <Typography.Text type="secondary">
                                        {item.value}
                                    </Typography.Text>
                                </Flex>
                            </List.Item>
                        )}
                    />
                </Card>
            )}
        </Flex>
    );
};
