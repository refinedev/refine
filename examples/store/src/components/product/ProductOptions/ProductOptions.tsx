import { ProductOption, ProductOptionValue } from "@medusajs/medusa";
import { Swatch } from "@components/product";
import { SelectedOptions } from "../helpers";

interface ProductOptionsProps {
    options: ProductOption[];
    selectedOptions: SelectedOptions;
    setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>;
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
    options,
    selectedOptions,
    setSelectedOptions,
}) => {
    return (
        <div>
            {options.map((opt) => (
                <div className="pb-4" key={opt.id}>
                    <h2 className="text-sm font-medium uppercase tracking-wide">
                        {opt.title}
                    </h2>
                    <div role="listbox" className="flex flex-row py-4">
                        {opt.values
                            .filter(
                                (
                                    val,
                                    index: number,
                                    arr: ProductOptionValue[],
                                ) =>
                                    arr.findIndex(
                                        (val2) => val2.value === val.value,
                                    ) === index,
                            )
                            .map((v, i: number) => {
                                const active =
                                    selectedOptions[opt.title.toLowerCase()];
                                return (
                                    <Swatch
                                        key={`${opt.id}-${i}`}
                                        active={
                                            v.value.toLowerCase() === active
                                        }
                                        variant={opt.title}
                                        color={""}
                                        label={v.value}
                                        onClick={() => {
                                            setSelectedOptions(
                                                (selectedOptions) => {
                                                    return {
                                                        ...selectedOptions,
                                                        [opt.title.toLowerCase()]:
                                                            v.value.toLowerCase(),
                                                    };
                                                },
                                            );
                                        }}
                                    />
                                );
                            })}
                    </div>
                </div>
            ))}
        </div>
    );
};
