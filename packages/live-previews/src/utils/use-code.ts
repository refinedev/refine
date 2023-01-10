import React from "react";
import { useRouter } from "next/router";
import { decompressFromEncodedURIComponent } from "lz-string";
import base64url from "base64url";

type UseCodeReturn = {
    code: string | null;
    css: string | null;
    isReady: boolean;
    hasQuery: boolean;
    disableScroll: boolean;
    useTailwind: boolean;
};

export const useCode = (): UseCodeReturn => {
    const { query, isReady } = useRouter();
    const {
        code: compressed,
        disableScroll,
        tailwind,
        css: cssCompressed,
    } = query ?? {};

    const code = React.useMemo(() => {
        if (!isReady) return "";
        if (!compressed) return "";
        return decompressFromEncodedURIComponent(compressed as string);
    }, [compressed, isReady]);

    const css = React.useMemo(() => {
        if (!isReady) return "";
        if (!cssCompressed) return "";
        try {
            return base64url.decode(cssCompressed as string);
        } catch (err) {
            console.log("CSS Decode Error", { err });
            return "";
        }
    }, [cssCompressed, isReady]);

    return {
        code,
        css,
        isReady,
        hasQuery: !!compressed,
        disableScroll: !!disableScroll,
        useTailwind: !!tailwind,
    };
};
