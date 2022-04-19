import { useNavigation, useAuthenticated } from "@pankod/refine-core";

export const Header: React.FC = () => {
    const { push } = useNavigation();
    const { isSuccess } = useAuthenticated();

    return (
        <>
            <nav className="navbar navbar-light">
                <div className="container">
                    <a className="navbar-brand" href="index.html">
                        conduit
                    </a>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                href=""
                                onClick={() => {
                                    push("/home");
                                }}
                            >
                                Home
                            </a>
                        </li>
                        {!isSuccess ? (
                            <>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href=""
                                        onClick={() => {
                                            push("/login");
                                        }}
                                    >
                                        Sign in
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href=""
                                        onClick={() => {
                                            push("/register");
                                        }}
                                    >
                                        Sign up
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="">
                                        <i className="ion-compose"></i>&nbsp;New
                                        Article
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href=""
                                        onClick={() => {
                                            push("/settings");
                                        }}
                                    >
                                        <i className="ion-gear-a"></i>
                                        &nbsp;Settings
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href=""
                                        onClick={() => {
                                            push("/profile");
                                        }}
                                    >
                                        <i className="ion-gear-a"></i>
                                        &nbsp;Profile
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};
