import { useEffect, useRef } from "react";

export const useFirstRender = () => {
    const firstRender = useRef(true);

    useEffect(() => {
        firstRender.current = false;
    }, []);

    return firstRender.current;
};
