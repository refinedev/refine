import React from "react";

import { LoadingOverlay } from "@pankod/refine-mantine";

import { CreateGuesserConfig } from "@/types";

export const LoadingComponent: CreateGuesserConfig["loadingComponent"] = () => {
    return <LoadingOverlay visible />;
};
