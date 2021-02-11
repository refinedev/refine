import { useLocation } from "react-router-dom";

export const useSearchParams = (): Record<string, string> => {
    const { search } = useLocation();

    const searchParams = new URLSearchParams(search);

    const parsed: Record<string, string> = {};

    for (const pair of searchParams.entries()) {
        parsed[pair[0]] = pair[1];
    }

    return parsed;
};
