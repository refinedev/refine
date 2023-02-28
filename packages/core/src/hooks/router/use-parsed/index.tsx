import React from "react";
import { useParse } from "../use-parse";

export const useParsed = () => {
    const parse = useParse();

    const parsed = React.useMemo(() => parse(), [parse]);

    return parsed;
};
