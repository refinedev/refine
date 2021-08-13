import { logoStyles } from "./style";
import { BikeWhite } from "components";

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    return (
        <div style={logoStyles}>
            {collapsed ? (
                <BikeWhite style={{ color: "white" }} />
            ) : (
                <img src="/images/fine-foods.svg" alt="Finefood" />
            )}
        </div>
    );
};
