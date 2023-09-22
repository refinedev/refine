import { FC, PropsWithChildren } from "react";

import {
    DndContext,
    DragEndEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import styles from "./index.module.css";

type Props = {
    onDragEnd: (event: DragEndEvent) => void;
};

export const KanbanBoard: FC<PropsWithChildren<Props>> = ({
    onDragEnd,
    children,
}) => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            distance: 5,
        },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    const handleDragEnd = (event: DragEndEvent) => {
        if (event.over === null) {
            return;
        }

        onDragEnd(event);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                    {children}
                </DndContext>
            </div>
        </div>
    );
};

export const KanbanBoardSkeleton: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>{children}</div>
        </div>
    );
};
