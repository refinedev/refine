import { LeftOutlined } from "@ant-design/icons";
import { RefineKbar } from "@refinedev/kbar";

import { ToggleContainer } from "./styled";

export const OffLayoutArea = () => {
    return (
        <ToggleContainer>
            <RefineKbar />
            <LeftOutlined />
        </ToggleContainer>
    );
};
