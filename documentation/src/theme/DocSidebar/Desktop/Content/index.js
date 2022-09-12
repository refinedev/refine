import React from "react";
import Content from "@theme-original/DocSidebar/Desktop/Content";
// import CustomVersionDropdown from "../../../../components/custom-version-dropdown";

export default function ContentWrapper(props) {
    return (
        <>
            {/* <div className="pl-7 pr-3.5 py-2.5">
                <CustomVersionDropdown />
            </div> */}
            <Content {...props} />
        </>
    );
}
