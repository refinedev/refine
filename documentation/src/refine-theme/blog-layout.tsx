import React, { useEffect, useState } from "react";
import { CommonLayout } from "./common-layout";
import { CommonHeader } from "./common-header";
import { BlogFooter } from "./blog-footer";
import clsx from "clsx";
import { BannerSidebar } from "../components/banner/banner-sidebar";
import { BannerModal } from "../components/banner/banner-modal";
import useScrollTracker from "../hooks/use-scroll-tracker";
import { BlogHero } from "./blog-hero";

type Props = {
  showSidebarBanner?: boolean;
  showHero?: boolean;
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
    <CommonLayout
      {...layoutProps}
      className={clsx("bg-white dark:bg-refine-react-8")}
    >
      {/* If there's TOC, then we can say that this is a blog post page. */}
      {/* Then we can pass `trackProgress` prop to the header. */}
      <CommonHeader
        hasSticky={true}
        trackProgress={!!toc}
        variant="blog"
        className={clsx(
          "!bg-white dark:!bg-refine-react-8",
          "!bg-opacity-100 dark:!bg-opacity-100",
        )}
      />
      {props.showHero && <BlogHero />}
      <div
        className={clsx(
          "flex",
          "gap-12",
          "justify-center",
          "mx-auto",
          "w-full",
          "relative",
        )}
      >
        {showSidebarBanner && (
          <div
            className={clsx(
              "relative",
              "py-10 blog-sm:py-12 blog-md:py-16",
              "hidden blog-2xl:block",
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
                "ml-auto",
              )}
            >
              <BannerSidebar shouldShowBanner={shouldShowBanner} />
            </div>
          </div>
        )}
        <div className={clsx("refine-prose")}>{children}</div>
        {toc && (
          <div
            className={clsx(
              "w-[280px]",
              "hidden blog-max:block",
              "flex-shrink-0",
            )}
          >
            {toc}
          </div>
        )}
      </div>
      <BlogFooter variant="blog" />
      <BannerModal />
    </CommonLayout>
  );
};
