import * as RefineCLI from "../../index";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Module = require("module");
const originalRequire = Module.prototype.require;

export const provideCliHelpers = () => {
    Module.prototype.require = function (...args: Parameters<NodeRequire>) {
        if (args[0] === "@pankod/refine-cli") {
            return RefineCLI;
        }

        //do your thing here
        return originalRequire.apply(this, args);
    };
};
