import { Collection, JSCodeshift } from "jscodeshift";
import { CONFIG_FILE_NAME, CodemodConfig } from "../../helpers";
import separateImports from "../../helpers/separateImports";
import {
    exported,
    rename,
    other,
} from "../../definitions/separated-imports/mantine";

export const separateImportsMantine = (j: JSCodeshift, source: Collection) => {
    const config = new CodemodConfig(CONFIG_FILE_NAME);

    if (
        source.find(j.ImportDeclaration, {
            source: { value: "@pankod/refine-mantine" },
        }).length > 0
    ) {
        config.addPackage("@mantine/core", "^5.5.6");
        config.addPackage("@mantine/hooks", "^5.5.6");
        config.addPackage("@mantine/form", "^5.5.6");
        config.addPackage("@mantine/notifications", "^5.5.6");
        config.addPackage("@emotion/react", "^11.8.2");
    }

    separateImports({
        j,
        source,
        imports: exported,
        renameImports: rename,
        otherImports: other,
        currentLibName: "@pankod/refine-mantine",
        nextLibName: "@mantine/core",
    });
};
