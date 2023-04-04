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

            const callbacks: (() => Promise<{}>)[] = [
                async () =>
                    usedPackages.has("antd")
                        ? (await import("../src/scope/antd")).default
                        : {},
                async () =>
                    usedPackages.has("mui")
                        ? (await import("../src/scope/mui")).default
                        : {},
                async () =>
                    usedPackages.has("mantine")
                        ? (await import("../src/scope/mantine")).default
                        : {},
                async () =>
                    usedPackages.has("chakra")
                        ? (await import("../src/scope/chakra")).default
                        : {},
                async () =>
                    usedPackages.has("antd-inferencer")
                        ? (await import("../src/scope/antd-inferencer")).default
                        : {},
                async () =>
                    usedPackages.has("mui-inferencer")
                        ? (await import("../src/scope/mui-inferencer")).default
                        : {},
                async () =>
                    usedPackages.has("mantine-inferencer")
                        ? (await import("../src/scope/mantine-inferencer"))
                              .default
                        : {},
                async () =>
                    usedPackages.has("chakra-inferencer")
                        ? (await import("../src/scope/chakra-inferencer"))
                              .default
                        : {},
                async () =>
                    usedPackages.has("headless-inferencer")
                        ? (await import("../src/scope/headless-inferencer"))
                              .default
                        : {},
                async () =>
                    usedPackages.has("react-dom")
                        ? (await import("../src/scope/react-dom")).default
                        : {},
                async () =>
                    usedPackages.has("web-vitals")
                        ? (await import("../src/scope/web-vitals")).default
                        : {},
                async () =>
                    usedPackages.has("i18n")
                        ? (await import("../src/scope/i18n")).default
                        : {},
                async () =>
                    usedPackages.has("tabler-icons")
                        ? (await import("../src/scope/tabler-icons")).default
                        : {},
                async () =>
                    usedPackages.has("kbar")
                        ? (await import("../src/scope/kbar")).default
                        : {},
                async () =>
                    usedPackages.has("airtable")
                        ? (await import("../src/scope/airtable")).default
                        : {},
                async () =>
                    usedPackages.has("appwrite")
                        ? (await import("../src/scope/appwrite")).default
                        : {},
                async () =>
                    usedPackages.has("hasura")
                        ? (await import("../src/scope/hasura")).default
                        : {},
                async () =>
                    usedPackages.has("nestjsx-crud")
                        ? (await import("../src/scope/nestjsx")).default
                        : {},
                async () =>
                    usedPackages.has("strapi-v4")
                        ? (await import("../src/scope/strapi-v4")).default
                        : {},
                async () =>
                    usedPackages.has("supabase")
                        ? (await import("../src/scope/supabase")).default
                        : {},
                async () =>
                    usedPackages.has("axios")
                        ? (await import("../src/scope/axios")).default
                        : {},
                async () =>
                    usedPackages.has("auth0")
                        ? (await import("../src/scope/auth0")).default
                        : {},
                async () =>
                    usedPackages.has("keycloak")
                        ? (await import("../src/scope/keycloak")).default
                        : {},
            ];

            if (code.includes("React.createElement(GoogleButton,")) {
                callbacks.push(
                    async () => (await import("../src/scope/google")).default,
                );
            }

            let scopesToUse: Record<string, any> = {};

            const resolvedScopes = await Promise.all(
                callbacks.map((cb) => cb()),
            );

            resolvedScopes.forEach((scope) => {
                scopesToUse = {
                    ...scopesToUse,
                    ...scope,
                };
            });

            setScope({
                ...RefineCommonScope,
                ...scopesToUse,
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
                    "https://refine.ams3.cdn.digitaloceanspaces.com/antd%2Fdist%2Freset.css",
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
