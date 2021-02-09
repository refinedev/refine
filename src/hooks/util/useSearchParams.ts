import React from "react";

export const useSearchParams = (): Record<string, string> => {
    const [searchParams] = React.useState(
        new URLSearchParams(
            (typeof window !== "undefined"
                ? window
                : undefined
            )?.location.search,
        ),
    );

    const parsed = {};

    for (const pair of searchParams.entries()) {
        parsed[pair[0]] = pair[1];
    }

    return parsed;
};
