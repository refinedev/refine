import { useLocation } from "react-router-dom";

export const useSearchParams = (): URLSearchParams => {
    const { search } = useLocation();

    return new URLSearchParams(search);
};
