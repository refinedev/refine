import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Admonition from "@theme/Admonition";
import MDXContent from "@theme/MDXContent";
import Heading from "@theme/Heading";
import Link from "@theme/Link";

type Props = {
    title?: string;
    path?: string;
    branch?: string;
    hideSource?: boolean;
};

const StackblitzExample: React.FC<Props> = ({
    title,
    path,
    branch: branchFromProps,
    hideSource,
}) => {
    const {
        siteConfig: { customFields },
    } = useDocusaurusContext();

    const { STACKBLITZ_EXAMPLE_BRANCH } = customFields as Record<
        string,
        string
    >;

    const branch = branchFromProps || STACKBLITZ_EXAMPLE_BRANCH;

    const REPO_TREE_URL = "https://github.com/refinedev/refine/tree";

    const SOURCE_URL = `${REPO_TREE_URL}/${branch}/${path}`;

    const STACKBLITZ_URL = `https://stackblitz.com/github/refinedev/refine/tree/${branch}/${path}`;

    const EDITOR_URL = `${STACKBLITZ_URL}?embed=1&view=preview&theme=dark&preset=node&ctl=1`;

    const slugify = (str: string) => {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    return (
        <div>
            {!hideSource && (
                <Admonition type="sourcecode" path={SOURCE_URL}></Admonition>
            )}
            <iframe
                loading="lazy"
                src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/multi-level-menu?embed=1&view=preview&theme=dark&preset=node&ctl=1"
                style={{
                    width: "100%",
                    height: "80vh",
                    border: "0px",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
                title="refine-multi-level-menu-example"
            ></iframe>
        </div>
    );
};

export default StackblitzExample;
