import { useContext } from "react";
import { RefineContext } from "@contexts/refine";
import { TitleProps } from "../../interfaces";

/**
 * `useTitle` returns a component that calls the `<Title>` passed to the `<Refine>`.
 * In this way, it becomes easier for us to access this component in various parts of the application.
 *
 * @see {@link https://refine.dev/docs/core/hooks/refine/useTitle} for more details.
 */
export const useTitle: () => React.FC<TitleProps> | undefined = () => {
    const { Title } = useContext(RefineContext);

    return Title;
};
