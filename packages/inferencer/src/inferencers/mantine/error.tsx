import React from "react";

import { Alert, Center } from "@pankod/refine-mantine";
import { IconAlertCircle } from "@tabler/icons";

import { CreateInferencerConfig } from "@/types";

export const ErrorComponent: CreateInferencerConfig["errorComponent"] = ({
    error,
}) => {
    if (error) {
        return (
            <Center style={{ minHeight: 300 }}>
                <Alert title="Error" color="red" icon={<IconAlertCircle />}>
                    {error ?? ""}
                </Alert>
            </Center>
        );
    }

    return null;
};
