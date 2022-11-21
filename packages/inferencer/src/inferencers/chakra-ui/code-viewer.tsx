import React from "react";
import {
    Box,
    Button,
    Modal,
    HStack,
    useDisclosure,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from "@pankod/refine-chakra-ui";
import { IconCode, IconMessageCircle, IconCopy } from "@tabler/icons";

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

        const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <Box position="fixed" bottom="12px" right="60px">
                        <HStack spacing={4}>
                            <Button
                                variant="solid"
                                colorScheme="green"
                                leftIcon={<IconCode size={18} />}
                                onClick={onOpen}
                            >
                                Show Code
                            </Button>
                            <Button
                                colorScheme="gray"
                                variant="solid"
                                leftIcon={<IconMessageCircle size={18} />}
                                as="a"
                                target="_blank"
                                href="https://github.com/refinedev/refine/issues"
                            >
                                Give Feedback
                            </Button>
                        </HStack>
                    </Box>
                    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalCloseButton
                                sx={{
                                    position: "absolute",
                                    right: 0,
                                    top: 0,
                                    height: "56px",
                                    width: "56px",
                                    color: "#666b7a",
                                }}
                            />
                            <ModalBody sx={{ padding: 0 }}>
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
                                        display: "block",
                                    }}
                                />
                            </ModalBody>
                            <Button
                                sx={{
                                    position: "absolute",
                                    bottom: "12px",
                                    right: "12px",
                                }}
                                key="copy"
                                size="sm"
                                leftIcon={<IconCopy size={18} />}
                                onClick={copyCode}
                            >
                                Copy Code
                            </Button>
                        </ModalContent>
                    </Modal>
                </>
            );
        }

        return null;
    };
