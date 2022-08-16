import { useCallback } from "react";
import { useOne } from "@pankod/refine-core";
import { useFormContext, Controller } from "@pankod/refine-react-hook-form";
import { StoreShippingOptionsListRes } from "@medusajs/medusa";
import { ErrorMessage } from "@hookform/error-message";

import { ShippingOptionWidget, Text } from "@components";
import { useCartContext } from "@lib/context";

export const ShippingOptionView: React.FC = () => {
    const { cart } = useCartContext();
    const {
        getValues,
        setValue,
        control,
        formState: { errors },
    } = useFormContext();

    const { data: shippingOptions } = useOne<StoreShippingOptionsListRes>({
        resource: `shipping-options/${cart?.id}`,
        id: "",
        queryOptions: {
            enabled: !!cart?.id,
        },
    });

    const ShippingOptions = useCallback(
        () => (
            <>
                {shippingOptions?.data?.shipping_options.map((option) => (
                    <ShippingOptionWidget
                        key={option.id}
                        isValid={getValues()?.shippingMethod === option.id}
                        onClick={() => {
                            setValue("shippingMethod", option.id);
                        }}
                    >
                        {option.name}
                    </ShippingOptionWidget>
                ))}
            </>
        ),
        [shippingOptions],
    );

    return (
        <div>
            <Text variant="pageHeading">Delivery</Text>
            <Controller
                control={control}
                name="shippingMethod"
                rules={{
                    required: {
                        message: "shipping is required",
                        value: true,
                    },
                }}
                render={() => <ShippingOptions />}
            />
            <ErrorMessage
                errors={errors}
                name="shippingMethod"
                render={({ message }) => {
                    return (
                        <div className="pt-1 text-xs text-rose-500">
                            <span>{message}</span>
                        </div>
                    );
                }}
            />
        </div>
    );
};
