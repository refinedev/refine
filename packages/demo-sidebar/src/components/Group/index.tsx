import React from "react";

interface GroupProps {
    title: string;
}

export const Group: React.FC<GroupProps> = ({ children, title }) => (
    <div style={{ marginBottom: 48 }}>
        <h3 className="ant-drawer-title" style={{ marginBottom: 24 }}>
            {title}
        </h3>
        {children}
    </div>
);
