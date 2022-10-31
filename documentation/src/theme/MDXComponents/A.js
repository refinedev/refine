import React from "react";
import Link from "@docusaurus/Link";
import { getLinkRel } from "@site/src/utils/link-rel";

export default function MDXA(props) {
    const rel = getLinkRel(props?.href);

    return <Link {...props} rel={rel} />;
}
