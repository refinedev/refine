import { useState } from "react";
import {
    useCreate,
    useGetIdentity,
    useNavigation,
    useShow,
} from "@pankod/refine-core";
import { Button, Typography, Icons, Spin } from "@pankod/refine-antd";

import { CanvasItem, DisplayCanvas } from "components/canvas";
import { ColorSelect } from "components/color-select";
import { AvatarPanel } from "components/avatar";
import { colors } from "utility";
import { Canvas } from "types";

const { LeftOutlined } = Icons;
const { Title } = Typography;

export const CanvasShow: React.FC = () => {
    const [color, setColor] = useState<typeof colors[number]>("black");

    const { data: identity } = useGetIdentity();
    const {
        queryResult: { data: { data: canvas } = {} },
    } = useShow<Canvas>();
    const { mutate } = useCreate();
    const { list, push } = useNavigation();

    const onSubmit = (x: number, y: number) => {
        if (!identity) {
            return push("/login");
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
                    <Button type="text" style={{ visibility: "hidden" }}>
                        <LeftOutlined />
                        Back
                    </Button>
                </div>

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
