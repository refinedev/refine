import React from "react";
import { useRouter } from "next/router";
import { decompressFromEncodedURIComponent } from "lz-string";

type UseCodeReturn = {
    code: string | null;
    isReady: boolean;
    hasQuery: boolean;
    disableScroll: boolean;
};

export const useCode = (): UseCodeReturn => {
    const { query, isReady } = useRouter();
    const { code: compressed, disableScroll } = query ?? {};

    const code = React.useMemo(() => {
        if (!isReady) return "";
        if (!compressed) return "";
        return decompressFromEncodedURIComponent(compressed as string);
    }, [compressed, isReady]);

    return {
        code,
        isReady,
        hasQuery: !!compressed,
        disableScroll: !!disableScroll,
    };
};
