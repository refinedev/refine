import React from "react";
import { Button, Modal, Icons, Space } from "@pankod/refine-antd";

import { prettierFormat } from "@/utilities";
import { CreateInferencerConfig } from "@/types";
import { CodeHighlight } from "@/components";
import { useNotification } from "@pankod/refine-core";

export const CodeViewerComponent: CreateInferencerConfig["codeViewerComponent"] =
    ({ code: rawCode, loading }) => {
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
            inputRef?.current?.setSelectionRange(0, Number.MAX_SAFE_INTEGER);
            if (typeof navigator !== "undefined") {
                navigator.clipboard.writeText(inputRef?.current?.value ?? "");
                open?.({
                    key: "copy",
                    type: "success",
                    message: "Copied to clipboard",
                });
            }
        };

        if (code) {
            return (
                <>
                    <div style={{ position: "fixed", bottom: 12, right: 60 }}>
                        <Space>
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
                        </Space>
                    </div>
                    <Modal
                        width={800}
                        visible={visible}
                        onCancel={() => setVisible(false)}
                        closeIcon={
                            <Icons.CloseOutlined style={{ color: "#666b7a" }} />
                        }
                        footer={null}
                        bodyStyle={{ padding: 0 }}
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
                        <Button
                            style={{
                                position: "absolute",
                                bottom: 12,
                                right: 12,
                            }}
                            key="copy"
                            type="default"
                            icon={<Icons.CopyOutlined />}
                            onClick={copyCode}
                        >
                            Copy Code
                        </Button>
                    </Modal>
                </>
            );
        }

        return null;
    };
