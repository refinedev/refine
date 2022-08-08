import { FC, PropsWithChildren } from "react";

import { ChevronRight, CreditCard, Check } from "@components/icons";
import s from "./ShippingOptionWidget.module.css";

interface ComponentProps {
    onClick?: () => void;
    isValid: boolean;
}

const ShippingOptionWidget: FC<PropsWithChildren<ComponentProps>> = ({
    onClick,
    isValid,
    children,
}) => {
    return (
        <div onClick={onClick} className={s.root}>
            <div className="flex flex-1 items-center">
                <CreditCard className="flex w-5" />
                <span className="ml-5 text-center text-sm font-medium">
                    {children}
                </span>
            </div>
            <div>{isValid ? <Check /> : <ChevronRight />}</div>
        </div>
    );
};

export default ShippingOptionWidget;
