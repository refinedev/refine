import { useResource, useNavigation } from "@pankod/refine-core";

export const Layout: React.FC = ({ children }) => {
    const { resources } = useResource();
    const { list } = useNavigation();

    return (
        <div className="flex min-h-screen flex-col">
            <div className="mb-2 bg-gray-100/75 py-2 shadow">
                <div className="container mx-auto">
                    <ul>
                        {resources.map(({ name }) => (
                            <li key={name} className="float-left">
                                <a
                                    className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition duration-300 ease-in-out hover:underline"
                                    onClick={() => list(name)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                        <polyline points="2 17 12 22 22 17"></polyline>
                                        <polyline points="2 12 12 17 22 12"></polyline>
                                    </svg>
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
