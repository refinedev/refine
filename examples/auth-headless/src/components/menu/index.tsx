import { useLogout, useMenu } from "@refinedev/core";
import { NavLink } from "react-router-dom";

export const Menu = () => {
    const { mutate: logout } = useLogout();
    const { menuItems } = useMenu();

    return (
        <nav style={{ flexShrink: 0 }}>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.key}>
                        <NavLink
                            to={item.route}
                            style={({ isActive, isPending }) => {
                                return {
                                    fontWeight: isActive ? "bold" : "",
                                    color: isPending ? "red" : "black",
                                };
                            }}
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <button style={{ marginLeft: 28 }} onClick={() => logout()}>
                Logout
            </button>
        </nav>
    );
};
