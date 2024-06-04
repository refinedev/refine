import React from "react";
import { DevtoolsPin } from "./components/devtools-pin";
import { ResizablePane } from "./components/resizable-pane";

import {
  DevToolsContext,
  DevtoolsEvent,
  send,
} from "@refinedev/devtools-shared";

import type { Placement } from "./interfaces/placement";

export const DevtoolsPanel =
  __DEV_CONDITION__ !== "development"
    ? () => null
    : () => {
        const [browser, setBrowser] = React.useState<boolean>(false);
        const [visible, setVisible] = React.useState(false);
        const [placement] = React.useState<Placement>("bottom");
        const { devtoolsUrl, ws } = React.useContext(DevToolsContext);
        const [width, setWidth] = React.useState<number>(0);
        const [selectorActive, setSelectorActive] = React.useState(false);

        const onSelectorHighlight = React.useCallback(
          (name: string) => {
            if (ws) {
              send(ws, DevtoolsEvent.DEVTOOLS_HIGHLIGHT_IN_MONITOR, {
                name,
              });
            }
            setVisible(true);
          },
          [ws],
        );

        const onSelectorOpen = React.useCallback(() => {
          setVisible(false);
        }, []);

        React.useEffect(() => {
          if (selectorActive) {
            setVisible(false);
          }
        }, [selectorActive]);

        React.useEffect(() => {
          if (typeof window !== "undefined") {
            setBrowser(true);
          }
        }, []);

        React.useEffect(() => {
          if (browser) {
            // set width by window size dynamically
            setWidth(window.innerWidth);

            const onResize = () => {
              setWidth(window.innerWidth);
            };

            window.addEventListener("resize", onResize);

            return () => {
              window.removeEventListener("resize", onResize);
            };
          }

          return () => undefined;
        }, [browser]);

        if (!browser) {
          return null;
        }

        return (
          <div
            style={{
              position: "fixed",
              left: `${Math.round(width / 2)}px`,
              transform: "translateX(-50%)",
              bottom: 0,
              zIndex: 99999,
            }}
          >
            <DevtoolsPin
              onClick={() => {
                setVisible((v) => !v);
                setSelectorActive(false);
              }}
              onSelectorHighlight={onSelectorHighlight}
              selectorActive={selectorActive}
              setSelectorActive={setSelectorActive}
            />
            <ResizablePane visible={visible} placement={placement}>
              {({ resizing }) => (
                <iframe
                  allow="clipboard-write;"
                  src={devtoolsUrl}
                  srcDoc={
                    devtoolsUrl
                      ? undefined
                      : `
                            <html style="height:100%;padding:0;margin:0;">
                                <body style="display:flex;justify-content:center;height:100%;padding:24px;margin:0;align-items:center;box-sizing:border-box;">
                                    <h1 style="font-family:ui-monospace,monospace;color:#CFD7E2;text-align:center;">Could not connect to the devtools server</h1>
                                </body>
                            </html>
                        `
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "7px",
                    pointerEvents: resizing ? "none" : "auto",
                    background: "#14141F",
                  }}
                />
              )}
            </ResizablePane>
          </div>
        );
      };
