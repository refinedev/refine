import React from "react";
import { DevtoolsPin } from "./components/devtools-pin";
import { ResizablePane } from "./components/resizable-pane";

import { SIZE, getPinTransform } from "./utilities";

import { Placement } from "./interfaces/placement";
import {
    DevToolsContext,
    DevtoolsEvent,
    send,
} from "@refinedev/devtools-shared";

export const DevtoolsPanel =
    __DEV_CONDITION__ !== "development"
        ? () => null
        : () => {
              const [visible, setVisible] = React.useState(false);
              const [placement] = React.useState<Placement>("bottom");
              const { devtoolsUrl, ws } = React.useContext(DevToolsContext);
              const [hover, setHover] = React.useState(false);

              const onSelectorHighlight = React.useCallback(
                  (name: string) => {
                      if (ws) {
                          send(
                              ws,
                              DevtoolsEvent.DEVTOOLS_HIGHLIGHT_IN_MONITOR,
                              {
                                  name,
                              },
                          );
                      }
                      setVisible(true);
                  },
                  [ws],
              );

              const onSelectorOpen = React.useCallback(() => {
                  setVisible(false);
              }, []);

              return (
                  <div
                      style={{
                          position: "fixed",
                          left: 0,
                          top: 0,
                          zIndex: 99999,
                          width: `${SIZE * 2}px`,
                          height: `${SIZE}px`,

                          transform: getPinTransform(placement),
                      }}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                  >
                      <DevtoolsPin
                          active={visible}
                          onClick={() => setVisible((v) => !v)}
                          groupHover={hover}
                          onSelectorHighlight={onSelectorHighlight}
                          onSelectorOpen={onSelectorOpen}
                      />
                      <ResizablePane visible={visible} placement={placement}>
                          {({ resizing }) => (
                              <iframe
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
