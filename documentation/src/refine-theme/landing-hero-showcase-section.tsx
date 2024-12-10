import React from "react";
import clsx from "clsx";
import { LandingArrowRightIcon } from "./icons/landing-arrow-right";
import { ShowcaseWrapper } from "../components/landing/showcase-wrapper";

export const LandingHeroShowcaseSection = () => {
  const [activeApp, setActiveApp] = React.useState(apps[0]);

  const ShowcaseComponent = React.useMemo(() => {
    return activeApp.showcase;
  }, [activeApp.name]);

  return (
    <div
      className={clsx(
        "bg-gray-50 dark:bg-gray-800",
        "flex",
        "flex-col",
        "w-full",
        "rounded-2xl landing-sm:rounded-[32px]",
        "gap-2 landing-sm:gap-4",
        "p-2 landing-sm:p-4",
        "relative",
        "group/showcase",
        "landing-lg:overflow-hidden",
      )}
    >
      <div className={clsx("flex", "w-full", "gap-2")}>
        <div
          className={clsx(
            "rounded-3xl",
            "overflow-y-auto",
            "flex",
            "w-full",
            "gap-2",
            "scrollbar-hidden",
            "snap snap-x snap-mandatory",
            "snap-mandatory",
          )}
        >
          <div
            className={clsx(
              "rounded-3xl",
              "flex",
              "w-auto",
              "landing-lg:w-full",
              "items-center",
              "justify-start",
              "gap-2",
              "relative",
              "bg-gray-0 dark:bg-gray-900",
            )}
          >
            <div
              className={clsx(
                "hidden landing-sm:block",
                "flex-1",
                "rounded-3xl",
                "h-full",
                "bg-gray-200 dark:bg-gray-700",
                "absolute",
                "left-0",
                "top-0",
                "transition-transform",
                "duration-150",
                "ease-out",
              )}
              style={{
                width: "calc((100% - (3 * 8px)) / 4)",
                minWidth: "244px",
                transform: `translateX(calc((100% + 8px) * ${apps.findIndex(
                  (f) => f.name === activeApp.name,
                )})) translateZ(0px)`,
              }}
            />
            {apps.map((app, index) => (
              <button
                key={app.name}
                type="button"
                onClick={(event) => {
                  setActiveApp(app);
                  // if index i >= 2
                  // then scroll to the right
                  event.currentTarget.parentElement?.parentElement?.scrollTo({
                    left: index >= 2 ? index * (244 + 8) : 0,
                    behavior: "smooth",
                  });
                }}
                className={clsx(
                  "z-[1]",
                  "snap-start",
                  "appearance-none",
                  "focus:outline-none",
                  "border-none",
                  "flex-1",
                  "break-keep",
                  "whitespace-nowrap",
                  "landing-sm:min-w-[244px]",
                  "py-2",
                  "landing-sm:py-3.5",
                  "px-4",
                  "rounded-3xl",
                  "transition-colors",
                  "ease-in-out",
                  "duration-150",
                  activeApp.name !== app.name && "bg-transparent",
                  activeApp.name === app.name && "bg-gray-200 dark:bg-gray-700",
                  activeApp.name !== app.name &&
                    "text-gray-600 dark:text-gray-400",
                  activeApp.name === app.name &&
                    "text-gray-900 dark:text-gray-0",
                  "landing-sm:bg-transparent",
                  "dark:landing-sm:bg-transparent",
                  "transition-colors",
                  "duration-150",
                  "ease-out",
                  "text-xs",
                  "landing-sm:text-sm",
                )}
              >
                {app.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "rounded-lg",
          "landing-md:rounded-xl",
          "landing-lg:rounded-2xl",
          "overflow-hidden",
          "shadow-sm shadow-gray-200 dark:shadow-none",
          "relative",
          "group/showcase-inner",
        )}
      >
        <div
          className={clsx(
            "w-full",
            "h-auto",
            "aspect-[1168/736]",
            "transition-colors",
            "duration-150",
            "ease-in-out",
            activeApp.dark ? "bg-gray-900" : "bg-gray-0",
          )}
        />
        <ShowcaseComponent
          className={clsx(
            "animate-showcase-reveal",
            "absolute",
            "left-0",
            "top-0",
            "w-full",
            "rounded-lg",
            "landing-md:rounded-xl",
            "landing-lg:rounded-2xl",
            "overflow-hidden",
          )}
        />
        <div
          key={activeApp.name}
          className={clsx(
            "hidden",
            "landing-lg:block",
            "landing-lg:opacity-0",
            "landing-lg:translate-y-24",
            "landing-lg:group-hover/showcase-inner:opacity-100 landing-lg:group-hover/showcase-inner:translate-y-0",
            "duration-300",
            "ease-in-out",
            "transition-[opacity,transform,background-color,color]",
            "absolute",
            "left-0",
            "bottom-0",
            "right-0",
            "w-full",
            "h-24",
            "opacity-0",
            activeApp.dark &&
              "bg-[linear-gradient(0deg,_#14141F_30%,_transparent_90%,_transparent_100%)]",
            !activeApp.dark &&
              "bg-[linear-gradient(0deg,_#FFFFFF_30%,_transparent_90%,_transparent_100%)]",
            "rounded-bl-lg rounded-br-lg",
            "landing-md:rounded-bl-xl landing-md:rounded-br-xl",
            "landing-lg:rounded-bl-2xl landing-lg:rounded-br-2xl",
          )}
        />
        <div
          className={clsx(
            "flex",
            "items-center",
            "justify-center",
            "landing-lg:-mb-4",
          )}
        >
          <a
            href={activeApp.link}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "hidden",
              "landing-lg:flex",
              "landing-lg:opacity-0",
              "landing-lg:translate-y-8",
              "landing-lg:group-hover/showcase-inner:opacity-100 landing-lg:group-hover/showcase-inner:translate-y-0",
              "duration-150",
              "delay-75",
              "ease-in-out",
              "transition-all",
              "landing-lg:mt-[-144px]",
              "hover:no-underline",
              "z-[3]",
              "py-2 landing-sm:py-4",
              "pl-4 pr-4 landing-sm:pl-6 landing-sm:pr-4",
              "rounded-[32px] landing-sm:rounded-[48px]",
              "items-center",
              "justify-center",
              "gap-2",
              "bg-refine-blue dark:bg-refine-cyan-alt",
              "bg-opacity-10 dark:bg-opacity-10",
              "landing-lg:bg-opacity-100 dark:landing-lg:bg-opacity-100",
              "text-refine-blue dark:text-refine-cyan-alt",
              "landing-lg:text-gray-0 dark:landing-lg:text-gray-900",
              "hover:brightness-125",
              "landing-lg:hover:scale-105 landing-lg:hover:brightness-100",
              "hover:text-refine-blue dark:hover:text-refine-cyan-alt",
              "landing-lg:hover:text-gray-0 dark:landing-lg:hover:text-gray-900",
              "landing-lg:border-8 landing-lg:border-solid",
              activeApp.dark
                ? "landing-lg:border-gray-900"
                : "landing-lg:border-gray-0",
            )}
          >
            <span
              className={clsx("text-xs landing-sm:text-base", "font-semibold")}
            >
              {activeApp.label}
            </span>
            <LandingArrowRightIcon />
          </a>
        </div>
      </div>
      <div
        className={clsx(
          "flex",
          "items-center",
          "justify-center",
          "landing-lg:-mb-4",
        )}
      >
        <a
          href={activeApp.link}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "landing-lg:opacity-0",
            "duration-150",
            "delay-75",
            "ease-in-out",
            "transition-all",
            "hover:no-underline",
            "z-[3]",
            "py-2 landing-sm:py-4",
            "pl-4 pr-4 landing-sm:pl-6 landing-sm:pr-4",
            "rounded-[32px] landing-sm:rounded-[48px]",
            "flex",
            "landing-lg:hidden",
            "items-center",
            "justify-center",
            "gap-2",
            "bg-refine-blue dark:bg-refine-cyan-alt",
            "bg-opacity-10 dark:bg-opacity-10",
            "landing-lg:bg-opacity-100 dark:landing-lg:bg-opacity-100",
            "text-refine-blue dark:text-refine-cyan-alt",
            "landing-lg:text-gray-0 dark:landing-lg:text-gray-900",
            "hover:brightness-125",
            "landing-lg:hover:scale-105 landing-lg:hover:brightness-100",
            "hover:text-refine-blue dark:hover:text-refine-cyan-alt",
            "landing-lg:hover:text-gray-0 dark:landing-lg:hover:text-gray-900",
            "landing-lg:border-8 landing-lg:border-solid",
            activeApp.dark
              ? "landing-lg:border-gray-900"
              : "landing-lg:border-gray-0",
          )}
        >
          <span
            className={clsx("text-xs landing-sm:text-base", "font-semibold")}
          >
            {activeApp.label}
          </span>
          <LandingArrowRightIcon />
        </a>
      </div>
    </div>
  );
};

