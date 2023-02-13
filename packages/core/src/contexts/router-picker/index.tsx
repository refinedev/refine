import React from "react";

/**
 * This context is used to determine which router to use.
 *
 * This is a temporary solution until we remove the legacy router.
 */

export const RouterPickerContext = React.createContext<"legacy" | "new">("new");

export const RouterPickerProvider = RouterPickerContext.Provider;

/**
 * This is a temporary hook to determine which router to use.
 * It will be removed once the legacy router is removed.
 * @internal This is an internal hook.
 */
export const useRouterType = () => {
    const value = React.useContext(RouterPickerContext);
    return value;
};
