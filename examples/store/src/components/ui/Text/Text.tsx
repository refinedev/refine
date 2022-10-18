import React, {
    FunctionComponent,
    JSXElementConstructor,
    CSSProperties,
    PropsWithChildren,
} from "react";
import cn from "clsx";

import s from "./Text.module.css";

interface TextProps {
    variant?: Variant;
    className?: string;
    style?: CSSProperties;
    html?: string;
    onClick?: () => any; // eslint-disable-line
}

type Variant = "heading" | "body" | "pageHeading" | "sectionHeading";

export const Text: FunctionComponent<PropsWithChildren<TextProps>> = ({
    style,
    className = "",
    variant = "body",
    children,
    html,
    onClick,
}) => {
    const componentsMap: {
        // eslint-disable-next-line
        [P in Variant]: React.ComponentType<any> | string;
    } = {
        body: "div",
        heading: "h1",
        pageHeading: "h1",
        sectionHeading: "h2",
    };

    const Component:
        | JSXElementConstructor<any> // eslint-disable-line
        | React.ReactElement<any> // eslint-disable-line
        | React.ComponentType<any> // eslint-disable-line
        // eslint-disable-next-line
        | string = componentsMap![variant!];

    const htmlContentProps = html
        ? {
              dangerouslySetInnerHTML: { __html: html },
          }
        : {};

    return (
        <Component
            className={cn(
                s.root,
                {
                    [s.body]: variant === "body",
                    [s.heading]: variant === "heading",
                    [s.pageHeading]: variant === "pageHeading",
                    [s.sectionHeading]: variant === "sectionHeading",
                },
                className,
            )}
            onClick={onClick}
            style={style}
            {...htmlContentProps}
        >
            {children}
        </Component>
    );
};
