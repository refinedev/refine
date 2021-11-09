import { Icons } from "@pankod/refine";

require("./style.less");

const { LeftOutlined } = Icons;

export const OffLayoutArea = () => {
    return (
        <div className="toggle-container">
            <LeftOutlined />
            <a href="https://example.admin.refine.dev">
                Switch to <br />
                <strong>ADMIN PANEL</strong>
            </a>
        </div>
    );
};
