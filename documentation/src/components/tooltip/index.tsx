import React, { FC, PropsWithChildren, ReactNode } from "react";

type Props = {
    label?: ReactNode;
};

const Tooltip: FC<PropsWithChildren<Props>> = ({ label, children }) => {
    if (!label) return <>{children}</>;

    return (
        <div className="relative flex flex-col items-center group">
            {children}
            <div className="absolute bottom-0 left-0 flex flex-col items-center invisible mb-6 transition-all ease-out delay-75 group-hover:visible">
                <span className="relative z-50 p-2 text-white bg-black rounded-sm shadow-2xl w-60">
                    {label}
                </span>
                <div className="w-3 h-3 -mt-2 rotate-45 bg-black" />
            </div>
        </div>
    );
};

export default Tooltip;
