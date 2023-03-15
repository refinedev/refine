import { LeftOutlined } from "@ant-design/icons";
import { RefineKbar } from "@refinedev/kbar";

import { ToggleContainer } from "./styled";

export const OffLayoutArea = () => {
    return (
        <ToggleContainer>
            <RefineKbar />
            <LeftOutlined />
            <a href="https://example.refine.dev">
                Switch to <br />
                <strong>CLIENT APP</strong>
            </a>
        </ToggleContainer>
    );
};
