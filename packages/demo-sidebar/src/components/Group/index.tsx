import React, { CSSProperties, ReactNode } from "react";

interface GroupProps {
    title: string;
    children: ReactNode;
}

const headerStyles: CSSProperties = {
    marginBottom: "12px",
    color: "rgba(0,0,0,.85)",
    fontSize: "14px",
    lineHeight: "24px",
};

const groupStyles: CSSProperties = { marginBottom: 48 };

export const Group: React.FC<GroupProps> = ({ children, title }) => (
    <div style={groupStyles}>
        <h3 className="ant-drawer-title" style={headerStyles}>
            {title}
        </h3>
        {children}
    </div>
);
