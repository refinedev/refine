import React from "react";
import { DevtoolsPin } from "./components/devtools-pin";
import { ResizablePane } from "./components/resizable-pane";

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
              const [browser, setBrowser] = React.useState<boolean>(false);
              const [visible, setVisible] = React.useState(false);
              const [placement] = React.useState<Placement>("bottom");
              const { devtoolsUrl, ws } = React.useContext(DevToolsContext);

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

              React.useEffect(() => {
                  if (typeof window !== "undefined") {
                      setBrowser(true);
                  }
              }, []);

              if (!browser) {
                  return null;
              }

              return (
                  <div
                      style={{
                          position: "fixed",
                          left: "50%",
                          transform: "translateX(-50%)",
                          bottom: 0,
                          zIndex: 99999,
                      }}
                  >
                      <DevtoolsPin
                          onClick={() => setVisible((v) => !v)}
                          onSelectorHighlight={onSelectorHighlight}
                          onSelectorOpen={onSelectorOpen}
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
