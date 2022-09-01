import React from "react";
import Head from "@docusaurus/Head";
// MDX elements are wrapped through the MDX pragma. In some cases (notably usage
// with Head/Helmet) we need to unwrap those elements.
function unwrapMDXElement(element) {
    if (element.props?.mdxType && element.props.originalType) {
        const { mdxType, originalType, ...newProps } = element.props;
        return React.createElement(element.props.originalType, newProps);
    }
    return element;
}
export default function MDXHead(props) {
    const unwrappedChildren = React.Children.map(props.children, (child) =>
        React.isValidElement(child) ? unwrapMDXElement(child) : child,
    );
    return <Head {...props}>{unwrappedChildren}</Head>;
}
