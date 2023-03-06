import { useMenu, useNavigation, LayoutProps } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";

const { Link } = routerProvider;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { menuItems } = useMenu();
    const { push } = useNavigation();

    return (
        <div className="flex min-h-screen flex-col border md:flex-row">
            <div className="mb-2 border-b py-2 md:w-2/12">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center gap-2">
                        <Link to="/">
                            <img
                                className="w-32"
                                src="https://refine.dev/img/refine_logo.png"
                                alt="Logo"
                            />
                        </Link>

                        <ul>
                            {menuItems.map(({ name, label, icon, route }) => (
                                <li key={name} className="float-left">
                                    <a
                                        className="flex cursor-pointer flex-col items-center gap-1 rounded-sm px-2 py-1 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition duration-300 ease-in-out hover:underline"
                                        onClick={() => push(route || "")}
                                    >
                                        {icon}
                                        <span>{label ?? name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="overflow-auto bg-white md:w-10/12">{children}</div>
        </div>
    );
};
