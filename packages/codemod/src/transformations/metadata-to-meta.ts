import { API, JSCodeshift, Collection, FileInfo } from "jscodeshift";

export const parser = "tsx";

const metaDataToMeta = (j: JSCodeshift, source: Collection) => {
    const metaData = source.find(j.Identifier, {
        name: "metaData",
    });

    metaData.forEach((path) => {
        console.log(path.node);
        j(path).replaceWith(j.identifier("meta"));
    });
};

export default function transformer(file: FileInfo, api: API): string {
    const j = api.jscodeshift;
    const source = j(file.source);

    metaDataToMeta(j, source);

    return source.toSource();
}
