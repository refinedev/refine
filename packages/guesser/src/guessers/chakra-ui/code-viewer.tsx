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
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@pankod/refine-chakra-ui";
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

        const { isOpen, onOpen, onClose } = useDisclosure();

        if (loading) {
            return null;
        }

        const copyCode = () => {
            inputRef?.current?.select();
            inputRef?.current?.setSelectionRange(0, Number.MAX_SAFE_INTEGER);
            if (typeof navigator !== "undefined") {
                navigator.clipboard.writeText(inputRef?.current?.value ?? "");
            }
        };

        if (code) {
            return (
                <>
                    <Box position="fixed" bottom="12px" right="60px">
                        <HStack spacing={4}>
                            <Button
                                leftIcon={<IconCode size={18} />}
                                onClick={onOpen}
                            >
                                Show Code
                            </Button>
                            <Button
                                leftIcon={<IconMessageCircle size={18} />}
                                onClick={() => alert("not implemented")}
                            >
                                Give Feedback
                            </Button>
                        </HStack>
                    </Box>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                {prettyString(
                                    `${resourceName} ${
                                        type.charAt(0).toUpperCase() +
                                        type.slice(1)
                                    } Code`,
                                )}
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
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
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    key="copy"
                                    leftIcon={<IconCopy size={18} />}
                                    onClick={copyCode}
                                >
                                    Copy Code
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            );
        }

        return null;
    };
