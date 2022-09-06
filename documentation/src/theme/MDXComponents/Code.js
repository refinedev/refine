import React, { isValidElement } from "react";
import CodeBlock from "@theme/CodeBlock";
export default function MDXCode(props) {
    const inlineElements = [
        "a",
        "b",
        "big",
        "i",
        "span",
        "em",
        "strong",
        "sup",
        "sub",
        "small",
    ];
    const shouldBeInline = React.Children.toArray(props.children).every(
        (el) =>
            (typeof el === "string" && !el.includes("\n")) ||
            (isValidElement(el) && inlineElements.includes(el.props?.mdxType)),
    );
    return shouldBeInline ? <code {...props} /> : <CodeBlock {...props} />;
}