const ShowcaseCRM = ({ className }: { className?: string }) => {
  return (
    <ShowcaseWrapper
      className={className}
      render="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/base-render.png"
      highlights={[
        {
          x: 224,
          y: 88,
          width: 296,
          height: 136,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/number_of_companies.png",
          codePosition: "right",
          code: `
                                import { useList } from "@refinedev/core";

                                const { data: { total } } = useList({
                                    resource: "companies"
                                });
                                `,
        },
        {
          x: 12,
          y: 88,
          width: 200,
          height: 376,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/sidebar_navigation.png",
          codePosition: "right",
          code: `
                    import { useMenu } from "@refinedev/core";
                    import { Link } from "react-router";

                    const { menuItems } = useMenu();

                    return menuItems.map((item) => (
                        <Link to={item.route}>
                            {item.icon}
                            {item.label}
                        </Link>
                    ));
                                `,
        },
        {
          x: 224,
          y: 240,
          width: 296,
          height: 472,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/upcoming_events.png",
          codePosition: "right",
          code: `
                    import { useList } from "@refinedev/core";

                    const { data } = useList({
                        resource: "events",
                        sorters: [
                            { field: "start_date", order: "asc" },
                        ],
                    });
                                `,
        },
        {
          x: 536,
          y: 240,
          width: 608,
          height: 472,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/latest_activities.png",
          codePosition: "left",
          code: `
                    import { useTable } from "@refinedev/core";

                    const { data } = useTable({
                        resource: "activities",
                        pagination: {
                            current: 1,
                            pageSize: 5,
                        },
                    });
                                `,
        },
        {
          x: 456,
          y: 16,
          width: 256,
          height: 32,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/search_bar.png",
          codePosition: "bottom",
          code: `
                    import { RefineKbar } from "@refinedev/kbar";

                    <RefineKbar />
                                `,
        },
        {
          x: 1120,
          y: 16,
          width: 32,
          height: 32,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/crm/user_avatar.png",
          codePosition: "left",
          code: `
                    import { useGetIdentity } from "@refinedev/core";

                    const { data: identity } = useGetIdentity();
                                `,
        },
      ]}
    />
  );
};

