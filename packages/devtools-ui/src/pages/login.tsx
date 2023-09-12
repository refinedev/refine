import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/components/auth-context";
import { GithubIcon } from "src/components/icons/github";
import { GoogleIcon } from "src/components/icons/google";
import { LogoIcon } from "src/components/icons/logo";

const providers = [
    {
        name: "GitHub",
        icon: <GithubIcon />,
        label: "Sign in with GitHub",
        callback: "",
    },
    {
        name: "Google",
        icon: <GoogleIcon />,
        label: "Sign in with Google",
        callback: "",
    },
];

export const Login = () => {
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

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
                    <div
                        className={clsx(
                            "re-w-full",
                            "re-flex",
                            "re-flex-col",
                            "re-items-center",
                            "re-justify-center",
                            "re-gap-6",
                        )}
                    >
                        {providers.map(({ name, icon, label }) => (
                            <button
                                key={name}
                                type="button"
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
                                onClick={() => {
                                    setAccessToken("123");
                                    navigate("/onboarding");
                                }}
                            >
                                {icon}
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
