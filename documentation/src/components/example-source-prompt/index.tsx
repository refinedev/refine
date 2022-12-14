import React from "react";
import Admonition from "@theme/Admonition";

type Props = {
    path: string;
};

const ExampleSourcePrompt: React.FC<Props> = ({ path }) => {
    const REPO_TREE_URL = "https://github.com/refinedev/refine/tree";

    const SOURCE_URL = `${REPO_TREE_URL}/master/examples/${path}`;

    return <Admonition type="sourcecode" path={SOURCE_URL} />;
};

export default ExampleSourcePrompt;
