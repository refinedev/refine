import React from "react";
import clsx from "clsx";
import { EnterpriseSSOMultifactorAuth } from "./enterprise-sso-mutlifactor-auth";
import { EnterpriseIAMServices } from "./enterprise-iam-services";
import { EnterpriseSecurityFeatures } from "./enterprise-security-features";

export const EnterpriseSecurity = ({ className }: { className?: string }) => (
  <div className={clsx("flex flex-col", "not-prose", className)}>
    <div
      className={clsx(
        "pl-4 landing-sm:pl-6 landing-md:pl-10",
        "text-2xl landing-sm:text-[32px] landing-sm:leading-[40px]",
      )}
    >
      <h2 className={clsx("dark:text-gray-0 text-gray-900")}>
        Adopt cutting-edge{" "}
        <span
          className={clsx(
            "font-semibold",
            "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
            "text-refine-blue drop-shadow-[0_0_30px_rgba(51,51,255,0.3)]",
          )}
        >
          security
        </span>
        .
      </h2>
    </div>
    <div
      className={clsx(
        "flex flex-col",
        "gap-8 landing-md:gap-12 landing-lg:gap-6",
        "mt-8 landing-md:mt-20",
        "not-prose",
      )}
    >
      <EnterpriseIAMServices />
      <EnterpriseSSOMultifactorAuth />
      <EnterpriseSecurityFeatures />
    </div>
  </div>
);
