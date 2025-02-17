import {
  DevToolsContext,
  DevtoolsEvent,
  send,
} from "@refinedev/devtools-shared";
import React from "react";
import clsx from "clsx";
import { useSearchParams } from "react-router";
import { Authenticated } from "src/components/authenticated";

export const AfterLogin = () => {
  return (
    <Authenticated fallback={<Failure />}>
      <Success />
    </Authenticated>
  );
};

const Failure = () => {
  const { ws } = React.useContext(DevToolsContext);

  const [searchParams] = useSearchParams();
  const errorParam = searchParams.get("error");
  const errorCode = searchParams.get("code");

  React.useEffect(() => {
    if (ws) {
      send(ws, DevtoolsEvent.DEVTOOLS_LOGIN_FAILURE, {
        error: errorParam,
        code: errorCode,
      }).then(() => {
        window.close();
      });
    }
  }, [ws, errorCode, errorParam]);

  return <Wrapper>Login failed.</Wrapper>;
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

  return <Wrapper>Logged in successfully, you can close this window.</Wrapper>;
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
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
        {children}
      </div>
    </div>
  );
};
