import React from "react";

import { prettyString } from "@/utilities";
import { CreateGuesserConfig } from "@/types";

import { CodeHighlight } from "../code-highlight";

/**
 * CodeViewerComponent is the default code viewer component for Guesser.
 * This code is provided from props, modal toggling is handled by the component.
 */
export const CodeViewerComponent: CreateGuesserConfig["codeViewerComponent"] =
    ({ code, resourceName, type, loading }) => {
        const inputRef = React.useRef<HTMLInputElement>(null);
        const [visible, setVisible] = React.useState(false);

        if (loading) {
            return null;
        }

        if (visible) {
            return (
                <div
                    style={{
                        position: "fixed",
                        zIndex: 1000,
                        bottom: 0,
                        left: 0,
                        height: "100%",
                        maxHeight: "100%",
                        width: "100%",
                        padding: "16px",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            width: "100%",
                            maxWidth: "900px",
                            maxHeight: "90vh",
                            padding: "24px",
                            borderRadius: "8px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{ fontWeight: 700, fontSize: "22px" }}
                            >{`${prettyString(
                                type ?? "",
                            )} page for "${resourceName}" resource`}</div>
                            <div>
                                <button
                                    onClick={() => setVisible(false)}
                                    style={{
                                        border: "none",
                                        background: "none",
                                        fontWeight: "700",
                                        fontSize: "24px",
                                        cursor: "pointer",
                                    }}
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <button
                                onClick={() => {
                                    inputRef?.current?.select();
                                    inputRef?.current?.setSelectionRange(
                                        0,
                                        99999,
                                    );
                                    if (typeof navigator !== "undefined") {
                                        navigator.clipboard.writeText(
                                            inputRef?.current?.value ?? "",
                                        );
                                    }
                                }}
                                style={{
                                    display: "flex",
                                    padding: "8px 12px",
                                    borderRadius: "24px",
                                    height: "40px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 600,
                                    border: "none",
                                    backgroundColor: "white",
                                    cursor: "pointer",
                                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                                }}
                            >
                                Copy Code
                            </button>
                            <input
                                ref={inputRef}
                                type="text"
                                value={(code ?? "").replace(/\s{2}/g, "")}
                                id="myInput"
                                style={{
                                    width: 0,
                                    height: 0,
                                    opacity: 0,
                                    border: "none",
                                }}
                            />
                        </div>
                        <div
                            style={{
                                overflow: "scroll",
                                flex: 1,
                                borderRadius: "8px",
                            }}
                        >
                            <div
                                style={{
                                    maxHeight: "100%",
                                }}
                            >
                                <CodeHighlight code={code ?? ""} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div
                style={{
                    position: "sticky",
                    zIndex: 1000,
                    bottom: "0",
                    paddingBottom: "48px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <button
                    onClick={() => setVisible(true)}
                    style={{
                        display: "flex",
                        padding: "8px 12px",
                        borderRadius: "24px",
                        height: "40px",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        border: "none",
                        backgroundColor: "white",
                        cursor: "pointer",
                        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                    }}
                >
                    Show Code
                </button>
            </div>
        );
    };
