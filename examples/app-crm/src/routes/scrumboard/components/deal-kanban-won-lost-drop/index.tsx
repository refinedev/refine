import { FC, useState } from "react";

import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import cn from "classnames";

import { Text } from "@/components";

import styles from "./index.module.css";

export const DealKanbanWonLostDrop: FC = () => {
    const [show, setShow] = useState(false);

    useDndMonitor({
        onDragStart: () => setShow(true),
        onDragEnd: () => setShow(false),
    });

    if (!show) {
        return null;
    }

    return (
        <div className={styles.container}>
            <WonArea />
            <LostArea />
        </div>
    );
};

const WonArea = () => {
    const { setNodeRef, over } = useDroppable({ id: "won" });

    return (
        <div
            ref={setNodeRef}
            className={cn(styles.dropArea, styles.won, {
                [styles.isOver]: over?.id === "won",
            })}
        >
            <Text
                style={{
                    color: "inherit",
                }}
                size="xxxl"
            >
                WON 🎉
            </Text>
        </div>
    );
};

const LostArea = () => {
    const { setNodeRef, over } = useDroppable({ id: "lost" });

    return (
        <div
            ref={setNodeRef}
            className={cn(styles.dropArea, styles.lost, {
                [styles.isOver]: over?.id === "lost",
            })}
        >
            <Text
                style={{
                    color: "inherit",
                }}
                size="xxxl"
            >
                LOST 🙁
            </Text>
        </div>
    );
};
