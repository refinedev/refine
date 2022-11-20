import React from "react";
import { Button, Row, Col, Modal, Icons } from "@pankod/refine-antd";

import { prettierFormat, prettyString } from "@/utilities";
import { CreateInferencerConfig } from "@/types";
import { CodeHighlight } from "@/components";
import { useNotification } from "@pankod/refine-core";

export const CodeViewerComponent: CreateInferencerConfig["codeViewerComponent"] =
    ({ code: rawCode, type, loading, resourceName }) => {
        const code = React.useMemo(() => {
            return prettierFormat(rawCode ?? "");
        }, [rawCode]);

        const inputRef = React.useRef<HTMLTextAreaElement>(null);

        const [visible, setVisible] = React.useState(false);

        const { open } = useNotification();

        if (loading) {
            return null;
        }

        const copyCode = () => {
            inputRef?.current?.select();
            inputRef?.current?.setSelectionRange(0, 99999);
            if (typeof navigator !== "undefined") {
                navigator.clipboard.writeText(inputRef?.current?.value ?? "");
                open?.({
                    type: "success",
                    message: "Copied to clipboard",
                });
            }
        };

        if (code) {
            return (
                <>
                    <Row
                        justify="center"
                        align="middle"
                        style={{ minHeight: "50px" }}
                    >
                        <Col>
                            <div
                                style={{
                                    margin: 0,
                                    position: "fixed",
                                    bottom: 0,
                                    right: "calc(40px + 10px)",
                                    padding: "10px",
                                    height: "calc(40px + 20px)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => setVisible(true)}
                                    icon={<Icons.CodeOutlined />}
                                >
                                    Show Code
                                </Button>
                                <Button
                                    type="default"
                                    target="_blank"
                                    href="https://github.com/refinedev/refine/issues"
                                    icon={<Icons.MessageOutlined />}
                                >
                                    Give Feedback
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Modal
                        width={800}
                        visible={visible}
                        title={prettyString(
                            `${resourceName} ${
                                type.charAt(0).toUpperCase() + type.slice(1)
                            } Code`,
                        )}
                        onCancel={() => setVisible(false)}
                        footer={[
                            <Button
                                key="copy"
                                type="primary"
                                icon={<Icons.CopyOutlined />}
                                onClick={copyCode}
                            >
                                Copy Code
                            </Button>,
                        ]}
                        bodyStyle={{ padding: "12px 16px" }}
                    >
                        <CodeHighlight code={code} />
                        <textarea
                            ref={inputRef}
                            defaultValue={(code ?? "").replace(/\\n/g, "\r\n")}
                            id="code-input"
                            aria-hidden="true"
                            style={{
                                padding: 0,
                                margin: 0,
                                width: 0,
                                height: 0,
                                opacity: 0,
                                border: "none",
                                display: "block",
                            }}
                        />
                    </Modal>
                </>
            );
        }

        return null;
    };
