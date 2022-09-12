import cn from "clsx";

import s from "./ProductTag.module.css";

interface ProductTagProps {
    className?: string;
    name: string;
    price?: string;
    fontSize?: number;
}

export const ProductTag: React.FC<ProductTagProps> = ({
    name,
    price,
    className = "",
    fontSize = 32,
}) => {
    return (
        <div className={cn(s.root, className)}>
            <h3 className={s.name}>
                <span
                    className={cn({ [s.fontsizing]: fontSize < 32 })}
                    style={{
                        fontSize: `${fontSize}px`,
                        lineHeight: `${fontSize}px`,
                    }}
                >
                    {name}
                </span>
            </h3>
            {price && <div className={s.price}>{price}</div>}
        </div>
    );
};
