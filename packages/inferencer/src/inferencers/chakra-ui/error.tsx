import React from "react";

import { Center, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

import { CreateInferencerConfig } from "@/types";

export const ErrorComponent: CreateInferencerConfig["errorComponent"] = ({
    error,
}) => {
    if (error) {
        return (
            <Center style={{ minHeight: 300 }}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore chakra-ui and typescript conflict */}
                <Alert
                    status="error"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                    maxWidth="700px"
                >
                    <AlertIcon boxSize="40px" mr={0} />

                    <AlertDescription mt={4} maxWidth="sm">
                        <div
                            dangerouslySetInnerHTML={{ __html: error ?? "" }}
                        />
                    </AlertDescription>
                </Alert>
            </Center>
        );
    }

    return null;
};
