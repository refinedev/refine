import React from "react";
import { CreateGuesserConfig } from "@/types";

/**
 * Default Error Component for Guesser.
 */
export const ErrorComponent: CreateGuesserConfig["errorComponent"] = ({
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
