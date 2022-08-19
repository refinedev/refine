import React from "react";
import Logo from "@theme/Logo";
export default function NavbarLogo({ className, ...props }) {
    return (
        <Logo
            className={
                className
                    ? className
                    : "select-none mx-auto pr-6 lg:ml-2 lg:mr-4 lg:pr-0 items-center flex min-w-0"
            }
            imageClassName="navbar__logo"
            titleClassName="navbar__title text--truncate"
            {...props}
        />
    );
}
