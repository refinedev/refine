import { FieldInferencer } from "@/types";

export const numberInfer: FieldInferencer = (key, value) => {
    const isNumber = typeof value === "number";

    if (isNumber) {
        return {
            key,
            type: "number",
        };
    }

    return false;
};
