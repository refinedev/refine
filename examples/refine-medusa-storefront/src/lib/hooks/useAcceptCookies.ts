import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";

const COOKIE_NAME = "accept_cookies";

interface ReturnUseAcceptCookies {
    acceptedCookies: boolean;
    onAcceptCookies: () => void;
}

export const useAcceptCookies = (): ReturnUseAcceptCookies => {
    const [acceptedCookies, setAcceptedCookies] = useState(true);

    useEffect(() => {
        const cookies = parseCookies();
        if (!cookies.hasOwnProperty(COOKIE_NAME)) {
            setAcceptedCookies(false);
        }
    }, []);

    const acceptCookies = () => {
        setAcceptedCookies(true);
        setCookie(null, COOKIE_NAME, "accepted", {
            expires: 365,
        });
    };

    return {
        acceptedCookies,
        onAcceptCookies: acceptCookies,
    };
};
