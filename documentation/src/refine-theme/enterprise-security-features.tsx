import React from "react";
import clsx from "clsx";
import {
  AccessControlIcon,
  MonitorIcon,
  SelfHostedIcon,
} from "../components/landing/icons";

export const EnterpriseSecurityFeatures = ({
  className,
}: {
  className?: string;
}) => (
  <div className={clsx(className, "w-full")}>
    <div
      className={clsx(
        "grid",
        "grid-cols-1 landing-lg:grid-cols-3",
        "gap-4 landing-md:gap-12 landing-lg:gap-6",
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
              "flex-col landing-sm:flex-row  landing-lg:flex-col",
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
  </div>
);

const list = [
  {
    icon: <AccessControlIcon />,
    title: "Achieve fine-grained access control",
    description:
      "Native integrations to authorization services for out-of-the-box support of common access control models such as ACL, RBAC & ABAC models.",
  },
  {
    icon: <SelfHostedIcon />,
    title: "Self-host for compliance",
    description:
      "Deploy to your own infrastructure without worrying about regulations, performance, and stability. Maintain your current security best practices with no compromises.",
  },
  {
    icon: <MonitorIcon />,
    title: "Effortlessly monitor your application",
    description:
      "Ready-made providers and components for audit logging and usage analytics.",
  },
];