const ShowcaseHR = ({ className }: { className?: string }) => {
  return (
    <ShowcaseWrapper
      className={className}
      render="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/hr2/base_render.png"
      highlights={[
        {
          x: 244,
          y: 254,
          width: 520,
          height: 296,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/hr2/notifications.png",
          codePosition: "right",
          code: `
                                import { useList } from "@refinedev/core";

                                const { data } = useList({
                                    resource: "notifications",
                                    liveMode: "auto",
                                    filters: [
                                        {
                                            field: "isRead",
                                            operator: "eq",
                                            value: false
                                        },
                                    ]
                                });
                                `,
        },
        {
          x: 12,
          y: 174,
          width: 204,
          height: 360,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/hr2/menu.png",
          codePosition: "right",
          code: `
                import { useMenu, Link, CanAccess } from "@refinedev/core";
                import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

                const Sider = () => {
                  const { menuItems, selectedKey } = useMenu();
                  return (
                      <List>
                        {menuItems.map((item) => (
                          <CanAccess key={item.key} action="list" resource={item.name}>
                            <ListItem>
                              <ListItemButton component={Link} selected={selectedKey === item.key} to={item.route}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText>{item.label}</ListItemText>
                              </ListItemButton>
                            </ListItem>
                          </CanAccess>
                        ))}
                      </List>
                  );
                };
            `,
        },
        {
          x: 788,
          y: 254,
          width: 356,
          height: 296,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/hr2/poll.png",
          codePosition: "left",
          code: `
                        import { useList } from "@refinedev/core";

                        const { data } = useList({
                          resource: "polls",
                          filters: [{ field: "status", operator: "eq", value: "active" }],
                          pagination: { current: 1, pageSize: 1 },
                          liveMode: "auto",
                        });
                                `,
        },
        {
          x: 978,
          y: 22,
          width: 166,
          height: 36,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/hr2/request-time-off.png",
          codePosition: "left",
          code: `
                    import { CreateButton } from "@refinedev/mui";
                    import { TimeOffIcon } from "@/icons";

                    <CreateButton resource="time-offs" startIcon={<TimeOffIcon />}>
                      Request Time Off
                    </CreateButton>
                                `,
        },
        {
          x: 552,
          y: 78,
          width: 284,
          height: 128,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/hr2/sick-leave.png",
          codePosition: "left",
          code: `
                    import { useGetIdentity, useList } from "@refinedev/core";
                  
                    const { data: { employeeId } } = useGetIdentity();
                  
                    const { data } = useList({
                      resource: "time-offs", 
                      pagination: { current: 1, pageSize: 1 },
                      filters: [
                        {
                          field: "employeeId",
                          operator: "eq",
                          value: employeeId,
                        },
                        {
                          field: "status",
                          operator: "eq",
                          value: "approved",
                        },
                        {
                          field: "type",
                          operator: "eq",
                          value: "sick-leave",
                        },
                      ],
                    });
                    const totalSickLeave = data?.total;
                                `,
        },
      ]}
    />
  );
};

