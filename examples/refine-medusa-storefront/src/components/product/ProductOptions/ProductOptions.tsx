import { memo } from "react";
import { Swatch } from "@components/product";
// import type { ProductOption } from "@commerce/types/product";
import { SelectedOptions } from "../helpers";

interface ProductOptionsProps {
    options: any; //ProductOption[];
    selectedOptions: SelectedOptions;
    setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
    options,
    selectedOptions,
    setSelectedOptions,
}) => {
    return (
        <div>
            {options.map((opt: any) => (
                <div className="pb-4" key={opt.title}>
                    <h2 className="uppercase font-medium text-sm tracking-wide">
                        {opt.title}
                    </h2>
                    <div role="listbox" className="flex flex-row py-4">
                        {opt.values
                            .filter(
                                (val: any, index: number, arr: any[]) =>
                                    arr.findIndex(
                                        (val2) => val2.value === val.value,
                                    ) === index,
                            )
                            .map((v: any, i: number) => {
                                const active =
                                    selectedOptions[opt.title.toLowerCase()];
                                return (
                                    <Swatch
                                        key={`${opt.id}-${i}`}
                                        active={
                                            v.value.toLowerCase() === active
                                        }
                                        variant={opt.title}
                                        color={
                                            v.hexColors ? v.hexColors[0] : ""
                                        }
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

export default memo(ProductOptions);
