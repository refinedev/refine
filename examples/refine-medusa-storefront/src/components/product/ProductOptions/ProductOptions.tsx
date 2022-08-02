import { ElementType, memo } from "react";
import { Swatch } from "@components/product";
// import type { ProductOption } from "@commerce/types/product";
import { SelectedOptions } from "../helpers";
import { MedusaProduct } from "@interfaces/index";

type MedusaProductOptions = MedusaProduct["options"];

interface ProductOptionsProps {
    options: MedusaProductOptions;
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
            {options.map((opt) => (
                <div className="pb-4" key={opt.id}>
                    <h2 className="uppercase font-medium text-sm tracking-wide">
                        {opt.title}
                    </h2>
                    <div role="listbox" className="flex flex-row py-4">
                        {opt.values
                            .filter(
                                (val, index: number, arr: any[]) =>
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

export default memo(ProductOptions);
