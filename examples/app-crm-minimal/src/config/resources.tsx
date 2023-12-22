import type { IResourceItem } from "@refinedev/core";

import {
    DashboardOutlined,
    ProjectOutlined,
    ShopOutlined,
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
        name: "tasks",
        list: "/kanban",
        create: "/kanban/create",
        edit: "/kanban/edit/:id",
        meta: {
            label: "Kanban",
            icon: <ProjectOutlined />,
        },
    },

    {
        name: "companies",
        list: "/companies",
        show: "/companies/:id",
        create: "/companies/create",
        edit: "/companies/edit/:id",
        meta: {
            label: "Companies",
            icon: <ShopOutlined />,
        },
    },
];
