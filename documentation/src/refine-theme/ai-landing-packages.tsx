import clsx from "clsx";
import { useInView } from "framer-motion";
import React, {
  type DetailedHTMLProps,
  type FC,
  type ReactNode,
  type SVGProps,
  useRef,
} from "react";
import {
  Ably,
  Airtable,
  Antd,
  Appwrite,
  Chakra,
  Directus,
  Elide,
  ElideGraphql,
  Firebase,
  Graphql,
  Hasura,
  Headless,
  HookForm,
  Hygraph,
  JSONApi,
  Kbar,
  Mantine,
  Medusa,
  Mui,
  Nest,
  NestQuery,
  Nextjs,
  Remix,
  Rest,
  Sanity,
  SQLite,
  Strapi,
  Supabase,
  TailwindCss,
} from "../assets/integration-icons";

type Props = {
  className?: string;
};

export const AiLandingPackagesDesktop = ({ className }: Props) => {
  return (
    <div className={clsx(className, "w-full")}>
      <div
        className={clsx(
          "w-full",
          "relative",
          "flex",
          "items-center",
          "justify-start",
          "gap-4",
          "dark:bg-ai-landing-packages-dark bg-ai-landing-packages",
          "dark:bg-zinc-800 bg-gray-50",
          "dark:border dark:border-zinc-700",
          "rounded-2xl landing-sm:rounded-3xl",
          "overflow-hidden",
        )}
      >
        <TextSection
          className={clsx(
            "pl-10",
            "flex",
            "flex-shrink-0",
            "w-full",
            "max-w-[304px]",
          )}
        />

        <div
          className={clsx(
            "landing-packages-mask",
            "w-full",
            "flex",
            "items-center",
            "justify-start",
            "h-[196px]",
            "overflow-hidden",
          )}
        >
          <div className="inline-flex group">
            <PackagesContainer>
              {[...list, ...list].map(
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
            <PackagesContainer>
              {[...list, ...list].map(
                ({ icon: Icon, label, tooltip }, index) => (
                  <PackageItem
                    key={`duplicate-${index}`}
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

export const AiLandingPackagesMobile = ({ className }: Props) => {
  return (
    <div
      className={clsx(
        "flex-shrink-0",
        "h-full",
        "w-full",
        "rounded-2xl landing-sm:rounded-3xl",
        "dark:bg-ai-landing-packages-mobile-dark bg-ai-landing-packages-mobile",
        "dark:bg-zinc-800 bg-gray-50",
        "dark:border dark:border-zinc-700",
        className,
      )}
    >
      <div
        className={clsx(
          "not-prose",
          "p-2 landing-sm:p-4",
          "dark:bg-landing-noise",
          "flex flex-col",
        )}
      >
        <div
          className={clsx(
            "landing-packages-mask",
            "w-full",
            "flex",
            "items-center",
            "justify-start",
            "h-[72px] landing-md:h-[210px]",
            "overflow-hidden",
          )}
        >
          <div className="inline-flex group">
            <PackagesContainer>
              {[...list, ...list].map(
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
            <PackagesContainer>
              {[...list, ...list].map(
                ({ icon: Icon, label, tooltip }, index) => (
                  <PackageItem
                    key={`duplicate-${index}`}
                    label={label}
                    tooltip={tooltip}
                    icon={<Icon width="24" height="24" />}
                  />
                ),
              )}
            </PackagesContainer>
          </div>
        </div>

        <TextSection
          className={clsx(
            "not-prose",
            "mt-4 landing-sm:mt-6 landing-lg:mt-10",
            "px-4 landing-sm:px-6",
            "mb-4 landing-sm:mb-6",
          )}
        />
      </div>
    </div>
  );
};

const TextSection = ({
  className,
}: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div className={clsx("not-prose", "flex", "flex-col", "gap-4", className)}>
      <h6
        className={clsx(
          "p-0",
          "font-semibold",
          "text-xl",
          "dark:text-white text-gray-900",
        )}
      >
        Backend agnostic
      </h6>
      <div
        className={clsx(
          "not-prose",
          "flex",
          "items-center",
          "justify-between",
          "flex-wrap",
          "gap-4 landing-sm:gap-8",
        )}
      >
        <p
          className={clsx(
            "p-0",
            "text-base",
            "dark:text-zinc-300 text-gray-600",
          )}
        >
          Out-of-the box integrations for 15+ services including custom REST and
          GraphQL API's.
        </p>
      </div>
    </div>
  );
};

const PackagesContainer = ({
  children,
  ...props
}: DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div ref={ref} className={clsx("flex", "items-center")}>
      <div
        className={clsx(
          "group-hover:animation-paused",
          "animate-ai-landing-packages-right",
          "flex",
          "items-center",
          "gap-[18px]",
          "whitespace-nowrap",
          "pr-4",
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
  tooltip: string;
}) => {
  const { tooltip, icon, label } = props;

  return (
    <div
      className={clsx(
        "group/item",
        "relative",
        "z-10",
        "flex",
        "items-center",
        "justify-center",
        "gap-3",
        "pl-4 pt-4 pb-4 pr-6",
        "dark:bg-zinc-900 bg-gray-0",
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

      <div
        className={clsx(
          "absolute",
          "z-20",
          "top-[-48px]",
          "scale-0",
          "group-hover/item:scale-100",
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
            "group-hover/item:scale-100",
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
    </div>
  );
};

const list = [
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Graphql {...props} />,
    label: "GraphQL",
    tooltip: "npm i @refinedev/graphql",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Kbar {...props} />,
    label: "Kbar",
    tooltip: "npm i @refinedev/kbar",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Medusa {...props} />,
    label: "Medusa",
    tooltip: "npm i @refinedev/medusa",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Nest {...props} />,
    label: "NestJS CRUD",
    tooltip: "npm i @refinedev/nestjsx-crud",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <NestQuery {...props} />,
    label: "Nestjs-query",
    tooltip: "npm i @refinedev/nestjs-query",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Nextjs {...props} />,
    label: "Next.js",
    tooltip: "npm i @refinedev/nextjs-router",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Remix {...props} />,
    label: "Remix",
    tooltip: "npm i @refinedev/remix-router",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Rest {...props} />,
    label: "REST",
    tooltip: "npm i @refinedev/simple-rest",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Strapi {...props} />,
    label: "Strapi",
    tooltip: "npm i @refinedev/strapi-v4",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Supabase {...props} />,
    label: "Supabase",
    tooltip: "npm i @refinedev/supabase",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Hygraph {...props} />,
    label: "Hygraph",
    tooltip: "npm i @acomagu/refine-hygraph",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <Sanity {...props} />,
    label: "Sanity",
    tooltip: "npm i refine-sanity",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <SQLite {...props} />,
    label: "SQLite",
    tooltip: "npm i refine-sqlite",
  },
  {
    icon: (props: SVGProps<SVGSVGElement>) => <JSONApi {...props} />,
    label: "JSON:API",
    tooltip: "npm i refine-jsonapi",
  },
];
