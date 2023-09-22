import { useNavigate } from "react-router-dom";

import { DeleteButton } from "@refinedev/antd";
import { useGetToPath } from "@refinedev/core";

export const ModalFooter = () => {
    const navigate = useNavigate();
    const getToPath = useGetToPath();

    return (
        <DeleteButton
            type="link"
            onSuccess={() => {
                navigate(
                    getToPath({
                        action: "list",
                    }) ?? "",
                    {
                        replace: true,
                    },
                );
            }}
        >
            Delete card
        </DeleteButton>
    );
};
