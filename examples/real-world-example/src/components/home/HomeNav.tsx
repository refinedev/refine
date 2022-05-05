import { LinkHTMLAttributes } from "react";

type HomeNavProps = {
    isSuccess: boolean;
    feed: LinkHTMLAttributes<HTMLAnchorElement>;
    global: LinkHTMLAttributes<HTMLAnchorElement>;
};

export const HomeNav: React.FC<HomeNavProps> = ({
    isSuccess,
    feed,
    global,
}) => {
    return (
        <div className="feed-toggle">
            <ul className="nav nav-pills outline-active">
                {isSuccess && <li className="nav-item">{feed}</li>}
                <li className="nav-item">{global}</li>
            </ul>
        </div>
    );
};
