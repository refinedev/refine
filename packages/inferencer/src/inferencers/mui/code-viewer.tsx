import React from "react";
import { Button, Box, Modal, IconButton } from "@pankod/refine-mui";

import { prettierFormat } from "@/utilities";
import { CreateInferencerConfig } from "@/types";
import { CodeHighlight } from "@/components";
import { IconCode, IconMessageCircle, IconX, IconCopy } from "@tabler/icons";
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
            inputRef?.current?.setSelectionRange(0, 99999);
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
                    <Box sx={{ position: "fixed", bottom: 12, right: 60 }}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setVisible(true)}
                                startIcon={<IconCode size={18} />}
                                sx={{
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Show Code
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                component="a"
                                target="_blank"
                                href="https://github.com/refinedev/refine/issues"
                                startIcon={<IconMessageCircle size={18} />}
                                sx={{
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Give Feedback
                            </Button>
                        </Box>
                    </Box>
                    <Modal open={visible} onClose={() => setVisible(false)}>
                        <Box
                            sx={{
                                position: "absolute",
                                maxWidth: "800px",
                                width: "100%",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                boxShadow: 24,
                            }}
                        >
                            <IconButton
                                onClick={() => setVisible(false)}
                                disableRipple
                                sx={{
                                    position: "absolute",
                                    right: 0,
                                    top: 0,
                                    height: 56,
                                    width: 56,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <IconX size={18} style={{ color: "#666b7a" }} />
                            </IconButton>
                            <CodeHighlight code={code} />
                            <textarea
                                ref={inputRef}
                                defaultValue={(code ?? "").replace(
                                    /\\n/g,
                                    "\r\n",
                                )}
                                id="code-input"
                                style={{ display: "none" }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 12,
                                    right: 12,
                                }}
                            >
                                <Button
                                    key="copy"
                                    sx={{ textTransform: "capitalize" }}
                                    startIcon={<IconCopy size={18} />}
                                    variant="contained"
                                    size="small"
                                    onClick={copyCode}
                                >
                                    Copy Code
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                </>
            );
        }

        return null;
    };
