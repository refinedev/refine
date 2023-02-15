import { FieldInferencer } from "@/types";

export const numberInfer: FieldInferencer = (key, value) => {
    const isNonEmptyString = typeof value === "string" && value.length > 0;
    const isNotNaN = !isNaN(value as number);

    const isNumericString = isNonEmptyString && isNotNaN;
    const isNumber = typeof value === "number";

    const isNumeric = isNumericString || isNumber;

    console.log({
        key,
        value,
        isNumeric,
        isNumber,
        isNumericString,
        isNotNaN,
        isNonEmptyString,
    });

    if (isNumeric) {
        return {
            key,
            type: "number",
        };
    }

    return false;
};
