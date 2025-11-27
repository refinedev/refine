import clsx from "clsx";
import React, { type SVGProps, type FC } from "react";
import {
  AccessControlIcon,
  BlackBoxIcon,
  IdentityIcon,
  MonitorIcon,
  SelfHostedIcon,
  SupportIcon,
} from "../components/landing/icons";

import {
  LandingSectionCtaButton,
  LandingSectionCtaButtonAlt,
} from "./landing-section-cta-button";

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
            "tracking-normal",
            "flex",
            "items-center",
            "gap-3",
            "font-medium",
            "text-2xl landing-sm:text-[32px] landing-sm:leading-[40px]",
            "tracking-tight",
            "text-start",
            "p-0",
            "text-white",
          )}
        >
          Enterprise developers{" "}
          <span>
            <HeartIcon />
          </span>
          <span className={clsx("font-medium")}>Refine</span>
          <span
            className={clsx(
              "font-bold",
              "font-jetBrains-mono",
              "text-orange-400",
            )}
          >
            CORE
          </span>
        </h2>
      </div>

      <div
        className={clsx(
          "mt-8 landing-sm:mt-12",
          "grid",
          "grid-cols-1 landing-md:grid-cols-2 landing-lg:grid-cols-3",
          "gap-1",
          "mb-6",
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
                "bg-zinc-800",
                "rounded-xl",
                "gap-10",
              )}
            >
              <div>{item.icon}</div>
              <div className={clsx("flex", "flex-col", "gap-4")}>
                <div
                  className={clsx(
                    "text-base",
                    "tracking-[-0.004rem]",
                    "font-semibold",
                    "text-white",
                  )}
                >
                  {item.title}
                </div>
                <div
                  className={clsx(
                    "text-sm",
                    "tracking-[-0.007rem]",
                    "text-zinc-300",
                  )}
                >
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <LandingSectionCtaButton
        to="/enterprise"
        className={clsx("w-max", "mx-auto")}
      >
        Check out Enterprise Edition
      </LandingSectionCtaButton>
    </div>
  );
};

const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <path
      fill="#450A0A"
      stroke="#F87171"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M31.667 23.333c2.483-2.433 5-5.35 5-9.166A9.167 9.167 0 0 0 27.5 5c-2.933 0-5 .833-7.5 3.333C17.5 5.833 15.433 5 12.5 5a9.167 9.167 0 0 0-9.167 9.167c0 3.833 2.5 6.75 5 9.166L20 35l11.667-11.667Z"
    />
  </svg>
);
