import { LoginFlow } from "@ory/client";
import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GithubIcon } from "src/components/icons/github";
import { GoogleIcon } from "src/components/icons/google";
import { LogoIcon } from "src/components/icons/logo";
import { ory } from "src/utils/ory";

const providers = [
    {
        name: "github",
        icon: <GithubIcon />,
        label: "Sign in with GitHub",
        callback: "",
    },
    {
        name: "google",
        icon: <GoogleIcon />,
        label: "Sign in with Google",
        callback: "",
    },
];

export const Login = () => {
    const [flowData, setFlowData] = React.useState<LoginFlow | null>(null);

    const generateAuthFlow = React.useCallback(async () => {
        try {
            const redirectUrl = `${window.location.href}`.split(/[?#]/)[0];

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

    return (
        <div
            className={clsx(
                "re-bg-gray-900",
                "re-h-full",
                "re-flex",
                "re-items-center",
                "re-justify-center",
                "re-h-auto",
                "re-py-16",
            )}
        >
            <div
                className={clsx(
                    "re-flex-1",
                    "re-flex",
                    "re-items-center",
                    "re-justify-center",
                    "re-h-full",
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
                            "re-gap-6",
                        )}
                        action={flowData?.ui?.action}
                        method={flowData?.ui?.method}
                    >
                        <input
                            type="hidden"
                            name="csrf_token"
                            value={
                                (flowData?.ui.nodes[2].attributes as any)?.value
                            }
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
                                    "re-py-4",
                                    "re-px-8",
                                    "re-bg-gray-0",
                                    "re-text-gray-900",
                                    "re-text-xl",
                                    "re-leading-8",
                                    "re-font-bold",
                                    "re-gap-4",
                                    "re-flex",
                                    "re-items-center",
                                    "re-justify-center",
                                    "re-rounded-lg",
                                )}
                            >
                                {icon}
                                <span>{label}</span>
                            </button>
                        ))}
                    </form>
                </div>
            </div>
        </div>
    );
};
