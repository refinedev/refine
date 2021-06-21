import { useContext } from "react";
import { RefineContext } from "@contexts/refine";
import { TitleProps } from "../../interfaces";

export const useTitle: () => React.FC<TitleProps> = () => {
    const { Title } = useContext(RefineContext);

    return Title;
};
