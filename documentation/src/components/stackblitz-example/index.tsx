import React from "react";
import Admonition from "@theme/Admonition";
import CodeBlock from "@theme/CodeBlock";

type Props = {
    path?: string;
    branch?: string;
    hideSource?: boolean;
    hideLocal?: boolean;
};

const StackblitzExample: React.FC<Props> = ({
    path,
    hideSource,
    hideLocal,
}) => {
    const REPO_TREE_URL = "https://github.com/refinedev/refine/tree";

    const SOURCE_URL = `${REPO_TREE_URL}/master/examples/${path}`;

    const STACKBLITZ_URL = `https://stackblitz.com/github/refinedev/refine/tree/master/${path}`;

    const EDITOR_URL = `${STACKBLITZ_URL}?embed=1&view=preview&theme=dark&preset=node&ctl=1`;

    return (
        <div>
            {!hideSource && (
                <Admonition type="sourcecode" path={SOURCE_URL}></Admonition>
            )}
            {!hideLocal && (
                <Admonition type="create-example">
                    <CodeBlock language="bash">
                        {`npm create refine-app@latest --example ${path}`}
                    </CodeBlock>
                </Admonition>
            )}
            <iframe
                loading="lazy"
                // src={EDITOR_URL}
                src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/dataProvider/appwrite/?embed=1&view=preview&theme=dark&preset=node&ctl=1"
                style={{
                    width: "100%",
                    height: "80vh",
                    border: "0px",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
                title={path}
            ></iframe>
        </div>
    );
};

export default StackblitzExample;
