import React, { useEffect } from "react";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import { useLocation } from "@docusaurus/router";
import { PageMetadata } from "@docusaurus/theme-common";
import { useKeyboardNavigation } from "@docusaurus/theme-common/internal";
import ErrorPageContent from "@theme/ErrorPageContent";
import LayoutProvider from "@theme/Layout/Provider";
import SkipToContent from "@theme/SkipToContent";
import { LivePreviewProvider } from "../components/live-preview-context";
import clsx from "clsx";

type Props = {
  className?: string;
} & Record<string, any>;

export const CommonLayout = (props: Props) => {
  const { children, title, description, className } = props;

  useKeyboardNavigation();

  const location = useLocation();

  // it handles kapa ai widget visibility
  // kapa ai widget script initalized in docusaurus.config.js
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
      <PageMetadata title={title} description={description} />
      <SkipToContent />
      <div
        className={clsx(
          "main-wrapper",
          "min-h-[100dvh]",
          "flex flex-col",
          "dark:bg-gray-900 bg-gray-0",
          className,
        )}
      >
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          <LivePreviewProvider>{children}</LivePreviewProvider>
        </ErrorBoundary>
      </div>
    </LayoutProvider>
  );
};
