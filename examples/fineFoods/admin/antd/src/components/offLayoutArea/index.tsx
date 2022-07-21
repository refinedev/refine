import { Icons } from "@pankod/refine-antd";
import { RefineKbar } from "@pankod/refine-kbar";

import "./style.less";

const { LeftOutlined } = Icons;

export const OffLayoutArea = () => {
    return (
        <div className="toggle-container">
            <RefineKbar />
            <LeftOutlined />
            <a href="https://example.refine.dev">
                Switch to <br />
                <strong>CLIENT APP</strong>
            </a>
        </div>
    );
};
