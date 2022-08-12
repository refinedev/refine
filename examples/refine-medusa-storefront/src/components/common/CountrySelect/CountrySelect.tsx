import { useCart, useRegions } from "medusa-react";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import NativeSelect, { NativeSelectProps } from "../NativeSelect";

const CountrySelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
    ({ placeholder = "Country", ...props }, ref) => {
        const innerRef = useRef<HTMLSelectElement>(null);

        useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
            ref,
            () => innerRef.current,
        );

        const { regions } = useRegions();
        const { cart } = useCart();

        const countryOptions = useMemo(() => {
            const currentRegion = regions?.find(
                (r) => r.id === cart?.region_id,
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
