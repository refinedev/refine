import { logoStyles } from "./style";

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    return (
        <div style={logoStyles}>
            {collapsed ? (
                <img
                    src="/images/fine-foods-collapsed.svg"
                    height="25"
                    width="18"
                />
            ) : (
                <img src="/images/fine-foods.svg" height="48" width="138" />
            )}
        </div>
    );
};
