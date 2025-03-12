import React from "react";
import clsx from "clsx";
import Gravatar from "react-gravatar";

import { getMe } from "src/utils/me";

import type { MeResponse } from "src/interfaces/api";
import { logoutUser } from "src/utils/auth";
import { useNavigate } from "react-router";

export const HeaderAuthStatus = () => {
  const [me, setMe] = React.useState<MeResponse | null>(null);
  const [logoutVisible, setLogoutVisible] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    getMe().then((res) => (res ? setMe(res) : null));
  }, []);

  React.useEffect(() => {
    if (logoutVisible) {
      const listener = (e: MouseEvent) => {
        if (buttonRef.current?.contains(e.target as Node)) return;

        setLogoutVisible(false);
      };

      document.addEventListener("click", listener);

      return () => {
        document.removeEventListener("click", listener);
      };
    }

    return () => 0;
  }, [logoutVisible]);

  const logout = React.useCallback(() => {
    logoutUser().then(() => {
      setTimeout(() => {
        navigate("/login");
      }, 100);
    });
  }, [navigate]);

  return (
    <div className={clsx("re-px-2")}>
      {me && (
        <button
          type="button"
          ref={buttonRef}
          className={clsx(
            "re-appearance-none",
            "re-border-none",
            "re-bg-none",
            "relative",
            "re-w-8",
            "re-h-8",
            "re-rounded-full",
            "re-flex",
            "re-items-center",
            "re-justify-center",
            "re-group",
          )}
          onClick={() => setLogoutVisible(!logoutVisible)}
        >
          <Gravatar
            email={me?.email ?? ""}
            size={32}
            protocol="https://"
            style={{ borderRadius: "50%" }}
          />
          <div
            className={clsx(
              "re-absolute",
              "re-top-14",
              "re-right-2.5",
              "re-bg-gray-800",
              "re-border",
              "re-border-gray-700",
              "re-shadow-xl",
              "re-drop-shadow-md",
              "re-rounded",
              "re-transition-all",
              "re-duration-100",
              "re-ease-in-out",
              "re-origin-top-right",
              logoutVisible ? "re-scale-y-100" : "re-scale-y-0",
              logoutVisible ? "re-opacity-100" : "re-opacity-0",
            )}
          >
            <button
              type="button"
              className={clsx(
                "re-block",
                "re-rounded",
                "re-m-0",
                "re-appearance-none",
                "re-border-none",
                "re-px-4",
                "re-py-2",
                "re-text-xs",
                "re-text-gray-300",
                "hover:re-bg-gray-700",
              )}
              onClick={logout}
            >
              Sign out
            </button>
          </div>
        </button>
      )}
    </div>
  );
};
