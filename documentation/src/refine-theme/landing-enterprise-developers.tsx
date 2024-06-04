import clsx from "clsx";
import React, { type FC } from "react";
import {
  AccessControlIcon,
  BlackBoxIcon,
  IdentityIcon,
  MonitorIcon,
  SelfHostedIcon,
  SupportIcon,
} from "../components/landing/icons";

import { LandingSectionCtaButtonAlt } from "./landing-section-cta-button";

const list = [
  {
    icon: <SelfHostedIcon />,
    title: "Self-host for compliance",
    description:
      "Deploy to your own infrastructure without worrying about regulations, performance, and stability. Maintain your current security best practices with no compromises.",
  },
  {
    icon: <IdentityIcon />,
    title: "Leverage the power of your existing Identity Provider",
    description:
      "Native support for Okta, Azure AD, Amazon Cognito & Google Cloud Identity.",
  },
  {
    icon: <AccessControlIcon />,
    title: "Achieve fine-grained access control",
    description:
      "Out-of-the-box support for widely accepted authorization models including ACL, RBAC & ABAC.",
  },
  {
    icon: <BlackBoxIcon />,
    title: "Unlock the black box",
    description:
      "Implement an open-source solution with an open architecture. Save yourself from the hassle of adding another proprietary component to your stack.",
  },
  {
    icon: <MonitorIcon />,
    title: "Effortlessly monitor your application",
    description:
      "Ready-made providers and components for audit logging and usage analytics.",
  },
  {
    icon: <SupportIcon />,
    title: "Get supported by the experts",
    description:
      "Enroll in plans that provide priority support, trainings and consulting.",
  },
];

type Props = {
  className?: string;
};

export const LandingEnterpriseDevelopers: FC<Props> = ({ className }) => {
  return (
    <div className={clsx(className, "w-full")}>
      <div className={clsx("not-prose", "w-full", "px-4 landing-md:px-10")}>
        <h2
          className={clsx(
            "text-2xl landing-sm:text-[32px] landing-sm:leading-[40px]",
            "tracking-tight",
            "text-start",
            "p-0",
            "dark:text-gray-0 text-gray-900",
          )}
        >
          Enterprise developers{" "}
          <span className="font-sans text-[#FE251B] drop-shadow-[0_0_30px_rgba(254,37,27,0.3)]">
            ❤️
          </span>{" "}
          <span
            className={clsx(
              "font-semibold",
              "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
              "text-refine-blue drop-shadow-[0_0_30px_rgba(0,128,255,0.3)]",
            )}
          >
            Refine
          </span>
          .
        </h2>
        <p
          className={clsx(
            "mt-4 landing-sm:mt-6",
            "max-w-md",
            "text-base",
            "dark:text-gray-400 text-gray-600",
          )}
        >
          Refine is designed to target the specific pain points of larger
          organizations by giving top priority to{" "}
          <span className="font-semibold text-gray-900 dark:text-gray-0">
            security
          </span>
          .
        </p>
      </div>

      <div
        className={clsx(
          "mt-8 landing-sm:mt-12 landing-lg:mt-20",
          "grid",
          "grid-cols-1 landing-md:grid-cols-2 landing-lg:grid-cols-3",
          "gap-4 landing-sm:gap-12 landing-md:gap-6",
          "mb-4 landing-sm:mb-12 landing-md:mb-6",
        )}
      >
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "not-prose",
                "p-4 landing-sm:p-10",
                "flex",
                "flex-col landing-sm:flex-row landing-md:flex-col",
                "items-start",
                "gap-6",
                "dark:bg-landing-noise",
                "dark:bg-gray-800 bg-gray-50",
                "rounded-2xl landing-sm:rounded-3xl",
              )}
            >
              <div>{item.icon}</div>
              <div className={clsx("flex", "flex-col", "gap-4")}>
                <div
                  className={clsx(
                    "text-xl",
                    "font-semibold",
                    "text-gray-900 dark:text-gray-0",
                  )}
                >
                  {item.title}
                </div>
                <div
                  className={clsx(
                    "text-base",
                    "dark:text-gray-400 text-gray-600",
                  )}
                >
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <LandingSectionCtaButtonAlt to="/enterprise">
        Check out Enterprise Edition
      </LandingSectionCtaButtonAlt>
    </div>
  );
};
