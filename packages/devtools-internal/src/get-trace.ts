import ErrorStackParser from "error-stack-parser";
import { cleanStack } from "./clean-stack";

export function getTrace(fromError?: Error) {
    try {
        const parsed = ErrorStackParser.parse(fromError ?? new Error());

        const cleaned = cleanStack(parsed);

        console.log("Cleaned", cleaned);
    } catch (error) {
        //
    }
}
