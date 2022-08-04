import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import { ChevronDown } from "@icons";

export const AccountNav: React.FC = () => {
    const { route } = useRouter();

    return (
        <div>
            <div className="small:hidden">
                {route !== "/account" && (
                    <Link href="/account">
                        <a className="text-small-regular flex items-center gap-x-2 py-2">
                            <ChevronDown className="rotate-90 transform" />
                            <span>Account</span>
                        </a>
                    </Link>
                )}
            </div>
            <div className="small:block hidden">
                <div>
                    <div className="py-4">
                        <h3 className="text-base-semi">Account</h3>
                    </div>
                    <div className="text-base-regular">
                        <ul className="mb-0 flex flex-col items-start justify-start gap-y-4">
                            <li>
                                <AccountNavLink href="/account" route={route}>
                                    Overview
                                </AccountNavLink>
                            </li>
                            <li>
                                <AccountNavLink
                                    href="/account/profile"
                                    route={route}
                                >
                                    Profile
                                </AccountNavLink>
                            </li>
                            <li>
                                <AccountNavLink
                                    href="/account/addresses"
                                    route={route}
                                >
                                    Addresses
                                </AccountNavLink>
                            </li>
                            <li>
                                <AccountNavLink
                                    href="/account/orders"
                                    route={route}
                                >
                                    Orders
                                </AccountNavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

type AccountNavLinkProps = {
    href: string;
    route: string;
    children: React.ReactNode;
};

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
    const active = route === href;
    return (
        <Link href={href}>
            <a
                className={clsx("text-gray-700", {
                    "font-semibold text-gray-900": active,
                })}
            >
                {children}
            </a>
        </Link>
    );
};

export default AccountNav;
