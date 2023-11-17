import { Spin } from "antd";

export const FullScreenLoading = () => {
    return (
        <Spin
            size="large"
            style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        />
    );
};
