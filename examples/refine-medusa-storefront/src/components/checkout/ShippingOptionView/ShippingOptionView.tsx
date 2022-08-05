import { useCallback, useContext } from "react";
import { useOne } from "@pankod/refine-core";
import { useFormContext, Controller } from "@pankod/refine-react-hook-form";
import { StoreShippingOptionsListRes } from "@medusajs/medusa";

import { Text } from "@components/ui";
import ShippingOptionWidget from "@components/checkout/ShippingOptionWidget";
import { CartContext } from "@lib/context";

const ShippingOptionView: React.FC = () => {
    const { cartId } = useContext(CartContext);
    const { register, getValues, setValue, control } = useFormContext();

    const { data: shippingOptions } = useOne<StoreShippingOptionsListRes>({
        resource: `shipping-options/${cartId}`,
        id: "",
        queryOptions: {
            enabled: !!cartId,
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
                        {...register("shippingMethod")}
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
                render={({}) => <ShippingOptions />}
            />
        </div>
    );
};

export default ShippingOptionView;
