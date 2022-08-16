import { FC } from "react";

import s from "./PaymentWidget.module.css";
import { ChevronRight, CreditCard, Check } from "@components/icons";

interface ComponentProps {
    onClick?: () => any;
    isValid?: boolean;
}

export const PaymentWidget: FC<ComponentProps> = ({ onClick, isValid }) => {
    /* Shipping Address
  Only available with checkout set to true -
  This means that the provider does offer checkout functionality. */
    return (
        <div onClick={onClick} className={s.root}>
            <div className="flex flex-1 items-center">
                <CreditCard className="flex w-5" />
                <span className="ml-5 text-center text-sm font-medium">
                    Add Payment Method
                </span>
                {/* <span>VISA #### #### #### 2345</span> */}
            </div>
            <div>{isValid ? <Check /> : <ChevronRight />}</div>
        </div>
    );
};
