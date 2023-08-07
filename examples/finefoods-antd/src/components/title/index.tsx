import { useLink } from "@refinedev/core";
import { theme } from "antd";

import { BikeWhiteIcon, FineFoodsIcon } from "../../components";
import { Logo } from "./styled";

const { useToken } = theme;

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { token } = useToken();
    const Link = useLink();

    return (
        <Logo>
            <Link to="/">
                {collapsed ? (
                    <BikeWhiteIcon
                        style={{
                            fontSize: "32px",
                            color: token.colorTextHeading,
                        }}
                    />
                ) : (
                    <FineFoodsIcon
                        style={{
                            color: token.colorTextHeading,
                            width: "100%",
                            height: "auto",
                        }}
                    />
                )}
            </Link>
        </Logo>
    );
};
