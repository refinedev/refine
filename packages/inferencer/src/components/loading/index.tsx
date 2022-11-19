import React from "react";
import { CreateInferencerConfig } from "@/types";

/**
 * Default Loading Component for Inferencer.
 */
export const LoadingComponent: CreateInferencerConfig["loadingComponent"] =
    () => {
        return <div style={{ padding: "24px" }}>Loading...</div>;
    };
