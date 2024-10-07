import React, {
  Fragment,
  useState,
  type FC,
  type PropsWithChildren,
  type SVGProps,
} from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { LandingFooter } from "@site/src/refine-theme/landing-footer";
import { EnterpriseTemplateContactUsModal } from "./enterprise-template-contact-us-modal";
import { CommonCircleChevronLeft } from "./common-circle-chevron-left";
import { ShareIcon } from "./icons/share";
import * as Icons from "@site/src/assets/integration-icons";
import { CommonRunLocalPrompt } from "./common-run-local-prompt";
import { GithubIcon } from "./icons/github";
import { TutorialIcon } from "./icons/tutorial";
import { LockedIcon } from "./icons/locked";
import { TemplateEdition } from "../types/integrations";

type Props = {
  data: {
    slug: string;
    title: string;
    description: string;
    images: string[];
    runOnYourLocalPath: string | null;
    edition: TemplateEdition;
    liveDemo: string;
    github: string | null;
    tutorial: string;
    reactPlatform: string;
    uiFramework: string;
    dataProvider: string;
    authProvider: string;
  };
};

export const TemplatesDetail: FC<Props> = ({ data }) => {
  return (
    <CommonLayout description="Build React-based internal tools, admin panels, dashboards & B2B apps with unmatched flexibility.">
      <div>
        <CommonHeader />
        <div
          className={clsx(
            "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
            "px-4 landing-sm:px-0",
            "mx-auto",
            "flex flex-col",
            "not-prose",
            "mt-8 landing-lg:mt-20",
            "px-6 landing-sm:px-0",
            "pb-8 landing-sm:pb-12 landing-md:pb-16 landing-lg:pb-40",
          )}
        >
          <div>
            <Link
              to="/templates"
              className={clsx(
                "text-base",
                "font-semibold",
                "dark:text-gray-400 text-gray-500",
                "hover:dark:text-gray-400 hover:text-gray-500",
                "hover:no-underline",
                "flex",
                "items-center",
                "gap-2",
                "px-0 py-0",
                "landing-md:px-2 landing-md:py-3",
              )}
            >
              <CommonCircleChevronLeft />
              Back to templates
            </Link>
            <h1
              className={clsx(
                "dark:text-gray-0 text-gray-900",
                "text-4xl landing-sm:text-[56px] landing-sm:leading-[72px]",
                "font-bold",
                "px-0 landing-sm:px-8 landing-md:px-10",
                "mt-6",
              )}
            >
              {data.title}
            </h1>
          </div>
          <div
            className={clsx(
              "relative",
              "flex",
              "mt-8 landing-sm:mt-12 landing-md:mt-16",
              "-mx-4 landing-sm:-mx-0",
              "landing-sm:px-4",
              "aspect-[1168/736]",
            )}
          >
            <img
              className={clsx("block", "aspect-[1168/736]")}
              src={data.images[0]}
              alt={data.title}
            />
            {data.edition === TemplateEdition.Enterprise && (
              <div
                className={clsx(
                  "absolute",
                  "-top-2",
                  "-right-2 landing-sm:right-[9px]",
                )}
              >
                <img
                  src="/assets/badge-enterprise.png"
                  alt="enterprise badge"
                  className="w-[248px] h-[248px]"
                />
              </div>
            )}
          </div>

          <div
            className={clsx(
              "flex",
              "items-start",
              "gap-6",
              "mt-8 landing-sm:mt-12 landing-md:mt-16",
              "px-0 landing-sm:pl-10 landing-md:pl-14 landing-lg:pl-10",
              "px-0 landing-sm:pr-10 landing-md:pr-10 landing-lg:pr-10",
              "not-prose",
            )}
          >
            <div
              className={clsx(
                "max-w-full",
                "flex",
                "flex-col",
                "gap-8 landing-sm:gap-10",
              )}
            >
              <div
                className={clsx(
                  "flex",
                  "flex-wrap",
                  "items-center",
                  "gap-4 landing-md:gap-6",
                  "landing-lg:pl-4",
                )}
              >
                {data.liveDemo && (
                  <ProjectLink to={data.liveDemo}>
                    <ShareIcon width={16} height={16} />
                    <span
                      className={clsx(
                        "font-semibold",
                        "text-xs landing-md:text-base",
                      )}
                    >
                      Live demo
                    </span>
                  </ProjectLink>
                )}
                {data.tutorial && (
                  <ProjectLink to={data.tutorial}>
                    <TutorialIcon width={16} height={16} />
                    <span
                      className={clsx(
                        "font-semibold",
                        "text-xs landing-md:text-base",
                      )}
                    >
                      Tutorial
                    </span>
                  </ProjectLink>
                )}
                {data.github ? (
                  <SourceCode url={data.github} />
                ) : data.edition === TemplateEdition.Enterprise ? (
                  <SourceCodeLocked data={data} />
                ) : null}
              </div>
              <Integrations
                svgId="mobile"
                className={clsx(
                  "grid landing-md:hidden",
                  "grid-cols-2 sm:grid-cols-4",
                  "gap-6",
                  "flex-shrink-0",
                )}
                reactPlatform={data.reactPlatform}
                uiFramework={data.uiFramework}
                dataProvider={data.dataProvider}
                authProvider={data.authProvider}
              />
              <div
                className={clsx(
                  "flex",
                  "flex-col",
                  "landing-lg:pl-4 landing-lg:pr-6",
                )}
              >
                {data.runOnYourLocalPath && (
                  <div className={clsx("mb-2 landing-sm:mb-4")}>
                    <CommonRunLocalPrompt path={data.runOnYourLocalPath} />
                  </div>
                )}
                <div className={clsx("not-prose")}>
                  <h2
                    className={clsx(
                      "text-xl landing-sm:text-2xl",
                      "dark:text-gray-0 text-gray-900",
                      "font-semibold",
                    )}
                  >
                    Description
                  </h2>
                </div>
                <ReactMarkdown
                  className={clsx(
                    "mt-4 landing-sm:gap-6",
                    "whitespace-pre-wrap",
                    "not-prose",
                    "dark:!text-gray-200 !text-gray-900",
                    "template-detail-markdown",
                  )}
                  remarkPlugins={[remarkGfm, remarkRehype]}
                >
                  {data.description}
                </ReactMarkdown>
              </div>
            </div>
            <Integrations
              svgId="desktop"
              className={clsx(
                "hidden landing-md:grid",
                "grid-cols-1 landing-lg:grid-cols-2",
                "landing-md:gap-10",
                "pl-0 landing-lg:pl-10",
                "landing-md:ml-6 landing-lg:ml-0",
                "flex-shrink-0",
                "justify-self-end",
              )}
              reactPlatform={data.reactPlatform}
              uiFramework={data.uiFramework}
              dataProvider={data.dataProvider}
              authProvider={data.authProvider}
            />
          </div>
        </div>
      </div>
      <LandingFooter />
    </CommonLayout>
  );
};

