import routerProvider from "@pankod/refine-react-router-v6";

const { Link } = routerProvider;

type ProfileNavProps = {
    params: any;
    profileData: any;
    filters: () => void;
};

export const ProfileNav: React.FC<ProfileNavProps> = ({
    params,
    profileData,
    filters,
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
                            filters();
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
                            filters();
                        }}
                    >
                        Favorited Articles
                    </Link>
                </li>
            </ul>
        </div>
    );
};
