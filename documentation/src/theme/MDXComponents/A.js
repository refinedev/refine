import React from "react";
import Link from "@docusaurus/Link";
export default function MDXA(props) {
    let rel = "noopener noreferrer";
    if (props.href?.includes("github.com/pankod/refine")) {
        rel = "noopener";
    }
    return <Link {...props} rel={rel} />;
}
