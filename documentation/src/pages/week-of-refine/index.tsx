import React from "react";
import Head from "@docusaurus/Head";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { BlogFooter } from "@site/src/refine-theme/blog-footer";
import { weekOfRefineCards } from "@site/src/assets/week-of-refine/constants";
import {
  DateIcon,
  RefineWeekLogoXL,
} from "@site/src/assets/week-of-refine/icons";

export type CardProps = {
  title: string;
  imgURL: string;
  dateRange: string;
  description: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  bgLinearGradient: string;
  link: string;
};

const Card = ({
  title,
  imgURL,
  dateRange,
  description,
  logo,
  bgLinearGradient,
  link,
}: CardProps) => {
  const Logo = logo;

  return (
    <Link to={link} className="no-underline">
      <article className={clsx(bgLinearGradient, "rounded-md")}>
        <div
          className={clsx(
            "text-2xl font-semibold text-gray-900 dark:text-gray-200",
            "py-4 px-6",
          )}
        >
          {title}
        </div>
        <div className="px-4">
          <img src={imgURL} alt={title} />
        </div>
        <div className={clsx("flex flex-col gap-4", "p-6")}>
          <div className="flex items-center gap-3">
            <DateIcon />
            <span className="text-gray-500 dark:text-gray-400">
              {dateRange}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
          <div className="flex self-end gap-4">
            <span className="text-gray-500 dark:text-gray-400">with</span>
            <Logo />
          </div>
        </div>
      </article>
    </Link>
  );
};

const RefineWeek = () => {
  return (
    <CommonLayout>
      <div className="not-prose">
        <Head title="RefineWeek | Refine">
          <html data-page="week-of-refine" data-customized="true" />
        </Head>

        <CommonHeader hasSticky={true} />

        <div className="blog-lg:px-8 px-4">
          <div
            className={clsx(
              "mx-auto",
              "blog-sm:max-w-[624px]",
              "blog-md:max-w-[768px]",
              "landing-xl:!max-w-[1264px]",
              "py-10",
            )}
          >
            <div
              className={clsx(
                "flex flex-col landing-xl:flex-row",
                "gap-10 landing-xl:gap-0",
                "blog-sm:mt-10 blog-sm:mb-20",
              )}
            >
              <RefineWeekLogoXL className="flex-shrink-0 landing-xl:mr-[116px]" />
              <p className="text-[32px] leading-10 font-semibold text-gray-800 dark:text-gray-100">
                Participate in RefineWeek series and discover the full potential
                of Refine as you craft complete CRUD apps - a practical and
                engaging learning experience
              </p>
            </div>

            <div className="grid grid-cols-1 blog-md:grid-cols-2 landing-xl:!grid-cols-3 gap-10 mt-10">
              {weekOfRefineCards.map((card) => (
                <Card key={card.title} {...card} />
              ))}
            </div>
          </div>
        </div>

        <BlogFooter />
      </div>
    </CommonLayout>
  );
};

export default RefineWeek;
