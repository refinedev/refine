import zip from "lodash/zip";
import fromPairs from "lodash/fromPairs";
import { MapDataFn } from "../../../hooks/import";

export const importCSVMapper = <
    TItem = unknown,
    TVariables extends TItem = TItem,
>(
    data: unknown[][],
    mapData: MapDataFn<TItem, TVariables>,
): TVariables[] => {
    const [headers, ...body] = data;
    return body
        .map((entry) => fromPairs(zip(headers, entry)))
        .map((item: any, index, array: any) =>
            mapData.call(undefined, item, index, array),
        );
};
