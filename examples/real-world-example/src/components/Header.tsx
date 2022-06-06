import { useGetIdentity } from "@pankod/refine-core";

import routerProvider from "@pankod/refine-react-router-v6";

const { Link } = routerProvider;
export const Header: React.FC = () => {
    const { data: user, isSuccess: isLoggedIn } = useGetIdentity();

    return (
        <>
            <nav className="navbar navbar-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        conduit
                    </Link>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Sign in
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Sign up
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/editor">
                                        <i className="ion-compose"></i>&nbsp;New
                                        Article
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/settings">
                                        <i className="ion-gear-a"></i>
                                        &nbsp;Settings
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to={`profile/@${user?.username}`}
                                    >
                                        <img
                                            src={user?.image}
                                            className="user-pic"
                                        />
                                        &nbsp; {user?.username}
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};
