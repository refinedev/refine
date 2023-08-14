import type { IResourceItem } from "@refinedev/core";

import {
    DashboardOutlined,
    CalendarOutlined,
    ProjectOutlined,
    ShopOutlined,
    TeamOutlined,
    ContainerOutlined,
    CrownOutlined,
} from "@ant-design/icons";

export const resources: IResourceItem[] = [
    {
        name: "dashboard",
        list: "/",
        meta: {
            label: "Dashboard",
            icon: <DashboardOutlined />,
        },
    },
    {
        name: "calendar",
        list: "/calendar/:type",
        create: "/calendar/:type/create",
        edit: "/calendar/:type/edit/:id",
        show: "/calendar/:type/show/:id",
        meta: {
            label: "Calendar",
            icon: <CalendarOutlined />,
            type: "month",
        },
    },
    {
        name: "scrumboard",
        meta: {
            label: "Scrumboard",
            icon: <ProjectOutlined />,
        },
    },
    {
        name: "kanban",
        list: "/scrumboard/kanban",
        meta: {
            label: "Project Kanban",
            parent: "scrumboard",
        },
    },
    {
        name: "sales",
        list: "/scrumboard/sales",
        meta: {
            label: "Sales Pipeline",
            parent: "scrumboard",
        },
    },
    {
        name: "companies",
        list: "/companies",
        show: "/companies/:id",
        meta: {
            label: "Companies",
            icon: <ShopOutlined />,
        },
    },
    {
        name: "contacts",
        list: "/contacts",
        meta: {
            label: "Contacts",
            icon: <TeamOutlined />,
        },
    },
    {
        name: "quotes",
        list: "/quotes",
        meta: {
            label: "Quotes",
            icon: <ContainerOutlined />,
        },
    },
    {
        name: "administration",
        meta: {
            label: "Administration",
            icon: <CrownOutlined />,
        },
    },
    {
        name: "settings",
        list: "/administration/settings",
        meta: {
            label: "Settings",
            parent: "administration",
        },
    },
    {
        name: "audit-log",
        list: "/administration/audit-log",
        meta: {
            label: "Audit Log",
            parent: "administration",
        },
    },
];
