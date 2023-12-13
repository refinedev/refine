import React, { useEffect, useState } from "react";
import { CommonLayout } from "./common-layout";
import { CommonHeader } from "./common-header";
import { BlogFooter } from "./blog-footer";
import clsx from "clsx";
import { BannerSidebar } from "../components/banner/banner-sidebar";
import { BannerModal } from "../components/banner/banner-modal";
import useScrollTracker from "../hooks/use-scroll-tracker";

type Props = {
    showSidebarBanner?: boolean;
} & Record<string, any>;

export const RefineBlogLayout = (props: Props) => {
    const [shouldShowBanner, setShouldShowBanner] = useState(false);
    const { children, toc, showSidebarBanner = true, ...layoutProps } = props;

    const tracker = useScrollTracker();

    useEffect(() => {
        if (!showSidebarBanner) return;

        if (tracker.scrollY > 20) {
            setShouldShowBanner(true);
        }

        if (tracker.scrollY < 20) {
            setShouldShowBanner(false);
        }
    }, [tracker.scrollY, showSidebarBanner]);

    return (
        <CommonLayout {...layoutProps}>
            {/* If there's TOC, then we can say that this is a blog post page. */}
            {/* Then we can pass `trackProgress` prop to the header. */}
            <CommonHeader hasSticky={true} trackProgress={!!toc} />
            <div
                className={clsx(
                    "flex",
                    "justify-center",
                    "mx-auto",
                    "max-w-screen-blog-max",
                    "w-full",
                )}
            >
                {showSidebarBanner && (
                    <div
                        className={clsx(
                            "relative",
                            "w-[264px]",
                            "pl-4",
                            "py-10 blog-sm:py-12 blog-md:py-16",
                            "hidden xl:block",
                            shouldShowBanner && "opacity-100",
                            !shouldShowBanner && "opacity-0",
                            "transition-opacity duration-300 ease-in-out",
                        )}
                    >
                        <div
                            className={clsx(
                                "sticky",
                                "w-[264px]",
                                "z-[1]",
                                "top-32",
                                "left-0",
                            )}
                        >
                            <BannerSidebar
                                shouldShowBanner={shouldShowBanner}
                            />
                        </div>
                    </div>
                )}
                <div
                    className={clsx(
                        "refine-prose",
                        "flex-1",
                        "min-w-0",
                        "xl:px-8",
                    )}
                >
                    {children}
                </div>
                {toc && (
                    <div
                        className={clsx(
                            "w-[280px]",
                            "hidden blog-md:block",
                            "flex-shrink-0",
                        )}
                    >
                        {toc}
                    </div>
                )}
            </div>
            <BlogFooter />
            <BannerModal />
        </CommonLayout>
    );
};
