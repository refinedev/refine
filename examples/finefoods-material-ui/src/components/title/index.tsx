import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import { BikeWhiteIcon, FineFoodsIcon } from "../../components/icons";

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    return (
        <Link to="/">
            <Box
                sx={{
                    height: "72px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "text.primary",
                }}
            >
                {collapsed ? <BikeWhiteIcon /> : <FineFoodsIcon />}
            </Box>
        </Link>
    );
};
