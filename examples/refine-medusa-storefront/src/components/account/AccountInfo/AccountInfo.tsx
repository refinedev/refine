import clsx from "clsx";
import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";

import { Button } from "@components";
import s from "./AccountInfo.module.css";

type AccountInfoProps = {
    label: string;
    currentInfo: string | React.ReactNode;
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    errorMessage?: string;
    clearState: () => void;
    children?: React.ReactNode;
};

export const AccountInfo: React.FC<AccountInfoProps> = ({
    label,
    currentInfo,
    isSuccess,
    isError,
    clearState,
    errorMessage = "An error occurred, please try again",
    children,
}: AccountInfoProps) => {
    const handleToggle = () => {
        clearState();
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
        }
    }, [isSuccess, close]);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={s.root}>
            <div className={s.currentInfoWrapper}>
                <div className={s.currentInfoTop}>
                    <span className={s.label}>{label}</span>
                    <div className={s.currentInfo}>
                        {typeof currentInfo === "string" ? (
                            <span className={s.text}>{currentInfo}</span>
                        ) : (
                            currentInfo
                        )}
                    </div>
                </div>
                <div>
                    <Button
                        variant="ghost"
                        className={s.button}
                        onClick={handleToggle}
                        type={isOpen ? "reset" : "button"}
                    >
                        {isOpen ? "Cancel" : "Edit"}
                    </Button>
                </div>
            </div>

            {/* Success state */}
            <Disclosure>
                <Disclosure.Panel
                    static
                    className={clsx(
                        s.disclosure,
                        isSuccess && s.appearDisclosure,
                        !isSuccess && s.disappearDisclosure,
                    )}
                >
                    <div className={s.successMessage}>
                        <span>{label} updated succesfully</span>
                    </div>
                </Disclosure.Panel>
            </Disclosure>

            {/* Error state  */}
            <Disclosure>
                <Disclosure.Panel
                    static
                    className={clsx(
                        s.disclosure,
                        isError && s.appearDisclosure,
                        !isError && s.disappearDisclosure,
                    )}
                >
                    <div className={s.errorMessage}>
                        <span>{errorMessage}</span>
                    </div>
                </Disclosure.Panel>
            </Disclosure>

            <Disclosure>
                <Disclosure.Panel
                    static
                    className={clsx(
                        s.disclosure,
                        isOpen && s.appearDisclosure,
                        !isOpen && s.disappearDisclosure,
                    )}
                >
                    <div className={s.openDisclosure}>
                        <div>{children}</div>
                        <div className={s.buttonWrapper}>
                            <Button className={s.button} type="submit">
                                Save changes
                            </Button>
                        </div>
                    </div>
                </Disclosure.Panel>
            </Disclosure>
        </div>
    );
};
