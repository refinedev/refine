import React from "react";
import { Button, Fab, Box, Modal, Typography, Stack } from "@pankod/refine-mui";

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
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: 50,
                        }}
                    >
                        <Box sx={{ position: "fixed", bottom: 50 }}>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Fab
                                    variant="extended"
                                    color="primary"
                                    onClick={() => setVisible(true)}
                                    sx={{
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Show Code
                                </Fab>
                                <Fab
                                    variant="extended"
                                    color="secondary"
                                    onClick={() => setVisible(true)}
                                    sx={{
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Give Feedback
                                </Fab>
                            </Box>
                        </Box>
                    </Box>
                    <Modal
                        // width={800}
                        open={visible}
                        onClose={() => setVisible(false)}
                    >
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
                                borderRadius: 4,
                                p: 4,
                            }}
                        >
                            <Stack gap={1}>
                                <Typography variant="h5" fontWeight="bold">
                                    {prettyString(
                                        `${resourceName} ${
                                            type.charAt(0).toUpperCase() +
                                            type.slice(1)
                                        } Code`,
                                    )}
                                </Typography>
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
                                <Button
                                    key="copy"
                                    variant="contained"
                                    onClick={copyCode}
                                >
                                    Copy Code
                                </Button>
                            </Stack>
                        </Box>
                    </Modal>
                </>
            );
        }

        return null;
    };
