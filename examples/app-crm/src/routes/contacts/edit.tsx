import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetToPath, useResource } from "@refinedev/core";

export const ContactEditPage = () => {
    const { id } = useResource();
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
            <div>edit modal content id: {id}</div>
        </Modal>
    );
};
