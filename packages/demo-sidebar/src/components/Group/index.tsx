import React from "react";

interface GroupProps {
    title: string;
}

export const Group: React.FC<GroupProps> = ({ children, title }) => (
    <div style={{ marginBottom: 24 }}>
        <h3 className="ant-drawer-title">{title}</h3>
        {children}
    </div>
);
