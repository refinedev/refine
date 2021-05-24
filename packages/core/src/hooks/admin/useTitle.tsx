import { useContext } from "react";
import { AdminContext } from "@contexts/admin";
import { TitleProps } from "../../interfaces";

export const useTitle: () => React.FC<TitleProps> = () => {
    const { Title } = useContext(AdminContext);

    return Title;
};
