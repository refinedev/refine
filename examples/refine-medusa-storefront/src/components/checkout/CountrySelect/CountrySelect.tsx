import {
    forwardRef,
    useContext,
    useImperativeHandle,
    useMemo,
    useRef,
} from "react";
import { useList, useOne } from "@pankod/refine-core";
import { Region, Cart } from "@medusajs/medusa";
import { NativeSelectProps } from "@components";
import { CartContext } from "@lib/context";
import NativeSelect from "@components/ui/NativeSelect/NativeSelect";

const CountrySelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
    ({ placeholder = "Country", ...props }, ref) => {
        const innerRef = useRef<HTMLSelectElement>(null);

        useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
            ref,
            () => innerRef.current,
        );

        const { cartId } = useContext(CartContext);

        // useOne for getting the region and cart
        const { data: regions } = useList<Region>({
            resource: "regions",
        });

        const { data: cart } = useOne<Cart>({
            resource: "carts",
            id: cartId as string,
        });

        const countryOptions = useMemo(() => {
            const currentRegion = regions?.data.find(
                (r) => r.id === cart?.data.region_id,
            );

            if (!currentRegion) {
                return [];
            }

            return currentRegion.countries.map((country) => ({
                value: country.iso_2,
                label: country.display_name,
            }));
        }, [regions, cart]);

        return (
            <NativeSelect ref={innerRef} placeholder={placeholder} {...props}>
                {countryOptions.map(({ value, label }, index) => (
                    <option key={index} value={value}>
                        {label}
                    </option>
                ))}
            </NativeSelect>
        );
    },
);

CountrySelect.displayName = "CountrySelect";

export default CountrySelect;
