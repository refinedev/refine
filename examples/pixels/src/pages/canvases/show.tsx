import { useState } from "react";
import {
    useCreate,
    useGetIdentity,
    useNavigation,
    useShow,
    useParsed,
    useIsAuthenticated,
} from "@refinedev/core";
import { useModal } from "@refinedev/antd";

import { LeftOutlined } from "@ant-design/icons";
import { Button, Typography, Spin, Modal } from "antd";

import { CanvasItem, DisplayCanvas } from "components/canvas";
import { ColorSelect } from "components/color-select";
import { AvatarPanel } from "components/avatar";
import { colors } from "utility";
import { Canvas } from "types";
import { LogList } from "components/logs";

const { Title } = Typography;

type Colors = typeof colors;

export const CanvasShow: React.FC = () => {
    const { pathname } = useParsed();
    const [color, setColor] = useState<Colors[number]>("black");
    const { modalProps, show, close } = useModal();
    const { data: identity } = useGetIdentity<any>();
    const { data: { authenticated } = {} } = useIsAuthenticated();

    const {
        queryResult: { data: { data: canvas } = {} },
    } = useShow<Canvas>();
    const { mutate } = useCreate();
    const { list, push } = useNavigation();

    const onSubmit = (x: number, y: number) => {
        if (!authenticated) {
            if (pathname) {
                return push(`/login?to=${encodeURIComponent(pathname)}`);
            }

            return push(`/login`);
        }

        if (typeof x === "number" && typeof y === "number" && canvas?.id) {
            mutate({
                resource: "pixels",
                values: {
                    x,
                    y,
                    color,
                    canvas_id: canvas?.id,
                    user_id: identity.id,
                },
                meta: {
                    canvas,
                },
                successNotification: false,
            });
        }
    };

    return (
        <div className="container">
            <div className="paper">
                <div className="paper-header">
                    <Button
                        type="text"
                        onClick={() => list("canvases")}
                        style={{ textTransform: "uppercase" }}
                    >
                        <LeftOutlined />
                        Back
                    </Button>
                    <Title level={3}>{canvas?.name ?? canvas?.id ?? ""}</Title>
                    <Button type="primary" onClick={show}>
                        View Changes
                    </Button>
                </div>
                <Modal
                    title="Canvas Changes"
                    {...modalProps}
                    centered
                    destroyOnClose
                    onOk={close}
                    onCancel={() => {
                        close();
                    }}
                    footer={[
                        <Button type="primary" key="close" onClick={close}>
                            Close
                        </Button>,
                    ]}
                >
                    <LogList currentCanvas={canvas} />
                </Modal>

                {canvas ? (
                    <DisplayCanvas canvas={canvas}>
                        {(pixels) =>
                            pixels ? (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: 48,
                                    }}
                                >
                                    <div>
                                        <ColorSelect
                                            selected={color}
                                            onChange={setColor}
                                        />
                                    </div>
                                    <CanvasItem
                                        canvas={canvas}
                                        pixels={pixels}
                                        onPixelClick={onSubmit}
                                        scale={(20 / (canvas?.width ?? 20)) * 2}
                                        active={true}
                                    />
                                    <div style={{ width: 120 }}>
                                        <AvatarPanel pixels={pixels} />
                                    </div>
                                </div>
                            ) : (
                                <div className="spin-wrapper">
                                    <Spin />
                                </div>
                            )
                        }
                    </DisplayCanvas>
                ) : (
                    <div className="spin-wrapper">
                        <Spin />
                    </div>
                )}
            </div>
        </div>
    );
};
