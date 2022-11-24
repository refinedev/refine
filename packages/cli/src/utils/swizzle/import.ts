const packageRegex =
    /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(?:['"])(?:;?)/g;

const nameChangeRegex = /((?:\w|\s|_)*)( as )((?:\w|\s|_)*)( |,)?/g;

export type ImportMatch = {
    statement: string;
    importPath: string;
    defaultImport?: string;
    namedImports?: string;
    namespaceImport?: string;
};

export type NameChangeMatch = {
    statement: string;
    fromName: string;
    toName: string;
    afterCharacter?: string;
};

export const getImports = (content: string): Array<ImportMatch> => {
    const matches = content.matchAll(packageRegex);

    const imports: Array<ImportMatch> = [];

    for (const match of matches) {
        const [
            statement,
            defaultImport,
            namedImports,
            namespaceImport,
            importPath,
        ] = match;

        imports.push({
            statement,
            importPath,
            ...(defaultImport && { defaultImport }),
            ...(namedImports && { namedImports }),
            ...(namespaceImport && { namespaceImport }),
        });
    }

    return imports;
};

export const getNameChangeInImport = (
    namedImportString: string,
): Array<NameChangeMatch> => {
    const matches = namedImportString.matchAll(nameChangeRegex);

    const nameChanges: Array<NameChangeMatch> = [];

    for (const match of matches) {
        const [statement, fromName, _as, toName, afterCharacter] = match;

        nameChanges.push({
            statement,
            fromName: fromName.trim(),
            toName: toName.trim(),
            afterCharacter,
        });
    }

    return nameChanges;
};
