import Spinner from "@components/icons/Spinner";
import { Button, Checkbox } from "@components/ui";
import { useCheckout } from "@lib/context/checkout";
import BillingAddress from "../BillingAddress";
import ShippingAddress from "../ShippingAddress";

const Addresses: React.FC = () => {
    const {
        sameAsBilling: { state: checked, toggle: onChange },
        editAddresses: { state: isEdit, toggle: setEdit },
        setAddresses,
        handleSubmit,
        cart,
    } = useCheckout();
    return (
        <div className="bg-white">
            <div className="text-xl-semi flex items-center gap-x-4 px-8 pb-6 pt-8">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm text-white">
                    1
                </div>
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
                            <div className="text-xl-semi flex items-center gap-x-4 pb-6 pt-8">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 font-mono text-sm text-white">
                                    2
                                </div>
                                <h2>Billing address</h2>
                            </div>
                            <BillingAddress />
                        </div>
                    )}
                    <Button
                        className="mt-6 max-w-[200px]"
                        onClick={handleSubmit(setAddresses)}
                    >
                        Continue to delivery
                    </Button>
                </div>
            ) : (
                <div>
                    <div className="text-small-regular bg-gray-50 px-8 py-6">
                        {cart && cart.shipping_address ? (
                            <div className="flex items-start gap-x-8">
                                <div className="text-small-regular flex h-6 min-w-[24px] items-center justify-center rounded-full bg-green-400 text-white">
                                    ✓
                                </div>
                                <div className="flex w-full items-start justify-between">
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
                            <div className="text-xl-semi flex items-center gap-x-4 px-8 pb-6 pt-8">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 font-mono text-sm text-white">
                                    2
                                </div>
                                <h2>Billing address</h2>
                            </div>
                            <div className="text-small-regular bg-gray-50 px-8 py-6">
                                {cart && cart.billing_address ? (
                                    <div className="flex items-start gap-x-8">
                                        <div className="text-small-regular flex h-6 min-w-[24px] items-center justify-center rounded-full bg-green-400 text-white">
                                            ✓
                                        </div>
                                        <div className="flex w-full items-start justify-between">
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
                                    <div className="">
                                        <Spinner />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Addresses;
