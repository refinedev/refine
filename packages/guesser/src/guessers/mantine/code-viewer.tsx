import React from "react";
import { Affix, Button, Modal, Group, Title } from "@pankod/refine-mantine";
import { IconCode, IconMessageCircle, IconCopy } from "@tabler/icons";

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
                    <Affix
                        position={{
                            bottom: 12,
                            right: 60,
                        }}
                    >
                        <Group spacing="xs">
                            <Button
                                leftIcon={<IconCode size={18} />}
                                variant="default"
                                onClick={() => setVisible(true)}
                            >
                                Show Code
                            </Button>
                            <Button
                                leftIcon={<IconMessageCircle size={18} />}
                                variant="default"
                                onClick={() => alert("not implemented")}
                            >
                                Give Feedback
                            </Button>
                        </Group>
                    </Affix>
                    <Modal
                        size={800}
                        opened={visible}
                        title={
                            <Title order={4}>
                                {prettyString(
                                    `${resourceName} ${
                                        type.charAt(0).toUpperCase() +
                                        type.slice(1)
                                    } Code`,
                                )}
                            </Title>
                        }
                        onClose={() => setVisible(false)}
                        styles={{ header: { marginBottom: 4 } }}
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
                        <Group position="right">
                            <Button
                                key="copy"
                                variant="default"
                                leftIcon={<IconCopy size={18} />}
                                onClick={copyCode}
                            >
                                Copy Code
                            </Button>
                        </Group>
                    </Modal>
                </>
            );
        }

        return null;
    };
