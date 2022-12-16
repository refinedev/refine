import React, { useEffect, useMemo } from "react";
import clsx from "clsx";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import { PageMetadata, ThemeClassNames } from "@docusaurus/theme-common";
import { useKeyboardNavigation } from "@docusaurus/theme-common/internal";
import SkipToContent from "@theme/SkipToContent";
import AnnouncementBar from "@theme/AnnouncementBar";
import Navbar from "@theme/Navbar";
import Footer from "@theme/Footer";
import LayoutProvider from "@theme/Layout/Provider";
import ErrorPageContent from "@theme/ErrorPageContent";
import styles from "./styles.module.css";
import { LivePreviewProvider } from "../../components/live-preview-context";
import GithubFloatingCta from "../../components/github-floating-cta";
import { useLocation } from "@docusaurus/router";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useIsMobile from "../../hooks/use-is-mobile";

export default function Layout(props) {
    const {
        children,
        noFooter,
        wrapperClassName,
        // Not really layout-related, but kept for convenience/retro-compatibility
        title,
        description,
    } = props;
    useKeyboardNavigation();

    const location = useLocation();

    const isMobile = useIsMobile();

    console.log({ isMobile });

    const showGithubCta = useMemo(() => {
        if (typeof window !== "undefined" && !isMobile) {
            if (location.pathname.startsWith("/blog")) {
                window?.Intercom?.("update", { hide_default_launcher: true });
            } else {
                window?.Intercom?.("update", { hide_default_launcher: false });
            }
        }

        if (location.pathname.startsWith("/docs")) {
            return false;
        }

        return true;
    }, [location, isMobile]);

    useEffect(() => {
        if (isMobile) {
            window?.Intercom?.("update", { hide_default_launcher: true });
        }
    }, [isMobile]);

    return (
        <LayoutProvider>
            <PageMetadata title={title} description={description} />

            <SkipToContent />

            <AnnouncementBar />

            <Navbar />

            <div
                className={clsx(
                    ThemeClassNames.wrapper.main,
                    styles.mainWrapper,
                    wrapperClassName,
                )}
            >
                <ErrorBoundary
                    fallback={(params) => <ErrorPageContent {...params} />}
                >
                    <LivePreviewProvider>{children}</LivePreviewProvider>
                </ErrorBoundary>
            </div>

            {!noFooter && <Footer />}

            {showGithubCta && (
                <BrowserOnly>{() => <GithubFloatingCta />}</BrowserOnly>
            )}
        </LayoutProvider>
    );
}
