import routerProvider from "@pankod/refine-react-router-v6";

const { Link } = routerProvider;

type ProfileNavProps = {
    params: any;
    profileData: any;
    setFilters: (filters: CrudFilters) => void;
};

export const ProfileNav: React.FC<ProfileNavProps> = ({
    params,
    profileData,
    setFilters,
}) => {
    return (
        <div className="articles-toggle">
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <Link
                        className={`nav-link ${
                            params?.page === "favorites" ? "" : "active"
                        }`}
                        to={`/profile/@${profileData?.data.username}`}
                        onClick={() => {
                            setFilters([
                                {
                                    field: "favorited",
                                    value: undefined,
                                    operator: "eq",
                                },
                                {
                                    field: "author",
                                    value: params?.username,
                                    operator: "eq",
                                },
                            ]);
                        }}
                    >
                        My Articles
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={`nav-link ${
                            params?.page === "favorites" ? "active" : ""
                        }`}
                        to={`/profile/@${profileData?.data.username}/favorites`}
                        onClick={() => {
                            setFilters([
                                {
                                    field: "author",
                                    value: undefined,
                                    operator: "eq",
                                },
                                {
                                    field: "favorited",
                                    value: params?.username,
                                    operator: "eq",
                                },
                            ]);
                        }}
                    >
                        Favorited Articles
                    </Link>
                </li>
            </ul>
        </div>
    );
};
