import { stringify, ParsedUrlQueryInput } from "querystring";

export const urlWithQueryString = (
    url: string,
    query: ParsedUrlQueryInput,
    queryFilters: ParsedUrlQueryInput,
) => {
    const hasQuery = Object.keys(query).length > 0;
    const hasQueryFilters = Object.keys(queryFilters).length > 0;
    let requestUrl = url;

    if (hasQuery || hasQueryFilters) {
        requestUrl += "?";

        if (hasQuery) {
            requestUrl += stringify(query);
        }

        if (hasQuery && hasQueryFilters) {
            requestUrl += "&";
        }

        if (hasQueryFilters) {
            requestUrl += stringify(queryFilters);
        }
    }

    return requestUrl;
};