const ShowcaseECommerce = ({ className }: { className?: string }) => {
  return (
    <ShowcaseWrapper
      className={className}
      render="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/finefoods/base_render-2.png"
      highlights={[
        {
          x: 811,
          y: 10,
          width: 108,
          height: 44,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/finefoods/language-2.png",
          codePosition: "left",
          code: `
                            import { useSetLocale, useGetLocale } from "@refinedev/core";

                            const currentLanguage = useGetLocale();
                            const setLanguage = useSetLocale();

                            const onChange = (language: string) => {
                                setLanguage(language);
                            };
                            `,
        },
        {
          x: 184,
          y: 168,
          width: 616,
          height: 360,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/finefoods/map-2.png",
          codePosition: "right",
          codeClassName: "!pl-2",
          overlap: true,
          code: `
                            import { useShow } from "@refinedev/core";

                            const { data } = useShow({
                                liveMode: "auto"
                            });

                            return <Map {...data} />;
                            `,
        },
        {
          x: 956,
          y: 92,
          width: 204,
          height: 48,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/finefoods/actions-2.png",
          codePosition: "left",
          code: `
                    import { useResource, useUpdate } from "@refinedev/core";

                    const { id }  = useResource();
                    const { mutate } = useUpdate();

                    const onReject = () => mutate({
                        resource: “orders”,
                        id,
                        values: {
                            status: “rejected”,
                        },
                    });
                    `,
        },
        {
          x: 8,
          y: 216,
          width: 152,
          height: 120,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/finefoods/menu-2.png",
          codePosition: "right",
          code: `

                    import { Refine } from "@refinedev/core";

                    <Refine
                        resources={[
                            {
                                name: "stores",
                                meta: { ... },
                            }
                            {
                                name: "products",
                                meta: { parent: "stores" },
                            },
                            {
                                name: "categories",
                                meta: { parent: "stores" },
                            }
                        ]}
                    >
                        ...
                    </Refine>

                    `,
        },
      ]}
    />
  );
};

const ShowcaseDevOps = ({ className }: { className?: string }) => {
  return (
    <ShowcaseWrapper
      className={className}
      dark
      render="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/devops/base_render.png"
      highlights={[
        {
          x: 264,
          y: 16,
          width: 392,
          height: 704,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/devops/table.png",
          codePosition: "right",
          code: `
                        import { useTable } from "@refinedev/react-table";

                        const columns = [
                            {
                                id: "name",
                                header: "Name",
                                accessorKey: "name",
                            },
                            {
                                id: "cpu",
                                header: "CPU(cores)",
                                accessorKey: "cpu",
                            },
                            // ...
                        ];

                        const table = useTable({
                            columns,
                            refineCoreProps: {
                                liveMode: "auto",
                            }
                        });
                        `,
        },
        {
          x: 656,
          y: 16,
          width: 496,
          height: 55,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/devops/actions.png",
          codePosition: "left",
          code: `
                        import { useDelete, useResource } from "@refinedev/core";

                        const { id } = useResource();
                        const { mutate } = useDelete();

                        const onDelete = () => {
                            mutate({
                                resource: "pods",
                                id,
                            });
                        }
                        `,
        },
        {
          x: 656,
          y: 71,
          width: 496,
          height: 649,
          render:
            "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/showcase-images/devops/form.png",
          codePosition: "left",
          code: `
                        import { useModalForm } from "@refinedev/react-hook-form";

                        useModalForm({
                            refineCoreProps: {
                                resource: “pods”,
                                liveMode: “manual”,
                                queryMeta: {
                                    populate: [
                                        "labels",
                                        "conditions",
                                    ],
                                },
                            }
                        });
                        `,
        },
      ]}
    />
  );
};

const apps = [
  {
    name: "CRM Application",
    link: "https://example.crm.refine.dev",
    showcase: ShowcaseCRM,
    label: "See live demo",
  },
  {
    name: "E-Commerce Application",
    link: "https://example.admin.refine.dev",
    showcase: ShowcaseECommerce,
    label: "See live demo",
  },
  {
    name: "HR Application",
    link: "https://refine.dev/templates",
    showcase: ShowcaseHR,
    label: "Templates",
  },
  {
    name: "DevOps Dashboard",
    link: "https://refine.dev/templates",
    showcase: ShowcaseDevOps,
    dark: true,
    label: "Templates",
  },
];
