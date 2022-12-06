import React from "react";
import { Canvas } from "types/canvas";
import { Pixel } from "types/pixel";
import { DEFAULT_SCALE, PIXEL_SIZE } from "utility/constants";

type Props = {
    canvas: Canvas;
    pixels: Pixel[] | undefined;
    scale?: number;
    border?: boolean;
    active?: boolean;
    onPixelClick?: (x: number, y: number) => void;
};

export const CanvasItem: React.FC<Props> = ({
    canvas: { id, name, width, height },
    pixels,
    scale = DEFAULT_SCALE,
    border = true,
    active = true,
    onPixelClick,
}) => {
    return (
        <div>
            <div className="canvas-tile">
                {Array.from({ length: height }).map((_, i) => (
                    <div key={`row-${i}`} style={{ display: "flex" }}>
                        {Array.from({ length: width }).map((_, j) => (
                            <div key={`row-${i}-col-${j}`}>
                                <div
                                    onClick={() => {
                                        if (onPixelClick && active) {
                                            onPixelClick(j, i);
                                        }
                                    }}
                                    className={
                                        active ? "canvas-pixel-item" : undefined
                                    }
                                    style={{
                                        cursor: active ? "pointer" : undefined,
                                        width: PIXEL_SIZE * scale,
                                        height: PIXEL_SIZE * scale,
                                        border: border
                                            ? "0.5px solid rgba(0,0,0,0.05)"
                                            : undefined,
                                        background:
                                            pixels?.find(
                                                (el) =>
                                                    el.x === j && el.y === i,
                                            )?.color ?? "transparent",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div
                style={{
                    whiteSpace: "normal",
                    display: active ? "none" : "block",
                    padding: "12px 0",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "12px",
                }}
            >
                {name ?? id}
            </div>
        </div>
    );
};
