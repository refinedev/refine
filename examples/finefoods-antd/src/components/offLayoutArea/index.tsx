import { Icons } from "@pankod/refine-antd";
import { RefineKbar } from "@pankod/refine-kbar";

import { ToggleContainer } from "./styled";

const { LeftOutlined } = Icons;

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
