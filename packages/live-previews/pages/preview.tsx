import React from "react";

import type { NextPage } from "next";
import { LivePreview, LiveProvider } from "@aliemir/react-live";

import Error from "@/pages/_error";
import { Loading } from "@/src/components/loading";
import { LiveError } from "@/src/components/live-error";

import { RefineCommonScope } from "@/src/scope/common";
import { replaceImports } from "@/src/utils/replace-imports";
import { useCode } from "@/src/utils/use-code";
import { checkPackage } from "@/src/utils/check-package";

const Preview: NextPage = () => {
    const [ready, setReady] = React.useState(false);
    const { code, css, hasQuery, isReady, disableScroll, useTailwind } =
        useCode();
    const [scope, setScope] = React.useState({ ...RefineCommonScope });
    const [scopeSettled, setScopeSettled] = React.useState(false);

    const scopeResolver = React.useCallback(async () => {
        if (code && hasQuery && isReady && !scopeSettled) {
            const usedPackages = checkPackage(code);

            const antdScope = usedPackages.has("antd")
                ? (await import("../src/scope/antd")).default
                : {};
            const muiScope = usedPackages.has("mui")
                ? (await import("../src/scope/mui")).default
                : {};
            const mantineScope = usedPackages.has("mantine")
                ? (await import("../src/scope/mantine")).default
                : {};
            const chakraScope = usedPackages.has("chakra")
                ? (await import("../src/scope/chakra")).default
                : {};
            const antdInferencerScope = usedPackages.has("antd-inferencer")
                ? (await import("../src/scope/antd-inferencer")).default
                : {};
            const muiInferencerScope = usedPackages.has("mui-inferencer")
                ? (await import("../src/scope/mui-inferencer")).default
                : {};
            const mantineInferencerScope = usedPackages.has(
                "mantine-inferencer",
            )
                ? (await import("../src/scope/mantine-inferencer")).default
                : {};
            const chakraInferencerScope = usedPackages.has("chakra-inferencer")
                ? (await import("../src/scope/chakra-inferencer")).default
                : {};
            const headlessInferencerScope = usedPackages.has(
                "headless-inferencer",
            )
                ? (await import("../src/scope/headless-inferencer")).default
                : {};

            const i18Scope = usedPackages.has("i18n")
                ? (await import("../src/scope/i18n")).default
                : {};

            const tablerScope = usedPackages.has("tabler-icons")
                ? (await import("../src/scope/tabler-icons")).default
                : {};

            const kbarScope = usedPackages.has("kbar")
                ? (await import("../src/scope/kbar")).default
                : {};

            const airtableScope = usedPackages.has("airtable")
                ? (await import("../src/scope/airtable")).default
                : {};

            const appwriteScope = usedPackages.has("appwrite")
                ? (await import("../src/scope/appwrite")).default
                : {};

            const hasuraScope = usedPackages.has("hasura")
                ? (await import("../src/scope/hasura")).default
                : {};

            const nestjsxScope = usedPackages.has("nestjsx-crud")
                ? (await import("../src/scope/nestjsx")).default
                : {};

            const strapiV4Scope = usedPackages.has("strapi-v4")
                ? (await import("../src/scope/strapi-v4")).default
                : {};

            const supabaseScope = usedPackages.has("supabase")
                ? (await import("../src/scope/supabase")).default
                : {};

            const axiosScope = usedPackages.has("axios")
                ? (await import("../src/scope/axios")).default
                : {};

            const auth0Scope = usedPackages.has("auth0")
                ? (await import("../src/scope/auth0")).default
                : {};

            const keycloakScope = usedPackages.has("keycloak")
                ? (await import("../src/scope/keycloak")).default
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
                ...headlessInferencerScope,
                ...kbarScope,
                ...airtableScope,
                ...appwriteScope,
                ...hasuraScope,
                ...nestjsxScope,
                ...strapiV4Scope,
                ...supabaseScope,
                ...axiosScope,
                ...auth0Scope,
                ...keycloakScope,
                ...tablerScope,
                ...i18Scope,
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
        const pkgs = checkPackage(code);

        const hasAntd = pkgs.has("antd") || pkgs.has("antd-inferencer");

        if (hasAntd || useTailwind) {
            if (hasAntd) {
                const element = document.createElement("link");
                element.setAttribute("rel", "stylesheet");
                element.onload = () => {
                    setTimeout(() => {
                        setReady(true);
                    }, 300);
                };
                element.setAttribute(
                    "href",
                    "https://unpkg.com/antd/dist/reset.css",
                );
                document.head.appendChild(element);
            }
            if (useTailwind) {
                const element = document.createElement("script");
                element.setAttribute("defer", "true");
                element.onload = () => {
                    setTimeout(() => {
                        setReady(true);
                    }, 300);
                };
                element.setAttribute("src", "https://cdn.tailwindcss.com");
                document.head.appendChild(element);
            }
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
                    ${css ?? ""}
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
