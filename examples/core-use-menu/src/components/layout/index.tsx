import React from "react";
import {
    useMenu,
    LayoutProps,
    useRouterContext,
    useRefineContext,
    ITreeMenu,
} from "@pankod/refine-core";
import { NavLink } from "@pankod/refine-react-router-v6";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { menuItems, selectedKey } = useMenu();
    const { Link } = useRouterContext();
    const { hasDashboard } = useRefineContext();

    const renderMenuItems = (items: ITreeMenu[]) => {
        return (
            <>
                {items.map(({ name, label, icon, route }) => {
                    const isSelected = route === selectedKey;
                    return (
                        <li key={name}>
                            <Link
                                to={route}
                                style={{
                                    fontWeight: isSelected ? "bold" : "normal",
                                }}
                            >
                                {icon}
                                <span>{label ?? name}</span>
                            </Link>
                        </li>
                    );
                })}
            </>
        );
    };

    return (
        <div>
            <div>
                <Link to="/">
                    <img
                        src="https://refine.dev/img/refine_logo.png"
                        alt="Logo"
                    />
                </Link>
                <ul>
                    {hasDashboard && (
                        <li>
                            <Link
                                to="/"
                                style={{
                                    fontWeight:
                                        selectedKey === "/" ? "bold" : "normal",
                                }}
                            >
                                <span>Dashboard</span>
                            </Link>
                        </li>
                    )}
                    {renderMenuItems(menuItems)}
                </ul>
            </div>
            <div>{children}</div>
        </div>
    );
};
