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
      className={clsx(
        "relative",
        toc && "!bg-zinc-50",
        !toc && "!bg-zinc-100",
        "dark:!bg-zinc-900",
      )}
    >
      <BlogHeader trackProgress={Boolean(toc)} />
      {props.showHero && <BlogHero />}
      <div className={clsx("relative", "flex-1")}>
        <div
          className={clsx(
            "flex",
            "justify-center",
            "blog-max:justify-between",
            "mx-auto",
            "relative",
            "w-full",
            "blog-max:px-3",
            "blog-sm:max-w-[560px]",
            "blog-md:max-w-[672px]",
            "blog-lg:max-w-[896px]",
            "blog-max:max-w-[1200px]",
          )}
        >
          <div className={clsx("refine-prose")}>{children}</div>
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
