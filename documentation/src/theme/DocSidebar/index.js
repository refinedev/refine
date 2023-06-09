import DocSidebar from "@theme-original/DocSidebar";
import React from "react";

export default function DocSidebarWrapper(props) {
    return (
        <div className="refine-docs--sidebar">
            <DocSidebar {...props} />
        </div>
    );
}
