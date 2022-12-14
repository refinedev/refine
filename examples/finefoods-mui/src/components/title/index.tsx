import { useRouterContext } from "@pankod/refine-core";
import { Box } from "@pankod/refine-mui";

import { BikeWhiteIcon } from "components/icons/bike-white";

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Link to="/">
            <Box
                sx={{
                    height: "72px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {collapsed ? (
                    <BikeWhiteIcon sx={{ color: "common.white" }} />
                ) : (
                    <img src="/images/fine-foods.svg" alt="Finefood" />
                )}
            </Box>
        </Link>
    );
};
