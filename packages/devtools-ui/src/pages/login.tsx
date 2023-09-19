import { LoginFlow } from "@ory/client";
import {
    DevToolsContext,
    DevtoolsEvent,
    receive,
} from "@refinedev/devtools-shared";
import clsx from "clsx";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { GithubIcon } from "src/components/icons/github";
import { GoogleIcon } from "src/components/icons/google";
import { LogoIcon } from "src/components/icons/logo";
import { ory } from "src/utils/ory";

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

export const Login = () => {
    const { ws } = React.useContext(DevToolsContext);
    const [searchParams] = useSearchParams();
    const [flowData, setFlowData] = React.useState<LoginFlow | null>(null);

    const error = searchParams.get("error");

    const generateAuthFlow = React.useCallback(async () => {
        try {
            const redirectUrl = `${window.location.origin}/after-login`;

            const { data } = await ory.createBrowserLoginFlow({
                refresh: true,
                returnTo: redirectUrl,
            });

            setFlowData(data);
        } catch (_error) {
            console.error(_error);
        }
    }, [typeof window]);

    React.useEffect(() => {
        generateAuthFlow();
    }, [generateAuthFlow]);

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
                    "re-max-w-[336px]",
                    "re-w-full",
                    "re-flex",
                    "re-flex-col",
                    "re-gap-16",
                    "re-justify-center",
                    "re-items-center",
                )}
            >
                <LogoIcon height={60} width={252} />
                <form
                    className={clsx(
                        "re-w-full",
                        "re-flex",
                        "re-flex-col",
                        "re-items-center",
                        "re-justify-center",
                        "re-gap-4",
                    )}
                    action={flowData?.ui?.action}
                    method={flowData?.ui?.method}
                    target="_blank"
                >
                    <input
                        type="hidden"
                        name="csrf_token"
                        value={(flowData?.ui.nodes[2].attributes as any)?.value}
                    />
                    {providers.map(({ name, icon, label }) => (
                        <button
                            key={name}
                            id={name}
                            name="provider"
                            type="submit"
                            value={name}
                            disabled={!flowData}
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
                        </button>
                    ))}
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
                </form>
            </div>
        </div>
    );
};
