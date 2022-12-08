import React from "react";

import type { NextPage } from "next";
import { LivePreview, LiveProvider } from "@aliemir/react-live";

import Error from "@/pages/_error";
import { Loading } from "@/src/components/loading";
import { LiveError } from "@/src/components/live-error";

import { RefineCommonScope } from "@/src/scope/common";
import { replaceImports } from "@/src/utils/replace-imports";
import { useCode } from "@/src/utils/use-code";

const Preview: NextPage = () => {
    const [ready, setReady] = React.useState(false);
    const { code: code, hasQuery, isReady, disableScroll } = useCode();
    const [scope, setScope] = React.useState({ ...RefineCommonScope });
    const [scopeSettled, setScopeSettled] = React.useState(false);

    const scopeResolver = React.useCallback(async () => {
        if (code && hasQuery && isReady && !scopeSettled) {
            const isAntd =
                code.includes("@pankod/refine-antd") ||
                code.includes("RefineAntd");
            const isMui =
                code.includes("@pankod/refine-mui") ||
                code.includes("RefineMui");
            const isMantine =
                code.includes("@pankod/refine-mantine") ||
                code.includes("RefineMantine");
            const isChakra =
                code.includes("@pankod/refine-chakra-ui") ||
                code.includes("RefineChakra");
            const isAntdInferencer =
                code.includes("@pankod/refine-inferencer/antd") ||
                code.includes("RefineAntdInferencer");
            const isMuiInferencer =
                code.includes("@pankod/refine-inferencer/mui") ||
                code.includes("RefineMuiInferencer");
            const isMantineInferencer =
                code.includes("@pankod/refine-inferencer/mantine") ||
                code.includes("RefineMantineInferencer");
            const isChakraInferencer =
                code.includes("@pankod/refine-inferencer/chakra-ui") ||
                code.includes("RefineChakraInferencer");

            const antdScope = isAntd
                ? (await import("../src/scope/antd")).default
                : {};
            const muiScope = isMui
                ? (await import("../src/scope/mui")).default
                : {};
            const mantineScope = isMantine
                ? (await import("../src/scope/mantine")).default
                : {};
            const chakraScope = isChakra
                ? (await import("../src/scope/chakra")).default
                : {};
            const antdInferencerScope = isAntdInferencer
                ? (await import("../src/scope/antd-inferencer")).default
                : {};
            const muiInferencerScope = isMuiInferencer
                ? (await import("../src/scope/mui-inferencer")).default
                : {};
            const mantineInferencerScope = isMantineInferencer
                ? (await import("../src/scope/mantine-inferencer")).default
                : {};
            const chakraInferencerScope = isChakraInferencer
                ? (await import("../src/scope/chakra-inferencer")).default
                : {};

            setScope({
                ...RefineCommonScope,
                ...antdScope,
                ...muiScope,
                ...mantineScope,
                ...chakraScope,
                ...antdInferencerScope,
                ...muiInferencerScope,
                ...mantineInferencerScope,
                ...chakraInferencerScope,
            });
            setScopeSettled(true);
        }
    }, [code, hasQuery, isReady, scopeSettled]);

    React.useEffect(() => {
        scopeResolver();
    }, [scopeResolver]);

    if (isReady && !hasQuery) {
        return <Error statusCode={404} />;
    }

    if (isReady && hasQuery && !code) {
        return <Error statusCode={400} />;
    }

    if (isReady && code && typeof window !== "undefined" && !ready) {
        if (
            code?.includes("@pankod/refine-antd") ||
            code?.includes("RefineAntd")
        ) {
            const element = document.createElement("link");
            element.setAttribute("rel", "stylesheet");
            element.onload = () => {
                setTimeout(() => {
                    setReady(true);
                }, 300);
            };
            element.setAttribute(
                "href",
                "https://unpkg.com/@pankod/refine-antd/dist/styles.min.css",
            );
            document.head.appendChild(element);
        } else {
            setReady(true);
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
            <Loading loading={!ready || !scopeSettled} />
            {ready && scopeSettled && (
                <LiveProvider
                    scope={scope}
                    noInline
                    code={replaceImports(code ?? "")}
                >
                    <LiveError />
                    <LivePreview />
                </LiveProvider>
            )}
        </>
    );
};

export default Preview;
