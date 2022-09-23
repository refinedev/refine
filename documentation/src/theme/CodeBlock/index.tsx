import React from "react";
import CodeBlock from "@theme-original/CodeBlock";
import { LivePreview } from "../../components/live-preview";

export default function CodeBlockWrapper(
    props: JSX.IntrinsicAttributes & { live?: boolean },
): JSX.Element {
    if (props.live) {
        return <LivePreview {...props} />;
    }

    return <CodeBlock {...props} />;
}
