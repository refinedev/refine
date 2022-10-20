import { useEffect, useState } from "react";
import getSlug from "./get-slug";

export function useSearchMeta(asPath: string) {
    const [pathname, setPathname] = useState<string>("/search");
    const [category, setCategory] = useState<string | undefined>();
    const [brand, setBrand] = useState<string | undefined>();

    useEffect(() => {
        // Only access asPath after hydration to avoid a server mismatch
        const path = asPath.split("?")[0];
        const parts = path.split("/");

        let c = parts[2];
        const b = parts[3];

        if (c === "designers") {
            c = parts[4];
        }

        if (path !== pathname) setPathname(path);
        if (c !== category) setCategory(c);
        if (b !== brand) setBrand(b);
    }, [asPath, pathname, category, brand]);

    return { pathname, category, brand };
}

// Removes empty query parameters from the query object
// eslint-disable-next-line
export const filterQuery = (query: any) =>
    // eslint-disable-next-line
    Object.keys(query).reduce<any>((obj, key) => {
        if (query[key]?.length) {
            obj[key] = query[key];
        }
        return obj;
    }, {});

export const getCategoryPath = (path: string, brand?: string) => {
    const category = getSlug(path);

    return `/search${brand ? `/designers/${brand}` : ""}${
        category ? `/${category}` : ""
    }`;
};

export const getDesignerPath = (path: string, category?: string) => {
    const designer = getSlug(path).replace(/^brands/, "designers");

    return `/search${designer ? `/${designer}` : ""}${
        category ? `/${category}` : ""
    }`;
};
