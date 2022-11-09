import React from "react";
import { CreateGuesserConfig } from "@/types";

/**
 * Default Loading Component for Guesser.
 */
export const LoadingComponent: CreateGuesserConfig["loadingComponent"] = () => {
    return <div style={{ padding: "24px" }}>Loading...</div>;
};
