import { PropsWithChildren } from "react";

import cn from "clsx";

interface ContainerProps extends PropsWithChildren {
    className?: string;
    el?: HTMLElement;
    clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    className,
    el = "div",
    clean = false, // Full Width Screen
}) => {
    const rootClassName = cn(className, {
        "mx-auto max-w-7xl px-6 w-full": !clean,
    });

    const Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
        el as any; // eslint-disable-line

    return <Component className={rootClassName}>{children}</Component>;
};
