import { userFriendlyResourceName } from "@definitions";

import * as UseRefineContext from "../../../hooks/refine/useRefineContext";
import { defaultRefineOptions } from "@contexts/refine";

describe("userFriendlyResourceName Helper", () => {
    jest.spyOn(UseRefineContext, "useRefineContext").mockReturnValue({
        options: defaultRefineOptions,
    } as any);

    it("should convert kebab-case to humanizeString with plural", async () => {
        const singularKebapCase = "red-tomato";

        const result = userFriendlyResourceName(singularKebapCase, "plural");

        expect(result).toBe("Red tomatoes");
    });

    it("should convert kebab-case to humanizeString with singular", async () => {
        const singularKebapCase = "red-tomato";

        const result = userFriendlyResourceName(singularKebapCase, "singular");

        expect(result).toBe("Red tomato");
    });
});
