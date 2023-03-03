import * as Icons from "@ant-design/icons";
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
