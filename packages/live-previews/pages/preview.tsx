import React from "react";

import type { NextPage } from "next";
import { LivePreview, LiveProvider } from "react-live";

import Error from "@/pages/_error";
import { Loading } from "@/src/components/loading";
import { LiveError } from "@/src/components/live-error";

import { RefineScope } from "@/src/scope/live-scope";
import { replaceImports } from "@/src/utils/replace-imports";
import { useCode } from "@/src/utils/use-code";

const Preview: NextPage = () => {
    const { code: code, hasQuery, isReady, disableScroll } = useCode();

    if (isReady && !hasQuery) {
        return <Error statusCode={404} />;
    }

    if (isReady && hasQuery && !code) {
        return <Error statusCode={400} />;
    }

    if (
        isReady &&
        code &&
        (code?.includes("@pankod/refine-antd") || code?.includes("RefineAntd"))
    ) {
        if (typeof window !== "undefined") {
            const element = document.createElement("link");
            element.setAttribute("rel", "stylesheet");
            element.setAttribute(
                "href",
                "https://unpkg.com/@pankod/refine-antd/dist/styles.min.css",
            );
            document.head.appendChild(element);
        }
    }

    return (
        <>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <style jsx global>
                {`
                    body {
                        overflow: ${disableScroll
                            ? "hidden !important"
                            : "auto"};
                    }
                `}
            </style>
            <Loading loading={!isReady} />
            <LiveProvider
                scope={RefineScope}
                noInline
                code={replaceImports(code ?? "")}
            >
                <LiveError />
                <LivePreview />
            </LiveProvider>
        </>
    );
};

export default Preview;
