import { Plugin } from "esbuild";

export const removeTestIdsPlugin: Plugin = {
    name: "react-remove-testids",
    setup(build) {
        build.onEnd(async (args) => {
            // data-testid regexp
            const regexp = /("data-testid":)(.*?)(?:(,)|(}))/gi;

            // output files with `*.js`
            const jsOutputFiles =
                args.outputFiles?.filter((el) => el.path.endsWith(".js")) ?? [];

            // replace data-testid in output files
            for (const jsOutputFile of jsOutputFiles) {
                const str = new TextDecoder("utf-8").decode(
                    jsOutputFile.contents,
                );
                const newStr = str.replace(regexp, "$4");
                jsOutputFile.contents = new TextEncoder().encode(newStr);
            }
        });
    },
};
