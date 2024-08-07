import {
  CalendarIcon,
  DirectoryIcon,
  ExpenseIcon,
  HomeIcon,
  MyInfoIcon,
  TimeOffIcon,
} from "@/icons";
import type { ResourceProps } from "@refinedev/core";

export const employeeResources: ResourceProps[] = [
  {
    name: "overview",
    list: "/",
    meta: {
      label: "Home",
      icon: <HomeIcon />,
    },
  },
  {
    name: "My Info",
    list: "/my-info",
    meta: {
      label: "My Info",
      icon: <MyInfoIcon />,
    },
  },
  {
    name: "time-off",
    list: "/time-off",
    create: "/time-off/new",
    meta: {
      label: "Time Off",
      icon: <TimeOffIcon />,
    },
  },
  {
    name: "Calendar",
    list: "/calendar",
    meta: {
      label: "Calendar",
      icon: <CalendarIcon />,
    },
  },
  {
    name: "Directory",
    list: "/directory",
    meta: {
      label: "Directory",
      icon: <DirectoryIcon />,
    },
  },
  {
    name: "Expenses",
    list: "/expenses",
    meta: {
      label: "Expenses",
      icon: <ExpenseIcon />,
    },
  },
];
