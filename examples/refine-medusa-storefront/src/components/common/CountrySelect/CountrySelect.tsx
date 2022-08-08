import React, { useContext } from "react";
import { useOne } from "@pankod/refine-core";
import { useFormContext } from "@pankod/refine-react-hook-form";
import { Cart } from "@medusajs/medusa";

import { CartContext } from "@lib/context";
import NativeSelect from "../NativeSelect";

const CountrySelect: React.FC = () => {
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
        <NativeSelect
            label="Country/Region"
            {...register("shipping_address.country_code", {
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
    );
};

export default CountrySelect;
