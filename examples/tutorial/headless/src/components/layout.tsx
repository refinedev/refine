import { useResource, useNavigation } from "@pankod/refine-core";

export const Layout: React.FC = ({ children }) => {
    const { resources } = useResource();
    const { list } = useNavigation();

    return (
        <div className="flex min-h-screen flex-col">
            <div className="mb-2 border-b py-2">
                <div className="container mx-auto flex">
                    <img
                        src="https://refine.dev/img/refine_logo.png"
                        alt="Logo"
                    />
                    <ul>
                        {resources.map(({ name, icon }) => (
                            <li key={name} className="float-left">
                                <a
                                    className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition duration-300 ease-in-out hover:underline"
                                    onClick={() => list(name)}
                                >
                                    {icon}
                                    <span>{name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="bg-white">{children}</div>
        </div>
    );
};