const ProjectLink: FC<
  PropsWithChildren<{ to?: string; onClick?: () => void }>
> = ({ to, onClick, children }) => {
  const Component = to ? Link : "button";
  const props = to
    ? {
        to,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {
        onClick,
      };

  return (
    <Component
      {...props}
      className={clsx(
        "select-none",
        "group/project-link-button",
        "relative",
        "w-max",
        "flex",
        "items-center",
        "gap-1 landing-md:gap-2",
        "pl-2 py-2 pr-3",
        "landing-md:pl-3 landing-md:py-3 landing-md:pr-6",
        "rounded-full",
        to && "dark:bg-refine-cyan-alt/10 bg-refine-blue/10",
        to && "dark:text-refine-cyan-alt text-refine-blue",
        !to &&
          "dark:text-refine-enterprise-purple-5 text-refine-enterprise-purple-2",
        !to &&
          "dark:bg-refine-enterprise-purple-5/10 bg-refine-enterprise-purple-2/10",
        "hover:no-underline",
        "overflow-hidden",
      )}
    >
      {children}
      <div
        className={clsx(
          "select-none",
          "rounded-3xl",
          "absolute",
          "left-0",
          "top-0",
          "w-full",
          "h-full",
          "scale-[2]",
          "origin-center",
          "transition-[opacity,transform]",
          "duration-300",
          "ease-in-out",
          "opacity-0",
          "group-hover/project-link-button:opacity-100",
          "group-hover/project-link-button:scale-100",
          "pointer-events-none",
          to &&
            "bg-landing-copy-command-hover-bg-light dark:bg-landing-copy-command-hover-bg-dark",
          !to &&
            "bg-enterprise-copy-command-hover-bg-light dark:bg-enterprise-copy-command-hover-bg-dark",
        )}
      />
    </Component>
  );
};

const Integrations = (props: {
  className?: string;
  svgId?: string;
  reactPlatform: string;
  uiFramework: string;
  dataProvider: string;
  authProvider: string;
}) => {
  const { reactPlatform, uiFramework, dataProvider, authProvider, className } =
    props;

  return (
    <div className={clsx(className)}>
      <IntegrationBadge
        svgId={`${props.svgId}-react`}
        label="React Platform"
        integration={reactPlatform}
      />
      <IntegrationBadge
        svgId={`${props.svgId}-ui`}
        label="UI Framework"
        integration={uiFramework}
      />
      <IntegrationBadge
        svgId={`${props.svgId}-data`}
        label="Data Provider"
        integration={dataProvider}
      />
      <IntegrationBadge
        svgId={`${props.svgId}-auth`}
        label="Auth Provider"
        integration={authProvider}
      />
    </div>
  );
};

const IntegrationBadge = (props: {
  svgId: string;
  label: string;
  integration: string;
}) => {
  const Icon = integrationToIconMap?.[props.integration] || (() => null);

  return (
    <div className={clsx("flex", "flex-col", "gap-3", "not-prose")}>
      <h6 className={clsx("text-xs", "dark:text-gray-400 text-gray-600")}>
        {props.label}
      </h6>
      <div
        className={clsx(
          "flex",
          "items-center",
          "h-8",
          "pl-2 pr-4",
          "gap-2",
          "rounded-full",
          "border dark:border-gray-700 border-gray-200",
          "w-min",
        )}
      >
        <Icon id={props.svgId} width={16} height={16} />
        <span
          className={clsx(
            "text-sm",
            "whitespace-nowrap",
            "dark:text-gray-400 text-gray-900",
          )}
        >
          {props.integration}
        </span>
      </div>
    </div>
  );
};

const SourceCode = (props: { url: string }) => {
  return (
    <ProjectLink to={props.url}>
      <GithubIcon width={16} height={16} />
      <span className={clsx("font-semibold", "text-xs landing-md:text-base")}>
        Source code
      </span>
    </ProjectLink>
  );
};

const SourceCodeLocked = (props: { data: Props["data"] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ProjectLink onClick={() => setIsModalOpen(true)}>
        <LockedIcon width={16} height={16} />
        <span className={clsx("font-semibold", "text-xs landing-md:text-base")}>
          Source code
        </span>
      </ProjectLink>

      <EnterpriseTemplateContactUsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={props.data.title}
        utmMedium={props.data.slug}
      />
    </>
  );
};

const integrationToIconMap = {
  Ably: (props: SVGProps<SVGSVGElement>) => <Icons.Ably {...props} />,
  Airtable: (props: SVGProps<SVGSVGElement>) => <Icons.Airtable {...props} />,
  "Ant Design": (props: SVGProps<SVGSVGElement>) => <Icons.Antd {...props} />,
  Appwrite: (props: SVGProps<SVGSVGElement>) => <Icons.Appwrite {...props} />,
  "Chakra UI": (props: SVGProps<SVGSVGElement>) => <Icons.Chakra {...props} />,
  Directus: (props: SVGProps<SVGSVGElement>) => <Icons.Directus {...props} />,
  Dp: (props: SVGProps<SVGSVGElement>) => <Icons.Dp {...props} />,
  Elide: (props: SVGProps<SVGSVGElement>) => <Icons.Elide {...props} />,
  ElideGraphql: (props: SVGProps<SVGSVGElement>) => (
    <Icons.ElideGraphql {...props} />
  ),
  EntRefine: (props: SVGProps<SVGSVGElement>) => <Icons.EntRefine {...props} />,
  Firebase: (props: SVGProps<SVGSVGElement>) => <Icons.Firebase {...props} />,
  GraphQL: (props: SVGProps<SVGSVGElement>) => <Icons.Graphql {...props} />,
  Hasura: (props: SVGProps<SVGSVGElement>) => <Icons.Hasura {...props} />,
  Headless: (props: SVGProps<SVGSVGElement>) => <Icons.Headless {...props} />,
  "React Hook Form": (props: SVGProps<SVGSVGElement>) => (
    <Icons.HookForm {...props} />
  ),
  Hygraph: (props: SVGProps<SVGSVGElement>) => <Icons.Hygraph {...props} />,
  JSONApi: (props: SVGProps<SVGSVGElement>) => <Icons.JSONApi {...props} />,
  Kbar: (props: SVGProps<SVGSVGElement>) => <Icons.Kbar {...props} />,
  Kinde: (props: SVGProps<SVGSVGElement>) => <Icons.Kinde {...props} />,
  Mantine: (props: SVGProps<SVGSVGElement>) => <Icons.Mantine {...props} />,
  Medusa: (props: SVGProps<SVGSVGElement>) => <Icons.Medusa {...props} />,
  "Material UI": (props: SVGProps<SVGSVGElement>) => <Icons.Mui {...props} />,
  Nest: (props: SVGProps<SVGSVGElement>) => <Icons.Nest {...props} />,
  "NestJsX CRUD": (props: SVGProps<SVGSVGElement>) => <Icons.Nest {...props} />,
  NestQuery: (props: SVGProps<SVGSVGElement>) => <Icons.NestQuery {...props} />,
  "Next.js": (props: SVGProps<SVGSVGElement>) => <Icons.Nextjs {...props} />,
  React: (props: SVGProps<SVGSVGElement>) => <Icons.React {...props} />,
  Remix: (props: SVGProps<SVGSVGElement>) => <Icons.Remix {...props} />,
  "Rest API": (props: SVGProps<SVGSVGElement>) => (
    <Icons.RestWithoutText {...props} />
  ),
  Sanity: (props: SVGProps<SVGSVGElement>) => <Icons.Sanity {...props} />,
  "ShadCN UI": (props: SVGProps<SVGSVGElement>) => (
    <Icons.ShadCnUI {...props} />
  ),
  SQLite: (props: SVGProps<SVGSVGElement>) => <Icons.SQLite {...props} />,
  Strapi: (props: SVGProps<SVGSVGElement>) => <Icons.Strapi {...props} />,
  Supabase: (props: SVGProps<SVGSVGElement>) => <Icons.Supabase {...props} />,
  TailwindCSS: (props: SVGProps<SVGSVGElement>) => (
    <Icons.TailwindCss {...props} />
  ),
  UseGenerated: (props: SVGProps<SVGSVGElement>) => (
    <Icons.UseGenerated {...props} />
  ),
  SlackIcon: (props: SVGProps<SVGSVGElement>) => <Icons.SlackIcon {...props} />,
  Atlassian: (props: SVGProps<SVGSVGElement>) => <Icons.Atlassian {...props} />,
  AuthJs: (props: SVGProps<SVGSVGElement>) => <Icons.AuthJs {...props} />,
  Auth0: (props: SVGProps<SVGSVGElement>) => <Icons.Auth0 {...props} />,
  AwsCognito: (props: SVGProps<SVGSVGElement>) => (
    <Icons.AwsCognito {...props} />
  ),
  AzureActiveDirectory: (props: SVGProps<SVGSVGElement>) => (
    <Icons.AzureActiveDirectory {...props} />
  ),
  Clerk: (props: SVGProps<SVGSVGElement>) => <Icons.Clerk {...props} />,
  Expo: (props: SVGProps<SVGSVGElement>) => <Icons.Expo {...props} />,
  Google: (props: SVGProps<SVGSVGElement>) => <Icons.Google {...props} />,
  Okta: (props: SVGProps<SVGSVGElement>) => <Icons.Okta {...props} />,
  MongoDB: (props: SVGProps<SVGSVGElement>) => <Icons.MongoDB {...props} />,
  MsSqlServer: (props: SVGProps<SVGSVGElement>) => (
    <Icons.MsSqlServer {...props} />
  ),
  MySql: (props: SVGProps<SVGSVGElement>) => <Icons.MySql {...props} />,
  PostgreSql: (props: SVGProps<SVGSVGElement>) => (
    <Icons.PostgreSql {...props} />
  ),
  Oracle: (props: SVGProps<SVGSVGElement>) => <Icons.Oracle {...props} />,
  Custom: (props: SVGProps<SVGSVGElement>) => <Icons.CustomAuth {...props} />,
  Vite: (props: SVGProps<SVGSVGElement>) => <Icons.Vite {...props} />,
  "Nestjs-query": (props: SVGProps<SVGSVGElement>) => (
    <Icons.Graphql {...props} />
  ),
  "Nestjsx-CRUD": (props: SVGProps<SVGSVGElement>) => (
    <Icons.RestWithoutText {...props} />
  ),
};

export type Integration = keyof typeof integrationToIconMap;
