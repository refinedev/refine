import { Disclosure } from "@headlessui/react";
import cn from "clsx";

import { useCheckout } from "@lib/context";

import s from "./StepContainer.module.css";

interface StepContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number;
    title: string;
    closedState?: React.ReactNode;
    children?: React.ReactNode;
}

export const StepContainer: React.FC<StepContainerProps> = ({
    index,
    title,
    className,
    closedState,
    children,
    ...props
}) => {
    const {
        editAddresses: { state },
    } = useCheckout();
    return (
        <div>
            <div
                className={cn("bg-white", className, {
                    "pointer-events-none select-none opacity-50": state,
                })}
                {...props}
            >
                <div className={cn(s.step, "px-8")}>
                    <div className={s.stepCount}>{index}</div>
                    <h2>{title}</h2>
                </div>
                <Disclosure>
                    <Disclosure.Panel
                        static
                        className={cn(s.panel, {
                            "max-h-[9999px] opacity-100": !state,
                            "max-h-0 opacity-0": state,
                        })}
                    >
                        {children}
                    </Disclosure.Panel>
                    <Disclosure.Panel
                        static
                        className={cn(s.panel, {
                            "max-h-[9999px] opacity-100": state,
                            "max-h-0 opacity-0": !state,
                        })}
                    >
                        {closedState}
                    </Disclosure.Panel>
                </Disclosure>
            </div>
        </div>
    );
};
