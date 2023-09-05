import React from "react";
import { DevtoolsPin } from "./components/devtools-pin";
import { ResizablePane } from "./components/resizable-pane";

import { SIZE, getPinTransform } from "./utilities";

import { Placement } from "./interfaces/placement";
import { DevToolsContext } from "@refinedev/devtools-shared";

export const DevtoolsPanel = () => {
    const [visible, setVisible] = React.useState(false);
    const [placement] = React.useState<Placement>("bottom");
    const { devtoolsUrl } = React.useContext(DevToolsContext);

    return (
        <div
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: 99,
                width: `${SIZE}px`,
                height: `${SIZE}px`,

                transform: getPinTransform(placement),
            }}
        >
            <DevtoolsPin
                active={visible}
                onClick={() => setVisible((v) => !v)}
            />
            <ResizablePane visible={visible} placement={placement}>
                {({ resizing }) => (
                    <iframe
                        src={devtoolsUrl}
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            borderRadius: "7px",
                            pointerEvents: resizing ? "none" : "auto",
                        }}
                    />
                )}
            </ResizablePane>
        </div>
    );
};
