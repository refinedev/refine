const isNested = (obj: any) => typeof obj === "object" && obj !== null;
const isArray = (obj: any) => Array.isArray(obj);

export const flattenObjectKeys = (obj: any, prefix = "") => {
    if (!isNested(obj)) {
        return {
            [prefix]: obj,
        };
    }

    return Object.keys(obj).reduce((acc, key) => {
        const currentPrefix = prefix.length ? prefix + "." : "";

        if (isNested(obj[key]) && Object.keys(obj[key]).length) {
            if (isArray(obj[key]) && obj[key].length) {
                obj[key].forEach((item: unknown[], index: number) => {
                    Object.assign(
                        acc,
                        flattenObjectKeys(
                            item,
                            currentPrefix + key + "." + index,
                        ),
                    );
                });
            } else {
                Object.assign(
                    acc,
                    flattenObjectKeys(obj[key], currentPrefix + key),
                );
            }
        } else {
            acc[currentPrefix + key] = obj[key];
        }
        return acc;
    }, {} as Record<string, unknown>);
};
