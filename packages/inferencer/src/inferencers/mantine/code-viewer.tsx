import React from "react";
import {
    Affix,
    Button,
    Modal,
    Group,
    ActionIcon,
} from "@pankod/refine-mantine";
import { IconCode, IconMessageCircle, IconX, IconCopy } from "@tabler/icons";

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
                    <Affix position={{ bottom: 12, right: 60 }}>
                        <Group spacing="xs">
                            <Button
                                leftIcon={<IconCode size={18} />}
                                variant="filled"
                                color="primary"
                                onClick={() => setVisible(true)}
                            >
                                Show Code
                            </Button>
                            <Button
                                leftIcon={<IconMessageCircle size={18} />}
                                variant="default"
                                component="a"
                                target="_blank"
                                href="https://github.com/refinedev/refine/issues"
                            >
                                Give Feedback
                            </Button>
                        </Group>
                    </Affix>
                    <Modal
                        size={800}
                        opened={visible}
                        onClose={() => setVisible(false)}
                        styles={{
                            modal: {
                                padding: "0px !important",
                                borderRadius: 0,
                            },
                            header: { display: "none" },
                        }}
                    >
                        <ActionIcon
                            onClick={() => setVisible(false)}
                            variant="transparent"
                            sx={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                height: 56,
                                width: 56,
                            }}
                        >
                            <IconX size={18} style={{ color: "#666b7a" }} />
                        </ActionIcon>
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
                                display: "block",
                            }}
                        />
                        <Button
                            sx={{
                                position: "absolute",
                                bottom: 12,
                                right: 12,
                            }}
                            key="copy"
                            variant="default"
                            size="sm"
                            leftIcon={<IconCopy size={18} />}
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
