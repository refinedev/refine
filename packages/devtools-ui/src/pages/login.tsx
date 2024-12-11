import {
  DevToolsContext,
  DevtoolsEvent,
  receive,
} from "@refinedev/devtools-shared";
import clsx from "clsx";
import React from "react";
import { useSearchParams } from "react-router";

import { FeatureSlide, FeatureSlideMobile } from "src/components/feature-slide";
import { GithubIcon } from "src/components/icons/github";
import { GoogleIcon } from "src/components/icons/google";
import { LogoIcon } from "src/components/icons/logo";
import { AUTH_TRIGGER_API_PATH } from "src/utils/constants";

export const Login = () => {
  return (
    <div
      className={clsx(
        "re-min-h-screen re-w-full",
        "re-grid re-grid-cols-1 large:re-grid-cols-2 re-gap-4",
        "re-p-4",
      )}
    >
      <div
        className={clsx(
          "re-flex",
          "re-justify-center",
          "re-items-center",
          "re-rounded-lg",
          "re-bg-gray-800",
          "re-hidden large:re-flex",
        )}
      >
        <FeatureSlide className={clsx("re-w-full", "re-max-w-3xl")} />
      </div>
      <div
        className={clsx(
          "re-flex",
          "re-flex-col",
          "re-items-center",
          "re-justify-center",
        )}
      >
        <LoginForm className={clsx("re-pt-2 tall:re-pt-0")} />
        <FeatureSlideMobile
          className={clsx("re-flex large:re-hidden", "re-mt-12")}
        />
      </div>
    </div>
  );
};

const providers = [
  {
    name: "github",
    icon: <GithubIcon className="re-w-6 re-h-6" />,
    label: "Sign in with GitHub",
    callback: "",
  },
  {
    name: "google",
    icon: <GoogleIcon className="re-w-6 re-h-6" />,
    label: "Sign in with Google",
    callback: "",
  },
];

const LoginForm = (props: { className?: string }) => {
  const { ws } = React.useContext(DevToolsContext);
  const [searchParams] = useSearchParams();
  const errorParam = searchParams.get("error");
  const [sentError, setSentError] = React.useState<string | null>(null);

  const error = errorParam || sentError;

  React.useEffect(() => {
    if (ws) {
      const unsub = receive(
        ws,
        DevtoolsEvent.DEVTOOLS_RELOAD_AFTER_LOGIN,
        () => {
          window.location.reload();
        },
      );
      return unsub;
    }
    return () => 0;
  }, [ws]);

  React.useEffect(() => {
    if (ws) {
      const unsub = receive(
        ws,
        DevtoolsEvent.DEVTOOLS_DISPLAY_LOGIN_FAILURE,
        (payload) => {
          setSentError(payload.error);
        },
      );
      return unsub;
    }
    return () => 0;
  }, [ws]);

  return (
    <div
      className={clsx(
        "re-max-w-[336px]",
        "re-w-full",
        "re-flex",
        "re-flex-col",
        "re-gap-16",
        "re-justify-center",
        "re-items-center",
        props.className,
      )}
    >
      <LogoIcon height={60} width={252} />
      <div
        className={clsx(
          "re-w-full",
          "re-flex",
          "re-flex-col",
          "re-items-center",
          "re-justify-center",
          "re-gap-4",
        )}
      >
        {providers.map(({ name, icon, label }) => (
          <a
            key={name}
            href={`${AUTH_TRIGGER_API_PATH}?provider=${name}`}
            target="_blank"
            rel="noreferrer"
            className={clsx(
              "re-w-full",
              "re-py-2.5",
              "re-px-4",
              "re-bg-gray-0",
              "re-text-gray-900",
              "re-text-base",
              "re-leading-6",
              "re-font-semibold",
              "re-gap-4",
              "re-flex",
              "re-items-center",
              "re-justify-center",
              "re-rounded",
            )}
          >
            {icon}
            <span>{label}</span>
          </a>
        ))}
      </div>
      {error && (
        <div
          className={clsx(
            "re-bg-alt-yellow",
            "re-bg-opacity-20",
            "re-border-2",
            "re-border-alt-yellow",
            "re-text-alt-yellow",
            "re-text-xs",
            "re-p-3",
            "re-rounded",
          )}
        >
          {error}
        </div>
      )}
    </div>
  );
};
