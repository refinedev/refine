import React from "react";
import { CommonLayout } from "./common-layout";
import { BlogHeader } from "./blog-header";
import { BlogFooter } from "./blog-footer";
import clsx from "clsx";
import { BlogHero } from "./blog-hero";

type Props = {
  showHero?: boolean;
} & Record<string, any>;

export const RefineBlogLayout = (props: Props) => {
  const { children, toc, ...layoutProps } = props;

  return (
    <CommonLayout
      {...layoutProps}
      className={clsx("relative", "bg-zinc-100", "dark:bg-zinc-900")}
    >
      <BlogHeader trackProgress={Boolean(toc)} />
      {props.showHero && <BlogHero />}
      <div className={clsx("relative", "flex-1")}>
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
          <div className={clsx("refine-prose", "w-full", "min-w-0", "flex-1")}>
            {children}
          </div>
          {toc && (
            <div className={clsx("hidden blog-max:block", "flex-shrink-0")}>
              {toc}
            </div>
          )}
        </div>
      </div>
      {/* <BannerModal /> */}
      <BlogFooter />
    </CommonLayout>
  );
};
