import { useMenu } from "@refinedev/core";
import { NavLink } from "react-router-dom";

export const Menu = () => {
    const { menuItems } = useMenu();

    return (
        <nav className="menu mx-0">
            <ul className="mx-0 flex justify-start items-center">
                {menuItems.map((item) => (
                    <li
                        key={item?.key}
                        className="mx-0 flex justify-start items-center"
                    >
                        <div className="text-gray-600">
                            <span className="mr-1">{item?.icon}</span>
                            <NavLink className="text-lg" to={item?.route}>
                                {item?.label}
                            </NavLink>
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
