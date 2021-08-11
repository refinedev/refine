import { logoStyles } from "./style";

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    return (
        <div style={logoStyles}>
            {collapsed ? (
                <img src="/images/fine-foods-collapsed.svg" alt="Finefood" />
            ) : (
                <img src="/images/fine-foods.svg" alt="Finefood" />
            )}
        </div>
    );
};
