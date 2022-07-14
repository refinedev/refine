// import type { Product } from "@commerce/types/product";
export type SelectedOptions = Record<string, string | null>;
import { Dispatch, SetStateAction } from "react";
import Medusa from "@medusajs/medusa-js";

export type MedusaProduct = Awaited<
    ReturnType<Medusa["products"]["list"]>
>["products"][number];

export function getProductVariant(product: any, opts: SelectedOptions) {
    const variant = product?.variants.find((variant: any) => {
        return Object.entries(opts).every(([key, value]) =>
            variant.options.find((option: any) => {
                if (
                    option.__typename === "MultipleChoiceOption" &&
                    option.title.toLowerCase() === key.toLowerCase()
                ) {
                    return option.values.find(
                        (v: any) => v.value.toLowerCase() === value,
                    );
                }
            }),
        );
    });
    return variant;
}

export function selectDefaultOptionFromProduct(
    product: MedusaProduct, // Product
    updater: Dispatch<SetStateAction<SelectedOptions>>,
) {
    const selectedOptions: Record<string, string> = {};
    // Selects the default option
    product.variants[0]?.options?.forEach((v) => {
        const option = product.options.find(
            (o) => o.id.toLowerCase() === v.option_id.toLowerCase(),
        );

        if (option) {
            selectedOptions[option.title.toLowerCase()] = v.value.toLowerCase();
        }
    });
    updater(selectedOptions);
}

export function currencySymbolFromCode(code: string) {
    switch (code.toLowerCase()) {
        case "usd":
            return "$";
        case "eur":
            return "€";
        case "gbp":
            return "£";
        default:
            return code;
    }
}
