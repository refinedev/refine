import { FC, PropsWithChildren, ReactNode } from "react";

import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { useDroppable, UseDroppableArguments } from "@dnd-kit/core";
import { Button, Dropdown, MenuProps, Skeleton } from "antd";
import cn from "classnames";

import { Text } from "@/components";

import styles from "./index.module.css";

type Variant = "default" | "solid";

type Props = {
    id: string;
    title: string;
    description?: ReactNode;
    count: number;
    data?: UseDroppableArguments["data"];
    variant?: Variant;
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
    const { isOver, setNodeRef, active } = useDroppable({
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
                className={cn(styles.columnScrollableContainer, {
                    [styles.isOver]: isOver,
                    [styles.active]: active,
                })}
            >
                <div className={cn(styles.childrenWrapper)}>{children}</div>
            </div>
        </div>
    );
};

export const KanbanColumnSkeleton: FC<
    PropsWithChildren<{ type: "deal" | "project"; variant?: Variant }>
> = ({ children, type, variant = "default" }) => {
    return (
        <div className={cn(styles.container, styles[variant])}>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <Skeleton.Button size="small" style={{ width: "125px" }} />
                    <Button
                        disabled
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
                    <Button disabled shape="circle" icon={<PlusOutlined />} />
                </div>
                {type === "deal" && (
                    <Skeleton.Button size="small" style={{ width: "175px" }} />
                )}
            </div>
            <div className={cn(styles.columnScrollableContainer)}>
                <div className={cn(styles.childrenWrapper)}>{children}</div>
            </div>
        </div>
    );
};
