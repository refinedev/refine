import cn from "clsx";

import { Button, Checkbox, BillingAddress, ShippingAddress } from "@components";
import { Spinner } from "@components/icons";
import { useCheckout } from "@lib/context";

import s from "./Addresses.module.css";

export const Addresses: React.FC = () => {
    const {
        sameAsBilling: { state: checked, toggle: onChange },
        editAddresses: { state: isEdit, toggle: setEdit },
        setAddresses,
        handleSubmit,
        cart,
    } = useCheckout();

    return (
        <div>
            <div className={cn(s.step, "px-8")}>
                <div className={s.stepCount}>1</div>
                <h2>Shipping address</h2>
            </div>
            {isEdit ? (
                <div className="px-8 pb-8">
                    <ShippingAddress />
                    <div className="mt-6">
                        <Checkbox
                            label="Same as billing address"
                            checked={checked}
                            onChange={onChange}
                        />
                    </div>
                    {!checked && (
                        <div>
                            <div className={s.step}>
                                <div className={s.stepCount}>2</div>
                                <h2>Billing address</h2>
                            </div>
                            <BillingAddress />
                        </div>
                    )}
                    <Button
                        // variant="slim"
                        className="mt-6 h-[48px] max-w-[300px] "
                        onClick={handleSubmit(setAddresses)}
                    >
                        Continue to delivery
                    </Button>
                </div>
            ) : (
                <div>
                    <div className="text-small-regular bg-primary px-8 py-6">
                        {cart && cart.shipping_address ? (
                            <div className="flex items-start gap-x-8">
                                <div className={s.mark}>✓</div>
                                <div className={s.checkedAddress}>
                                    <div className="flex flex-col">
                                        <span>
                                            {cart.shipping_address.first_name}{" "}
                                            {cart.shipping_address.last_name}
                                        </span>
                                        <span>
                                            {cart.shipping_address.address_1}{" "}
                                            {cart.shipping_address.address_2}
                                        </span>
                                        <span>
                                            {cart.shipping_address.postal_code},{" "}
                                            {cart.shipping_address.city}
                                        </span>
                                        <span>
                                            {cart.shipping_address.country_code?.toUpperCase()}
                                        </span>
                                        <div className="mt-4 flex flex-col">
                                            <span>
                                                {cart.shipping_address.phone}
                                            </span>
                                            <span>{cart.email}</span>
                                        </div>
                                        {checked && (
                                            <div className="mt-6 flex items-center gap-x-2">
                                                <div className="flex h-4 w-4 items-center justify-center border border-gray-700 bg-gray-100">
                                                    ✓
                                                </div>
                                                <span>
                                                    Same as billing address
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <button onClick={setEdit}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="">
                                <Spinner />
                            </div>
                        )}
                    </div>
                    {!checked && (
                        <div>
                            <div className={cn(s.step, "px-8")}>
                                <div className={s.stepCount}>2</div>
                                <h2>Billing address</h2>
                            </div>
                            <div className="text-small-regular px-8 py-6">
                                {cart && cart.billing_address ? (
                                    <div className="flex items-start gap-x-8">
                                        <div className={s.mark}>✓</div>
                                        <div className={s.checkedAddress}>
                                            <div className="flex flex-col">
                                                <span>
                                                    {
                                                        cart.billing_address
                                                            .first_name
                                                    }{" "}
                                                    {
                                                        cart.billing_address
                                                            .last_name
                                                    }
                                                </span>
                                                <span>
                                                    {
                                                        cart.billing_address
                                                            .address_1
                                                    }{" "}
                                                    {
                                                        cart.billing_address
                                                            .address_2
                                                    }
                                                </span>
                                                <span>
                                                    {
                                                        cart.billing_address
                                                            .postal_code
                                                    }
                                                    ,{" "}
                                                    {cart.billing_address.city}
                                                </span>
                                                <span>
                                                    {cart.billing_address.country_code?.toUpperCase()}
                                                </span>

                                                <div className="mt-4 flex flex-col">
                                                    <span>
                                                        {
                                                            cart.billing_address
                                                                .phone
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <button onClick={setEdit}>
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Spinner />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
