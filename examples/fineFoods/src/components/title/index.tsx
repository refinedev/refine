import "./style.less";
import { BikeWhiteIcon } from "components";

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    return (
        <div className="logo">
            {collapsed ? (
                <BikeWhiteIcon style={{ color: "white" }} />
            ) : (
                <img src="/images/fine-foods.svg" alt="Finefood" />
            )}
        </div>
    );
};
