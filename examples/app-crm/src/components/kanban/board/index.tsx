import { FC, PropsWithChildren } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import styles from "./index.module.css";

type Props = {
    onDragEnd: (event: DragEndEvent) => void;
};

export const KanbanBoard: FC<PropsWithChildren<Props>> = ({
    onDragEnd,
    children,
}) => {
    const handleDragEnd = (event: DragEndEvent) => {
        onDragEnd(event);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>
            </div>
        </div>
    );
};
