import { FC, PropsWithChildren, ReactNode, memo } from "react";
import { UseDroppableArguments, useDroppable } from "@dnd-kit/core";
import { Button, Dropdown, MenuProps } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import cn from "classnames";
import { Text } from "../../text";

import styles from "./index.module.css";

type Props = {
    id: string;
    title: string;
    description?: ReactNode;
    count: number;
    data?: UseDroppableArguments["data"];
    variant?: "default" | "solid";
    contextMenuItems?: MenuProps["items"];
    onAddClick?: (args: { id: string }) => void;
};

export const KanbanColumn: FC<PropsWithChildren<Props>> = ({
    children,
    id,
    title,
    description,
    count,
    data,
    variant = "default",
    contextMenuItems,
    onAddClick,
}) => {
    const { isOver, setNodeRef } = useDroppable({
        id,
        data,
    });

    const onAddClickHandler = () => {
        onAddClick?.({ id });
    };

    return (
        <div ref={setNodeRef} className={cn(styles.container, styles[variant])}>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>
                        <Text
                            ellipsis={{ tooltip: title }}
                            size="xs"
                            strong
                            style={{
                                textTransform: "uppercase",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {title}
                        </Text>
                        {!!count && (
                            <div className={styles.count}>
                                <Text size="xs">{count}</Text>
                            </div>
                        )}
                    </div>
                    <div className={styles.actionContainer}>
                        {contextMenuItems && (
                            <Dropdown
                                trigger={["click"]}
                                menu={{
                                    items: contextMenuItems,
                                    onPointerDown: (e) => {
                                        e.stopPropagation();
                                    },
                                    onClick: (e) => {
                                        e.domEvent.stopPropagation();
                                    },
                                }}
                                placement="bottom"
                                arrow={{ pointAtCenter: true }}
                            >
                                <Button
                                    type="text"
                                    shape="circle"
                                    icon={
                                        <MoreOutlined
                                            style={{
                                                transform: "rotate(90deg)",
                                            }}
                                        />
                                    }
                                />
                            </Dropdown>
                        )}
                        <Button
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={onAddClickHandler}
                        />
                    </div>
                </div>
                {description}
            </div>
            <div
                className={cn(styles.childrenWrapper, {
                    [styles.isOver]: isOver,
                })}
            >
                {children}
            </div>
        </div>
    );
};

export const KanbanColumnMemo = memo(KanbanColumn, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.title === next.title &&
        prev.description === next.description &&
        prev.count === next.count &&
        prev.variant === next.variant
    );
});
