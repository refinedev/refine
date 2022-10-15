import React, { useEffect, RefObject, PropsWithChildren } from "react";
import { tabbable } from "tabbable";

interface Props {
    focusFirst?: boolean;
}

export default function FocusTrap({
    children,
    focusFirst = false,
}: PropsWithChildren<Props>) {
    // eslint-disable-next-line
    const root: RefObject<any> = React.useRef();
    // eslint-disable-next-line
    const anchor: RefObject<any> = React.useRef(document.activeElement);

    const returnFocus = () => {
        // Returns focus to the last focused element prior to trap.
        if (anchor) {
            anchor.current.focus();
        }
    };

    const trapFocus = () => {
        // Focus the container element
        if (root.current) {
            root.current.focus();
            if (focusFirst) {
                selectFirstFocusableEl();
            }
        }
    };

    const selectFirstFocusableEl = () => {
        // Try to find focusable elements, if match then focus
        // Up to 6 seconds of load time threshold
        let match = false;
        const end = 60; // Try to find match at least n times
        let i = 0;
        const timer = setInterval(() => {
            if (!match !== i > end) {
                match = !!tabbable(root.current).length;
                if (match) {
                    // Attempt to focus the first el
                    tabbable(root.current)[0].focus();
                }
                i = i + 1;
            } else {
                // Clear interval after n attempts
                clearInterval(timer);
            }
        }, 100);
    };

    useEffect(() => {
        setTimeout(trapFocus, 20);
        return () => {
            returnFocus();
        };
    }, [root]);

    return React.createElement(
        "div",
        {
            ref: root,
            className: "outline-none focus-trap",
            tabIndex: -1,
        },
        children,
    );
}
