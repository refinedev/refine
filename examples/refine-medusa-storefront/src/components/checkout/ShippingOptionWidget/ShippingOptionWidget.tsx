import { FC, PropsWithChildren } from "react";
import s from "./ShippingOptionWidget.module.css";
import { ChevronRight, CreditCard, Check } from "@components/icons";

interface ComponentProps {
    onClick?: () => any;
    isValid: boolean;
}

const ShippingOptionWidget: FC<PropsWithChildren<ComponentProps>> = ({
    onClick,
    isValid,
    children,
}) => {
    /* Shipping Address
  Only available with checkout set to true -
  This means that the provider does offer checkout functionality. */
    return (
        <div onClick={onClick} className={s.root}>
            <div className="flex flex-1 items-center">
                <CreditCard className="flex w-5" />
                <span className="ml-5 text-center text-sm font-medium">
                    {children}
                </span>
                {/* <span>VISA #### #### #### 2345</span> */}
            </div>
            <div>{isValid ? <Check /> : <ChevronRight />}</div>
        </div>
    );
};

export default ShippingOptionWidget;
