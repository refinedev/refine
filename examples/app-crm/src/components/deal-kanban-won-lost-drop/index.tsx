import { FC } from "react";
import { useDroppable } from "@dnd-kit/core";
import cn from "classnames";
import { Text } from "../../components";

import styles from "./index.module.css";

export const DealKanbanWonLostDrop: FC = () => {
    return (
        <div className={styles.container}>
            <WonArea />
            <LostArea />
        </div>
    );
};

const WonArea = () => {
    const { setNodeRef } = useDroppable({ id: "won" });

    return (
        <div ref={setNodeRef} className={cn(styles.dropArea, styles.won)}>
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
    const { setNodeRef } = useDroppable({ id: "lost" });

    return (
        <div ref={setNodeRef} className={cn(styles.dropArea, styles.lost)}>
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
