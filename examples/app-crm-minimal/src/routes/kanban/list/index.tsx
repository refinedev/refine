import React, { PropsWithChildren } from "react";
import { ProjectKanbanList } from "../components";

export const KanbanListPage: React.FC<PropsWithChildren> = ({ children }) => {
    return <ProjectKanbanList>{children}</ProjectKanbanList>;
};
