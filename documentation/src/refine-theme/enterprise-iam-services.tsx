import React, {
  type DetailedHTMLProps,
  type ReactNode,
  type SVGProps,
  useRef,
} from "react";
import clsx from "clsx";
import {
  Atlassian,
  AuthJs,
  Auth0,
  AwsCognito,
  AzureActiveDirectory,
  Clerk,
  Expo,
  Google,
  Okta,
} from "../assets/integration-icons";
import { useInView } from "framer-motion";

export const EnterpriseIAMServices = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col",
        "not-prose",
        "dark:bg-landing-packages-dark bg-landing-packages",
        "dark:bg-gray-800 bg-gray-50",
        "rounded-2xl landing-sm:rounded-3xl",
        "p-4 landing-sm:p-10",
        className,
      )}
    >
      <div
        className={clsx("flex flex-col", "gap-2 landing-sm:gap-4", "not-prose")}
      >
        <h2
          className={clsx(
            "text-base landing-sm:text-2xl",
            "dark:text-gray-300 text-gray-900",
            "font-semibold",
          )}
        >
          Native Integrations to IAM services
        </h2>
        <p
          className={clsx(
            "text-base",
            "max-w-[752px]",
            "dark:text-gray-400 text-gray-600",
          )}
        >
          Official packages tailored for your organization&apos;s chosen{" "}
          <span className={clsx("dark:text-gray-0 text-gray-900")}>
            identity and access management providers
          </span>
          . These modules eliminate the need for days of manual work in
          developing custom authentication providers, allowing you to seamlessly
          integrate your application while following all security best
          practices.
        </p>
      </div>

      <div
        className={clsx(
          "landing-packages-mask",
          "mt-4 landing-md:mt-10",
          "overflow-hidden",
        )}
      >
        <PackagesContainer animDirection="right">
          {[...list, ...list].map(({ icon: Icon, label, tooltip }, index) => (
            <PackageItem
              key={index}
              label={label}
              tooltip={tooltip}
              icon={<Icon width="24" height="24" />}
            />
          ))}
        </PackagesContainer>
      </div>
    </div>
  );
};

const PackagesContainer = ({
  children,
  className,
  animDirection,
  ...props
}: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  animDirection: "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={clsx(
        "relative",
        "flex",
        "items-center",
        animDirection === "left" ? "justify-start" : "justify-end",
      )}
    >
      <div
        className={clsx(
          className,
          "hover:animation-paused",
          inView
            ? animDirection === "left"
              ? "animate-enterprise-iam-services-left"
              : "animate-enterprise-iam-services-right"
            : "",
          "absolute",
          "left-0",
          "top-0",
          "pr-4",
          "w-auto",
          "flex",
          "items-center",
          "gap-[18px]",
          "mt-6",
          "relative",
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

const PackageItem = (props: {
  icon: ReactNode;
  label: string;
  tooltip: string | null;
}) => {
  const { tooltip, icon, label } = props;

  return (
    <div
      className={clsx(
        "group",
        "relative",
        "z-10",
        "flex",
        "items-center",
        "justify-center",
        "gap-3",
        "pl-4 pt-4 pb-4 pr-6",
        "dark:bg-gray-900 bg-gray-0",
        "rounded-full",
        "cursor-pointer",
      )}
    >
      <div>{icon}</div>
      <div
        className={clsx(
          "text-sm",
          "font-medium",
          "dark:bg-landing-packages-text-dark bg-landing-packages-text",
          "bg-clip-text",
          "text-transparent",
          "whitespace-nowrap",
        )}
      >
        {label}
      </div>

      {tooltip && (
        <div
          className={clsx(
            "absolute",
            "z-20",
            "top-[-48px]",
            "scale-0",
            "group-hover:scale-100",
            "transition-transform",
            "origin-top",
          )}
        >
          <div
            className={clsx(
              "relative",
              "text-sm",
              "dark:bg-gray-0 bg-gray-900",
              "dark:text-gray-700 text-gray-300",
              "rounded-full",
              "px-6",
              "py-3",
              "whitespace-nowrap",
            )}
          >
            {tooltip}
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={15}
            fill="none"
            className={clsx(
              "absolute",
              "scale-0",
              "-bottom-2",
              "left-1/2",
              "-translate-x-1/2",
              "group-hover:scale-100",
              "transition-transform",
              "origin-bottom",
              "dark:text-gray-0 text-gray-900",
            )}
          >
            <path
              fill="currentColor"
              d="M17.73 13.664C18.238 14.5 19.089 15 20 15c.912 0 1.763-.501 2.27-1.336l3.025-4.992C26.306 7.002 28.01 7 29.833 7H40V0H0v7h10.167c1.823 0 3.527.003 4.538 1.672l3.026 4.992Z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

const list = [
  {
    icon: (props: SVGProps<SVGSVGElement>) => <AwsCognito {...props} />,
    label: "AWS Cognito",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Auth0 {...props} />,
    label: "Auth0",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => (
      <AzureActiveDirectory {...props} />
    ),
    label: "Azure Active Directory",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Okta {...props} />,
    label: "Okta",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Clerk {...props} />,
    label: "Clerk",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Atlassian {...props} />,
    label: "Atlassian",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Google {...props} />,
    label: "Google Auth",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <AuthJs {...props} />,
    label: "Auth.js",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Expo {...props} />,
    label: "Expo",
    tooltip: null,
  },
] as const;
