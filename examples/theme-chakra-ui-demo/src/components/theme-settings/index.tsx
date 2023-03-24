import { useModal } from "@refinedev/core";
import { RefineThemes, RefineTheme } from "@refinedev/chakra-ui";
import {
    Button,
    HStack,
    Modal,
    ModalContent,
    ModalOverlay,
    useColorMode,
} from "@chakra-ui/react";
import { FC } from "react";

interface Props {
    onColorClick: (theme: RefineTheme) => void;
}

export const ThemeSettings: FC<Props> = ({ onColorClick }) => {
    const { toggleColorMode } = useColorMode();
    const { visible, show, close } = useModal();

    return (
        <div>
            {" "}
            <Button
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
                onClick={show}
            >
                Open Theme Settings
            </Button>
            <Modal isOpen={visible} onClose={close} size={"2xl"}>
                <ModalOverlay />
                <ModalContent p="4">
                    <HStack>
                        {Object.keys(RefineThemes).map((name) => {
                            const theme =
                                RefineThemes[name as keyof typeof RefineThemes];

                            return (
                                <Button
                                    p={8}
                                    key={name}
                                    onClick={() => {
                                        onColorClick(theme);
                                    }}
                                    bg={theme.colors?.brand[500]}
                                >
                                    {name}
                                </Button>
                            );
                        })}
                    </HStack>

                    <HStack justifyContent="center" pt={4}>
                        <Button onClick={toggleColorMode}>
                            Toggle Color Mode
                        </Button>
                    </HStack>
                </ModalContent>
            </Modal>
        </div>
    );
};
