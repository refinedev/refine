import React from "react";
import CodeBlock from "@theme-original/CodeBlock";
import { LivePreview } from "../../components/live-preview";
import { LivePreviewShared } from "../../components/live-preview-shared";

export default function CodeBlockWrapper(
    props: JSX.IntrinsicAttributes & { live?: boolean; shared?: boolean },
): JSX.Element {
    if (props.shared && props.live) {
        return <LivePreviewShared {...props} />;
    } else if (props.live) {
        return <LivePreview {...props} />;
    }

    return <CodeBlock {...props} />;
}
