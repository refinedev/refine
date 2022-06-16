import { useRouterContext } from "@pankod/refine-core";

import { BikeWhiteIcon } from "components/icons/bike-white";

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Link to="/">
            <div
                style={{
                    height: "72px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {collapsed ? (
                    <BikeWhiteIcon style={{ color: "white" }} />
                ) : (
                    <img src="/images/fine-foods.svg" alt="Finefood" />
                )}
            </div>
        </Link>
    );
};
