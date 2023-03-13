import React from "react";
import { useIsAuthenticated } from "@refinedev/core";
import cn from "clsx";
import Link from "next/link";
import { LineItem } from "@medusajs/medusa";

import { useUI } from "@lib/context";
import { Heart, Bag, Menu, User } from "@components/icons";
import { CustomerMenuContent } from "./CustomerMenuContent";
import {
    Dropdown,
    DropdownTrigger as DropdownTriggerInst,
    Button,
} from "@components/ui";
import { useCart } from "@lib/hooks";
import { useCartContext } from "@lib/context";

import s from "./UserNav.module.css";

export const UserNav: React.FC<{
    className?: string;
}> = ({ className }) => {
    const { cartId } = useCartContext();

    const { cart } = useCart({ id: cartId });

    const countItem = (count: number, item: LineItem) => count + item.quantity;

    const itemsCount = cart?.items.reduce(countItem, 0) ?? 0;
    const { isSuccess } = useIsAuthenticated();

    const { closeSidebarIfPresent, openModal, setSidebarView, openSidebar } =
        useUI();

    const DropdownTrigger = isSuccess ? DropdownTriggerInst : React.Fragment;

    return (
        <nav className={cn(s.root, className)}>
            <ul className={s.list}>
                <li className={s.item}>
                    <Button
                        className={s.item}
                        variant="naked"
                        onClick={() => {
                            setSidebarView("CART_VIEW");
                            openSidebar();
                        }}
                    >
                        <Bag />
                        {itemsCount > 0 && (
                            <span className={s.bagCount}>{itemsCount}</span>
                        )}
                    </Button>
                </li>

                {process.env.COMMERCE_WISHLIST_ENABLED && (
                    <li className={s.item}>
                        <Link
                            href="/wishlist"
                            onClick={closeSidebarIfPresent}
                            aria-label="Wishlist"
                        >
                            <Heart />
                        </Link>
                    </li>
                )}
                <li className={s.item}>
                    <Dropdown>
                        <DropdownTrigger>
                            <button
                                aria-label="Menu"
                                className={s.avatarButton}
                                onClick={() => (isSuccess ? null : openModal())}
                            >
                                <User size={24} />
                            </button>
                        </DropdownTrigger>
                        <CustomerMenuContent />
                    </Dropdown>
                </li>
                <li className={s.mobileMenu}>
                    <Button
                        className={s.item}
                        aria-label="Menu"
                        variant="naked"
                        onClick={() => {
                            setSidebarView("MOBILE_MENU_VIEW");
                            openSidebar();
                        }}
                    >
                        <Menu />
                    </Button>
                </li>
            </ul>
        </nav>
    );
};
