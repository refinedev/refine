import React from "react";
import { CodeBlock } from "../theme/CodeBlock/base";
import { CommandLineIcon } from "./icons/command-line";

type Props = {
    path: string;
};

export const CommonRunLocalPrompt = ({ path }: Props) => {
    return (
        <CodeBlock
            language="bash"
            title="Run on your local"
            icon={<CommandLineIcon className="text-gray-500" />}
        >
            {`npm create refine-app@latest -- --example ${path}`}
        </CodeBlock>
    );
};
