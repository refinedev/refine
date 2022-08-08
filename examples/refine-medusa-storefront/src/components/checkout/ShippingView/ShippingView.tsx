import { useOne } from "@pankod/refine-core";
import { useFormContext } from "@pankod/refine-react-hook-form";
import { Customer } from "@medusajs/medusa";

import { Text } from "@components/ui";
import Input from "@components/common/Input";
import CountrySelect from "@components/common/CountrySelect";
import { emailRegex } from "@lib/regex";

const ShippingView: React.FC = () => {
    const {
        register,
        setValue,
        formState: { errors, touchedFields },
    } = useFormContext();

    useOne<{ customer: Customer }>({
        resource: "auth",
        id: "",
        queryOptions: {
            onSuccess: (data) => {
                setValue("email", data.data.customer.email);
            },
        },
    });

    return (
        <div>
            <Text variant="pageHeading">Shipping Address</Text>
            <div>
                <Input
                    label="Email"
                    {...register("email", {
                        required: "email is required",
                        pattern: {
                            value: emailRegex,
                            message: "invalid email address",
                        },
                    })}
                    errors={errors}
                    touched={touchedFields}
                />
                <div className="grid grid-flow-row grid-cols-12 gap-3">
                    <Input
                        containerClassName="col-span-6"
                        label="First name"
                        {...register("shipping_address.first_name", {
                            required: "first name is required",
                        })}
                        errors={errors}
                        touched={touchedFields}
                    />
                    <Input
                        containerClassName="col-span-6"
                        label="Last name"
                        {...register("shipping_address.last_name", {
                            required: "last name is required",
                        })}
                        errors={errors}
                        touched={touchedFields}
                    />
                </div>
                <Input
                    label="Company (Optional)"
                    {...register("shipping_address.company")}
                    errors={errors}
                    touched={touchedFields}
                />
                <Input
                    label="Street and House Number"
                    {...register("shipping_address.address_1", {
                        required: "street and house number is required",
                    })}
                    errors={errors}
                    touched={touchedFields}
                />
                <Input
                    label="Apartment, Suite, Etc. (Optional)"
                    {...register("shipping_address.address_2")}
                    errors={errors}
                    touched={touchedFields}
                />
                <div className="grid grid-flow-row grid-cols-12 gap-3">
                    <Input
                        containerClassName="col-span-6"
                        label="Postal Code"
                        {...register("shipping_address.postal_code", {
                            required: "postal code is required",
                        })}
                        errors={errors}
                        touched={touchedFields}
                    />
                    <Input
                        containerClassName="col-span-6"
                        label="City"
                        {...register("shipping_address.city", {
                            required: "city is required",
                        })}
                        errors={errors}
                        touched={touchedFields}
                    />
                </div>
                <CountrySelect />
            </div>
        </div>
    );
};

export default ShippingView;
