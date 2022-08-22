import React, { PropsWithChildren } from "react";

import { Cross } from "@components/icons";
import { UserNav } from "@components/common/UserNav";

import s from "./SidebarLayout.module.css";

interface SidebarLayoutProps {
    handleClose: () => void;
}

export const SidebarLayout: React.FC<PropsWithChildren<SidebarLayoutProps>> = ({
    children,
    handleClose,
}) => {
    return (
        <div className={s.root}>
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

                <UserNav />
            </header>
            <div className={s.container}>{children}</div>
        </div>
    );
};
