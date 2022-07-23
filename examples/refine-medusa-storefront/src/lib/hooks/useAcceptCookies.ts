import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const COOKIE_NAME = "accept_cookies";

export const useAcceptCookies = () => {
    const [acceptedCookies, setAcceptedCookies] = useState(true);

    useEffect(() => {
        if (!Cookies.get(COOKIE_NAME)) {
            setAcceptedCookies(false);
        }
    }, []);

    const acceptCookies = () => {
        setAcceptedCookies(true);
        Cookies.set(COOKIE_NAME, "accepted", { expires: 365 });
    };

    return {
        acceptedCookies,
        onAcceptCookies: acceptCookies,
    };
};
