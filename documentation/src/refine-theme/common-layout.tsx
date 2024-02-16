import React, { useEffect } from "react";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import { useLocation } from "@docusaurus/router";
import { PageMetadata } from "@docusaurus/theme-common";
import { useKeyboardNavigation } from "@docusaurus/theme-common/internal";
import ErrorPageContent from "@theme/ErrorPageContent";
import LayoutProvider from "@theme/Layout/Provider";
import SkipToContent from "@theme/SkipToContent";
import Head from "@docusaurus/Head";
import { LivePreviewProvider } from "../components/live-preview-context";
import useIsMobile from "../hooks/use-is-mobile";
import clsx from "clsx";
import { VideoModal15K } from "../components/video-modal-15k";

declare global {
    interface Window {
        Intercom: any;
    }
}

export const CommonLayout = (props: any) => {
    const { children, title, description } = props;

    useKeyboardNavigation();

    const location = useLocation();

    const isMobile = useIsMobile();

    React.useEffect(() => {
        if (typeof window !== "undefined" && !isMobile) {
            if (
                location.pathname.startsWith("/blog") ||
                location.pathname.startsWith("/")
            ) {
                window?.Intercom?.("update", { hide_default_launcher: true });
            } else {
                window?.Intercom?.("update", { hide_default_launcher: false });
            }
        }
    }, [location, isMobile]);

    useEffect(() => {
        if (isMobile) {
            window?.Intercom?.("update", { hide_default_launcher: true });
        }
    }, [isMobile]);

    useEffect(() => {
        const kapaAIWidget = document.getElementById("kapa-widget-container");
        if (!kapaAIWidget) {
            return;
        }

        if (location.pathname.startsWith("/docs")) {
            kapaAIWidget.style.display = "block";
        } else {
            kapaAIWidget.style.display = "none";
        }
    }, [location.pathname]);

    return (
        <LayoutProvider>
            <Head>
                <script
                    async={true}
                    src="https://widget.kapa.ai/kapa-widget.bundle.js"
                    data-website-id="fa91d75a-5c82-4272-a893-a21d92245578"
                    data-project-logo="https://refine.ams3.cdn.digitaloceanspaces.com/assets/refine-ai-bot-logo.png"
                    data-project-name="Refine"
                    data-project-color="#303450"
                    data-modal-image="https://refine.ams3.cdn.digitaloceanspaces.com/assets/refine-white-icon.png"
                    data-modal-header-bg-color="#303450"
                    data-modal-title-color="#ffffff"
                    data-button-border-radius="100%"
                    data-button-text-font-size="0px"
                    data-button-text-color="#303450"
                    data-button-bg-color="transparent"
                    data-button-text=""
                    data-button-box-shadow="none"
                    data-button-image-height="60px"
                    data-button-image-width="60px"
                    data-modal-title=""
                />
            </Head>
            <PageMetadata title={title} description={description} />
            <SkipToContent />
            <div
                className={clsx(
                    "main-wrapper",
                    "min-h-[100dvh]",
                    "flex flex-col",
                    "dark:bg-gray-900 bg-gray-0",
                )}
            >
                <ErrorBoundary
                    fallback={(params) => <ErrorPageContent {...params} />}
                >
                    <LivePreviewProvider>{children}</LivePreviewProvider>
                </ErrorBoundary>
                <VideoModal15K />
            </div>
        </LayoutProvider>
    );
};
