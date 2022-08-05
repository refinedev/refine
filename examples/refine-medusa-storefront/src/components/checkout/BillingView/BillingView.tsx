import { useContext } from "react";
import { useOne } from "@pankod/refine-core";
import { useFormContext } from "@pankod/refine-react-hook-form";
import { Cart } from "@medusajs/medusa";

import { Text } from "@components/ui";
import Input from "@components/common/Input";
import { CartContext } from "@lib/context";
import NativeSelect from "@components/common/NativeSelect";

const BillingView: React.FC = () => {
    const { cartId } = useContext(CartContext);
    const {
        register,
        formState: { errors, touchedFields },
    } = useFormContext();

    const { data: cartData } = useOne<{ cart: Cart }>({
        id: cartId!,
        resource: "carts",
        queryOptions: {
            enabled: !!cartId,
        },
    });
    const countries = cartData?.data.cart.region.countries;

    return (
        <div>
            <Text variant="pageHeading">Billing Address</Text>
            <div>
                <div className="grid grid-flow-row grid-cols-12 gap-3">
                    <Input
                        containerClassName="col-span-6"
                        label="First name"
                        {...register("billing_address.first_name", {
                            required: "first name is required",
                        })}
                        errors={errors}
                        touched={touchedFields}
                    />
                    <Input
                        containerClassName="col-span-6"
                        label="Last name"
                        {...register("billing_address.last_name", {
                            required: "last name is required",
                        })}
                        errors={errors}
                        touched={touchedFields}
                    />
                </div>
                <Input
                    label="Company (Optional)"
                    {...register("billing_address.company")}
                    errors={errors}
                    touched={touchedFields}
                />
                <Input
                    label="Street and House Number"
                    {...register("billing_address.address_1", {
                        required: "street and house number is required",
                    })}
                    errors={errors}
                    touched={touchedFields}
                />
                <Input
                    label="Apartment, Suite, Etc. (Optional)"
                    {...register("billing_address.address_2")}
                    errors={errors}
                    touched={touchedFields}
                />
                <div className="grid grid-flow-row grid-cols-12 gap-3">
                    <Input
                        containerClassName="col-span-6"
                        label="Postal Code"
                        {...register("billing_address.postal_code", {
                            required: "postal code is required",
                        })}
                        errors={errors}
                        touched={touchedFields}
                    />
                    <Input
                        containerClassName="col-span-6"
                        label="City"
                        {...register("billing_address.city", {
                            required: "city is required",
                        })}
                        errors={errors}
                        touched={touchedFields}
                    />
                </div>
                <NativeSelect
                    label="Country/Region"
                    {...register("billing_address.country_code", {
                        required: "country is required",
                    })}
                    errors={errors}
                    touched={touchedFields}
                >
                    {countries?.map((country, index) => (
                        <option key={index} value={country.iso_2}>
                            {country.display_name}
                        </option>
                    ))}
                </NativeSelect>
            </div>
        </div>
    );
};

export default BillingView;
