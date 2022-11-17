import React from "react";

import {
    Center,
    Alert,
    AlertIcon,
    AlertDescription,
} from "@pankod/refine-chakra-ui";

import { CreateGuesserConfig } from "@/types";

export const ErrorComponent: CreateGuesserConfig["errorComponent"] = ({
    error,
}) => {
    if (error) {
        return (
            <Center style={{ minHeight: 300 }}>
                <Alert
                    status="error"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                >
                    <AlertIcon boxSize="40px" mr={0} />

                    <AlertDescription mt={4} maxWidth="sm">
                        {error ?? ""}
                    </AlertDescription>
                </Alert>
            </Center>
        );
    }

    return null;
};
