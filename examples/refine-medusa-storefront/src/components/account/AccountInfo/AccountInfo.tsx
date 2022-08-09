import clsx from "clsx";
import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";

import { Button } from "@components";

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

const AccountInfo: React.FC<AccountInfoProps> = ({
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
        <div className="text-small-regular">
            <div className="flex items-end justify-between">
                <div className="flex flex-col">
                    <span className="text-gray uppercase">{label}</span>
                    <div className="flex flex-1 basis-0 items-center justify-end gap-x-4">
                        {typeof currentInfo === "string" ? (
                            <span className="font-semibold">{currentInfo}</span>
                        ) : (
                            currentInfo
                        )}
                    </div>
                </div>
                <div>
                    <Button
                        variant="ghost"
                        className="small:h-[50px] small:w-[100px] h-[25px] min-h-[25px] w-[50px] py-1"
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
                        "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
                        {
                            "max-h-[1000px] opacity-100": isSuccess,
                            "max-h-0 opacity-0": !isSuccess,
                        },
                    )}
                >
                    <div className="bg-green text-accent-1 my-4 p-4">
                        <span>{label} updated succesfully</span>
                    </div>
                </Disclosure.Panel>
            </Disclosure>

            {/* Error state  */}
            <Disclosure>
                <Disclosure.Panel
                    static
                    className={clsx(
                        "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
                        {
                            "max-h-[1000px] opacity-100": isError,
                            "max-h-0 opacity-0": !isError,
                        },
                    )}
                >
                    <div className="bg-violet-light text-violet-dark mt-4 p-4">
                        <span>{errorMessage}</span>
                    </div>
                </Disclosure.Panel>
            </Disclosure>

            <Disclosure>
                <Disclosure.Panel
                    static
                    className={clsx(
                        "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
                        {
                            "max-h-[1000px] opacity-100": isOpen,
                            "max-h-0 opacity-0": !isOpen,
                        },
                    )}
                >
                    <div className="flex flex-col gap-y-2 py-4">
                        <div>{children}</div>
                        <div className="mt-2 flex items-center justify-end">
                            <Button
                                className="small:max-w-[140px] w-full"
                                type="submit"
                            >
                                Save changes
                            </Button>
                        </div>
                    </div>
                </Disclosure.Panel>
            </Disclosure>
        </div>
    );
};

export default AccountInfo;
