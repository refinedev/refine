import React from "react";
import { CreateInferencerConfig } from "@/types";

/**
 * Default Error Component for Inferencer.
 */
export const ErrorComponent: CreateInferencerConfig["errorComponent"] = ({
    error,
}) => {
    if (error) {
        return (
            <div>
                <pre>{error}</pre>
            </div>
        );
    }
    return null;
};
