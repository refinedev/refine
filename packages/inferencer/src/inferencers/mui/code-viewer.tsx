import React from "react";
import {
    Button,
    Box,
    Modal,
    Typography,
    Stack,
    IconButton,
} from "@pankod/refine-mui";

import { prettierFormat, prettyString } from "@/utilities";
import { CreateInferencerConfig } from "@/types";
import { CodeHighlight } from "@/components";
import { IconCode, IconMessageCircle, IconX } from "@tabler/icons";
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
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: 50,
                        }}
                    >
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
                                bgcolor: "background.paper",
                                boxShadow: 24,
                                borderRadius: 1,
                                px: 3,
                                py: 2,
                            }}
                        >
                            <Stack gap={1}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        flexWrap: "nowrap",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: "4px",
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="bold">
                                        {prettyString(
                                            `${resourceName} ${
                                                type.charAt(0).toUpperCase() +
                                                type.slice(1)
                                            } Code`,
                                        )}
                                    </Typography>
                                    <IconButton
                                        onClick={() => setVisible(false)}
                                    >
                                        <IconX size={18} />
                                    </IconButton>
                                </div>
                                <CodeHighlight code={code} />
                                <textarea
                                    ref={inputRef}
                                    defaultValue={(code ?? "").replace(
                                        /\\n/g,
                                        "\r\n",
                                    )}
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
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Button
                                        key="copy"
                                        variant="contained"
                                        onClick={copyCode}
                                    >
                                        Copy Code
                                    </Button>
                                </div>
                            </Stack>
                        </Box>
                    </Modal>
                </>
            );
        }

        return null;
    };
