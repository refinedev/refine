import { IRouterProvider, RouterBindings } from "src/interfaces";

export const checkRouterPropMisuse = (
    value: IRouterProvider | RouterBindings,
) => {
    // check if `routerProvider` prop is passed with legacy properties.
    // If yes, console.warn the user to use `legacyRuterProvider` prop instead.
    const bindings = ["go", "parse", "back", "Link"];

    // check if `value` contains properties other than `bindings`
    const otherProps = Object.keys(value).filter(
        (key) => !bindings.includes(key),
    );

    const hasOtherProps = otherProps.length > 0;

    if (hasOtherProps) {
        console.warn(
            `Unsupported properties are found in \`routerProvider\` prop. You provided \`${otherProps.join(
                ", ",
            )}\`. Supported properties are \`${bindings.join(
                ", ",
            )}\`. You may wanted to use \`legacyRouterProvider\` prop instead.`,
        );

        return true;
    }

    return false;
};
