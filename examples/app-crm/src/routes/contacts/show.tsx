import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetToPath, useResource } from "@refinedev/core";

export const ContactShowPage = () => {
    const { id } = useResource();
    const navigate = useNavigate();
    const getToPath = useGetToPath();

    return (
        <Drawer
            open
            onClose={() => {
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
            <div>show drawer content id: {id}</div>
        </Drawer>
    );
};
