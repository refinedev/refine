import { Logo } from "./styled";
import { BikeWhiteIcon, FineFoodsIcon } from "components";
import { theme } from "antd";

const { useToken } = theme;

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { token } = useToken();

    return (
        <Logo>
            {collapsed ? (
                <BikeWhiteIcon
                    style={{ fontSize: "32px", color: token.colorTextBase }}
                />
            ) : (
                <FineFoodsIcon style={{ color: token.colorTextBase }} />
            )}
        </Logo>
    );
};
