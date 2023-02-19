import { RouterBindingsContext } from "@contexts/router";
import React, { useContext } from "react";

export const useLink = () => {
    const bindings = useContext(RouterBindingsContext);

    if (bindings?.Link) {
        return bindings.Link;
    }

    const FallbackLink: Required<typeof bindings>["Link"] = ({
        to,
        ...rest
    }) => <a href={to} {...rest} />;

    return FallbackLink;
};
