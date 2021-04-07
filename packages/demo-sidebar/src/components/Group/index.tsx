import React, { CSSProperties } from "react";

interface GroupProps {
    title: string;
}

const headerStyles: CSSProperties = {
    marginBottom: "12px",
    color: "rgba(0,0,0,.85)",
    fontSize: "14px",
    lineHeight: "24px",
};

export const Group: React.FC<GroupProps> = ({ children, title }) => (
    <div style={{ marginBottom: 48 }}>
        <h3 className="ant-drawer-title" style={headerStyles}>
            {title}
        </h3>
        {children}
    </div>
);
