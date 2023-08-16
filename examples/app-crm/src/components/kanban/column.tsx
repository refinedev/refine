import { FC, PropsWithChildren } from "react";
import { UseDroppableArguments, useDroppable } from "@dnd-kit/core";
import { Affix, Button, Dropdown, MenuProps, Space } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";

import cn from "classnames";
import { Text } from "../text";

import styles from "./column.module.css";

type Props = {
    id: string;
    title: string;
    count: number;
    data?: UseDroppableArguments["data"];
    contextMenuItems?: MenuProps["items"];
    onAddClick?: (args: { id: string }) => void;
};

export const KanbanColumn: FC<PropsWithChildren<Props>> = ({
    children,
    id,
    title,
    count,
    data,
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
        <div ref={setNodeRef} className={styles.container}>
            <Affix offsetTop={64}>
                <div className={styles.header}>
                    <div className={styles.titleContainer}>
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
                        <div className={styles.count}>
                            <Text size="xs">{count}</Text>
                        </div>
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
                                placement="bottomCenter"
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
            </Affix>
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
