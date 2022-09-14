import React from "react";
import Link from "@docusaurus/Link";

import { RefineIcon } from "../../../components/landing/icons/refine-icon";

export default function NavbarLogo({ className, ...props }) {
    return (
        <Link to="/">
            <RefineIcon
                className={
                    className
                        ? className
                        : "select-none mx-auto pr-6 lg:ml-0 lg:mr-2 lg:pr-0 items-center flex min-w-[110px] max-w-[110px]"
                }
                imageClassName="navbar__logo"
                titleClassName="navbar__title text--truncate"
                {...props}
            />
        </Link>
    );
}
