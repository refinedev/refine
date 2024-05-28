import clsx from "clsx";
import React, { type FC } from "react";
import { EnterpriseGetInTouchButton } from "./enterprise-get-in-touch-button";

type Props = {
  className?: string;
  label?: string;
};

export const EnterpriseGetInTouchCta: FC<Props> = ({
  label = "Ready to unlock the full potential?",
  ...props
}) => {
  return (
    <div className={clsx(props.className)}>
      <div
        className={clsx(
          "not-prose",
          "flex flex-col landing-md:flex-row",
          "items-center",
          "justify-between",
          "gap-4 landing-sm:gap-6",
          "py-6 pr-6 pl-6 landing-md:pl-12",
          "rounded-2xl landing-md:rounded-full",
          "text-gray-0 dark:text-gray-900",
          "bg-enterprise-cta-button-bg-light dark:bg-enterprise-cta-button-bg-dark",
        )}
      >
        <h2 className={clsx("text-sm landing-sm:text-2xl", "font-medium")}>
          {label}
        </h2>
        <EnterpriseGetInTouchButton variant="plain" />
      </div>
    </div>
  );
};
