import React, { FC, PropsWithChildren } from "react";
import { Cross, ChevronLeft } from "@components/icons";
import UserNav from "@components/common/UserNav";
import cn from "clsx";
import s from "./SidebarLayout.module.css";

type ComponentProps = { className?: string } & (
    | { handleClose: () => any; handleBack?: never }
    | { handleBack: () => any; handleClose?: never }
);

const SidebarLayout: FC<PropsWithChildren<ComponentProps>> = ({
    children,
    className,
    handleBack,
    handleClose,
}) => {
    return (
        <div className={cn(s.root, className)}>
            <header className={s.header}>
                {handleClose && (
                    <button
                        onClick={handleClose}
                        aria-label="Close"
                        className="hover:text-accent-5 mr-6 flex items-center transition duration-150 ease-in-out focus:outline-none"
                    >
                        <Cross className="hover:text-accent-3 h-6 w-6" />
                        <span className="text-accent-7 ml-2 text-sm ">
                            Close
                        </span>
                    </button>
                )}
                {handleBack && (
                    <button
                        onClick={handleBack}
                        aria-label="Go back"
                        className="hover:text-accent-5 flex items-center transition duration-150 ease-in-out focus:outline-none"
                    >
                        <ChevronLeft className="hover:text-accent-3 h-6 w-6" />
                        <span className="text-accent-7 ml-2 text-xs">Back</span>
                    </button>
                )}

                <UserNav />
            </header>
            <div className={s.container}>{children}</div>
        </div>
    );
};

export default SidebarLayout;
