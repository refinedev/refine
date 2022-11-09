import React from "react";
import {
    Affix,
    Card,
    Button,
    Row,
    Col,
    Modal,
    Icons,
} from "@pankod/refine-antd";

import { prettierFormat, prettyString } from "@/utilities";
import { CreateGuesserConfig } from "@/types";
import { CodeHighlight } from "@/components";

export const CodeViewerComponent: CreateGuesserConfig["codeViewerComponent"] =
    ({ code: rawCode, type, loading, resourceName }) => {
        const code = React.useMemo(() => {
            return prettierFormat(rawCode ?? "");
        }, [rawCode]);

        const inputRef = React.useRef<HTMLTextAreaElement>(null);

        const [visible, setVisible] = React.useState(false);

        if (loading) {
            return null;
        }

        const copyCode = () => {
            inputRef?.current?.select();
            inputRef?.current?.setSelectionRange(0, 99999);
            if (typeof navigator !== "undefined") {
                navigator.clipboard.writeText(inputRef?.current?.value ?? "");
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
                            <Affix offsetBottom={50}>
                                <Card
                                    style={{
                                        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                                        background: "white",
                                        borderRadius: 16,
                                    }}
                                    bodyStyle={{
                                        padding: "12px 4px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "12px",
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
                                        onClick={() => alert("not implemented")}
                                        icon={<Icons.MessageOutlined />}
                                    >
                                        Give Feedback
                                    </Button>
                                </Card>
                            </Affix>
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
                    >
                        <CodeHighlight code={code} />
                        <textarea
                            ref={inputRef}
                            defaultValue={(code ?? "").replace(/\\n/g, "\r\n")}
                            id="code-input"
                            style={{
                                padding: 0,
                                margin: 0,
                                width: 0,
                                height: 0,
                                opacity: 0,
                                border: "none",
                            }}
                        />
                    </Modal>
                </>
            );
        }

        return null;
    };
