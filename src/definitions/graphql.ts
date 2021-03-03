export const generateFieldsArray = (obj: string[]) => {
    const result: string[] = [];

    // For each object path (property key) in the object
    for (const objectPath of obj) {
        // Split path into component parts
        const parts = objectPath.split(".");

        // Create sub-objects along path as needed
        let target = result;
        while (parts.length > 1) {
            const part = parts.shift();

            if (part) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                target = target[part] = target[part] || [];
            }
        }

        // Set value at end of path
        if (target.push) {
            target.push(parts[0]);
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            target[parts[0]] = undefined;
        }
    }

    const response = [];
    for (const iterator of Object.entries(result)) {
        if (Number(iterator[0]) >= 0) {
            response.push(iterator[1]);
        } else {
            response.push({ [iterator[0]]: iterator[1] });
        }
    }
    return response;
};
