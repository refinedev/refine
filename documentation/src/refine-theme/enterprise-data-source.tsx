import React, {
  type DetailedHTMLProps,
  type ReactNode,
  type SVGProps,
  useRef,
} from "react";
import clsx from "clsx";
import {
  Nest,
  Strapi,
  Supabase,
  Hasura,
  Airtable,
  Oracle,
  MongoDB,
  PostgreSql,
  MySql,
  MsSqlServer,
  SQLite,
} from "../assets/integration-icons";
import { useInView } from "framer-motion";

export const EnterpriseDataSource = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("flex flex-col", "not-prose", className)}>
      <div
        className={clsx(
          "pl-4 landing-sm:pl-6 landing-md:pl-10",
          "text-2xl landing-sm:text-[32px] landing-sm:leading-[40px]",
        )}
      >
        <h2 className={clsx("dark:text-gray-400 text-gray-600")}>
          <span
            className={clsx(
              "font-semibold",
              "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
              "text-refine-blue drop-shadow-[0_0_30px_rgba(51,51,255,0.3)]",
            )}
          >
            Integrate{" "}
          </span>
          with any data source.
        </h2>
      </div>

      <div
        className={clsx(
          "mt-8 landing-md:mt-20",
          "flex flex-col landing-lg:flex-row",
          "gap-6",
        )}
      >
        <div
          className={clsx(
            "landing-lg:min-w-[435px]",
            "flex flex-col",
            "p-4 landing-sm:p-10",
            "dark:bg-enterprise-data-source-dark dark:bg-gray-900 bg-gray-0",
            "bg-blend-overlay",
            "bg-no-repeat",
            "rounded-2xl landing-sm:rounded-3xl",
            "border dark:border-gray-700 border-gray-200",
            "not-prose",
          )}
        >
          <div
            className={clsx(
              "flex flex-col",
              "gap-2 landing-sm:gap-4",
              "not-prose",
            )}
          >
            <h2
              className={clsx(
                "text-base landing-sm:text-2xl",
                "dark:text-gray-300 text-gray-900",
                "font-semibold",
              )}
            >
              Built-in integrations
            </h2>
            <p
              className={clsx("text-base", "dark:text-gray-400 text-gray-600")}
            >
              15+ native providers incl. GraphQL & Rest API&apos;s
            </p>
          </div>
          <div
            className={clsx(
              "landing-packages-mask",
              "overflow-hidden",
              "mt-auto",
            )}
          >
            <PackagesContainer animDirection="right">
              {[...list1, ...list1].map(
                ({ icon: Icon, label, tooltip }, index) => (
                  <PackageItem
                    key={index}
                    label={label}
                    tooltip={tooltip}
                    icon={<Icon width="24" height="24" />}
                  />
                ),
              )}
            </PackagesContainer>
          </div>
        </div>
        <div
          className={clsx(
            "landing-lg:w-[740px]",
            "flex flex-col",
            "p-4 landing-sm:p-10",
            "dark:bg-enterprise-data-source-dark dark:bg-gray-900 bg-gray-0",
            "bg-blend-overlay",
            "bg-no-repeat",
            "rounded-2xl landing-sm:rounded-3xl",
            "border dark:border-gray-700 border-gray-200",
            "not-prose",
          )}
        >
          <div
            className={clsx(
              "flex flex-col",
              "gap-2 landing-sm:gap-4",
              "not-prose",
            )}
          >
            <h2
              className={clsx(
                "text-base landing-sm:text-2xl",
                "dark:text-gray-300 text-gray-900",
                "font-semibold",
              )}
            >
              Direct database access
            </h2>
            <p
              className={clsx("text-base", "dark:text-gray-400 text-gray-600")}
            >
              Built-in tools for automatic generation of APIs to connect RDS and
              NoSQL data sources. Create proxy APIs instantly using database
              introspection, ensuring 100% compatibility with the Refine
              front-end.
            </p>
          </div>
          <div className={clsx("landing-packages-mask", "overflow-hidden")}>
            <PackagesContainer animDirection="left">
              {[...list2, ...list2].map(
                ({ icon: Icon, label, tooltip }, index) => (
                  <PackageItem
                    key={index}
                    label={label}
                    tooltip={tooltip}
                    icon={<Icon width="24" height="24" />}
                  />
                ),
              )}
            </PackagesContainer>
          </div>
        </div>
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
              ? "animate-enterprise-data-source-left"
              : "animate-enterprise-data-source-right"
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
        "dark:bg-gray-800 bg-gray-50",
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

const list1 = [
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Nest {...props} />,
    label: "NestJS",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Strapi {...props} />,
    label: "Strapi",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Supabase {...props} />,
    label: "Supabase",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Hasura {...props} />,
    label: "Hasura",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Airtable {...props} />,
    label: "Airtable",
    tooltip: null,
  },
] as const;

const list2 = [
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Oracle {...props} />,
    label: "Oracle",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <PostgreSql {...props} />,
    label: "PostgreSQL",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <MySql {...props} />,
    label: "MySQL",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <SQLite {...props} />,
    label: "SQLite",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <MsSqlServer {...props} />,
    label: "MS SQL Server",
    tooltip: null,
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <MongoDB {...props} />,
    label: "Mongo DB",
    tooltip: null,
  },
] as const;
