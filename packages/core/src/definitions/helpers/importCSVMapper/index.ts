import zip from "lodash/zip";
import fromPairs from "lodash/fromPairs";
import { MapDataFn } from "../../../components/buttons/import/csvImport.interface";

type importCSVMapperType = {
    (
        data: unknown[][],
        mapData: MapDataFn,
    ): unknown[]
};

export const importCSVMapper: importCSVMapperType = (
    data: unknown[][],
    mapData: MapDataFn = (item) => item,
) => {
    const [headers, ...body] = data;
    return body
        .map((entry) => fromPairs(zip(headers, entry)))
        .map((item, index, array) =>
            mapData.call(undefined, item, index, array, data),
        );
};
