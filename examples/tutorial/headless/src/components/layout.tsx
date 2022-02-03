import { useResource, useNavigation } from "@pankod/refine-core";

export const Layout: React.FC = ({ children }) => {
    const { resources } = useResource();
    const { list } = useNavigation();

    return (
        <div className="flex min-h-screen gap-2 bg-slate-50">
            <div className="w-40 border-r bg-slate-700 py-2 text-slate-200 shadow-md">
                <ul>
                    {resources.map(({ name }) => (
                        <li key={name}>
                            <a
                                className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 capitalize transition duration-300 ease-in-out hover:bg-slate-600 hover:text-slate-100"
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
            <div className="w-full">{children}</div>
        </div>
    );
};
