import {
  DevToolsContext,
  DevtoolsEvent,
  send,
} from "@refinedev/devtools-shared";
import clsx from "clsx";
import React from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { Authenticated } from "src/components/authenticated";

export const AfterLogin = () => {
  return (
    <Authenticated fallback={<Failure />}>
      <Success />
    </Authenticated>
  );
};

const Failure = () => {
  const [searchParams] = useSearchParams();
  const errorParam = searchParams.get("error");

  return <Navigate to={`/login${errorParam ? `?error=${errorParam}` : ""}`} />;
};

const Success = () => {
  const { ws } = React.useContext(DevToolsContext);

  React.useEffect(() => {
    if (ws) {
      send(ws, DevtoolsEvent.DEVTOOLS_LOGIN_SUCCESS, {}).then(() => {
        window.close();
      });
    }
  }, [ws]);

  return (
    <div
      className={clsx(
        "re-flex-1",
        "re-flex",
        "re-items-center",
        "re-justify-center",
        "re-py-16",
      )}
    >
      <div
        className={clsx(
          "re-w-full",
          "re-flex",
          "re-flex-col",
          "re-gap-16",
          "re-justify-center",
          "re-items-center",
          "re-text-center",
          "re-text-gray-300",
          "re-text-sm",
        )}
      >
        Logged in successfully, you can close this window.
      </div>
    </div>
  );
};
