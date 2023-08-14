import React from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetToPath } from "@refinedev/core";

export const CalendarCreatePage = () => {
    const navigate = useNavigate();
    const getToPath = useGetToPath();

    return (
        <Modal
            open
            onCancel={() => {
                navigate(
                    getToPath({
                        action: "list",
                    }) ?? "",
                    {
                        replace: true,
                    },
                );
            }}
            width={560}
        >
            <div>create modal content</div>
        </Modal>
    );
};
