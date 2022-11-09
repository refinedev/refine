import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

/**
 * CodeHighlight component renders the code in a pretty way with `prism-react-renderer` library.
 * By default, code overflowing 50vh will be scrollable; this can be adjusted with the `wrapperProps` prop.
 */
export const CodeHighlight: React.FC<{
    code: string;
    wrapperProps?: React.ComponentProps<"div">;
}> = ({ code, wrapperProps }) => {
    return (
        <div
            style={{ maxHeight: "50vh", height: "100%", overflow: "scroll" }}
            {...(wrapperProps ?? {})}
        >
            <Highlight {...defaultProps} code={code} language="tsx">
                {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                }) => (
                    <pre
                        className={className}
                        style={{ ...style, padding: "14px", marginBottom: "0" }}
                    >
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => (
                                    <span
                                        key={key}
                                        {...getTokenProps({ token, key })}
                                    />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    );
};
