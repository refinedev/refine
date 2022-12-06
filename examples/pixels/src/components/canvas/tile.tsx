import { Button, Col, Space } from "@pankod/refine-antd";
import { useNavigation } from "@pankod/refine-core";
import Contributors from "components/avatar/contributors";
import React from "react";
import { Canvas } from "types/canvas";
import { CanvasItem } from ".";
import DisplayCanvas from "./display";

type CanvasTileProps = {
    canvas: Canvas;
};

const CanvasTile: React.FC<CanvasTileProps> = ({ canvas }) => {
    const { show } = useNavigation();

    return (
        <>
            <DisplayCanvas canvas={canvas}>
                {(pixels) => (
                    <Col
                        key={canvas.id}
                        style={{
                            height: "auto",
                            width: "100%",
                            maxWidth: "248px",
                        }}
                    >
                        <Button
                            onClick={() => {
                                show("canvases", canvas.id);
                            }}
                            style={{
                                height: "auto",
                                maxHeight: "auto",
                                paddingTop: "15px",
                                display: "flex",
                                alignItems: "stretch",
                            }}
                        >
                            <CanvasItem
                                canvas={canvas}
                                pixels={pixels}
                                scale={20 / canvas.width}
                                active={false}
                            />
                        </Button>
                        <Contributors pixels={pixels} />
                    </Col>
                )}
            </DisplayCanvas>
        </>
    );
};

export default CanvasTile;
