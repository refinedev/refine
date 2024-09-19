import { TimeOffIcon } from "@/icons";
import { RequestsIcon } from "@/icons/requests";
import { Role } from "@/types";
import type { ResourceProps } from "@refinedev/core";

export const resources: ResourceProps[] = [
  {
    name: "employee",
    meta: {
      scope: Role.EMPLOYEE,
      order: 2,
    },
  },
  {
    name: "manager",
    meta: {
      scope: Role.MANAGER,
      order: 1,
    },
  },
  {
    name: "time-offs",
    list: "/employee/time-offs",
    create: "/employee/time-offs/new",
    meta: {
      parent: "employee",
      scope: Role.EMPLOYEE,
      label: "Time Off",
      icon: <TimeOffIcon />,
    },
  },
  {
    name: "time-offs",
    list: "/manager/requests",
    edit: "/manager/requests/:id/edit",
    identifier: "requests",
    meta: {
      parent: "manager",
      scope: Role.MANAGER,
      label: "Requests",
      icon: <RequestsIcon />,
    },
  },
];
