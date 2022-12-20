import React from "react";
import Admonition from "@theme/Admonition";
import CodeBlock from "@theme/CodeBlock";

type Props = {
    path: string;
};

const ExampleLocalPrompt: React.FC<Props> = ({ path }) => {
    const REPO_TREE_URL = "https://github.com/refinedev/refine/tree";

    const SOURCE_URL = `${REPO_TREE_URL}/master/examples/${path}`;

    return (
        <Admonition type="create-example">
            <CodeBlock language="bash">
                {`npm create refine-app@latest -- --example ${path}`}
            </CodeBlock>
        </Admonition>
    );
};

export default ExampleLocalPrompt;
