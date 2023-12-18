import { stringify, ParsedUrlQueryInput } from "querystring";

export const urlWithQueryString = (
    url: string,
    query: ParsedUrlQueryInput,
    queryFilters: ParsedUrlQueryInput,
) => {
    const queryObject = { ...query, ...queryFilters };

    if (Object.keys(queryObject).length > 0) {
        return `${url}?${stringify(queryObject)}`;
    }
    return url;
};
