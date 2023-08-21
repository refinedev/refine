import { UseDraggableArguments, useDraggable } from "@dnd-kit/core";
import { FC, PropsWithChildren } from "react";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    id: string;
    data?: UseDraggableArguments["data"];
}

export const KanbanItem: FC<PropsWithChildren<Props>> = ({
    children,
    id,
    data,
}) => {
    const { attributes, listeners, transform, setNodeRef, isDragging, active } =
        useDraggable({
            id,
            data,
        });
    return (
        <div
            style={{
                position: "relative",
            }}
        >
            <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                style={{
                    opacity: active ? (active.id === id ? 1 : 0.5) : 1,
                    boxShadow:
                        active?.id === id
                            ? "0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08)"
                            : "",
                    borderRadius: "8px",
                    position: "relative",
                    zIndex: isDragging ? 9999 : 0,
                    transform: CSS.Translate.toString(transform),
                    cursor: isDragging ? "grabbing" : "grab",
                }}
            >
                {children}
            </div>
            {isDragging && (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                        border: "2px dashed rgba(0, 0, 0, 0.25)",
                        borderRadius: "8px",
                    }}
                />
            )}
        </div>
    );
};
