import { logoStyles } from "./style";
import { BikeWhiteIcon } from "components";

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    return (
        <div style={logoStyles}>
            {collapsed ? (
                <BikeWhiteIcon style={{ color: "white" }} />
            ) : (
                <img src="/images/fine-foods.svg" alt="Finefood" />
            )}
        </div>
    );
};
