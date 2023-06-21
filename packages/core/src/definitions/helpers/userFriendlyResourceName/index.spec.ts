import { userFriendlyResourceName } from "@definitions";

import * as UseRefineContext from "../../../hooks/refine/useRefineContext";
import { defaultRefineOptions } from "@contexts/refine";

describe("userFriendlyResourceName Helper", () => {
    describe("with default options", () => {
        jest.spyOn(UseRefineContext, "useRefineContext").mockReturnValue({
            options: defaultRefineOptions,
        } as any);

        it("should convert kebab-case to humanizeString with plural", async () => {
            const singularKebapCase = "red-tomato";

            const result = userFriendlyResourceName(
                singularKebapCase,
                "plural",
            );

            expect(result).toBe("Red tomatoes");
        });

        it("should convert kebab-case to humanizeString with singular", async () => {
            const singularKebapCase = "red-tomato";

            const result = userFriendlyResourceName(
                singularKebapCase,
                "singular",
            );

            expect(result).toBe("Red tomato");
        });
    });

    describe("with custom options", () => {
        it.each(["singular", "plural"] as const)(
            "should not convert any texts",
            async (type) => {
                jest.spyOn(
                    UseRefineContext,
                    "useRefineContext",
                ).mockReturnValue({
                    options: {
                        textTransformers: {
                            humanize: (text: string) => text,
                            plural: (text: string) => text,
                            singular: (text: string) => text,
                        },
                    },
                } as any);

                const singularKebapCase = "red-tomato";

                const result = userFriendlyResourceName(
                    singularKebapCase,
                    type,
                );

                expect(result).toBe("red-tomato");
            },
        );
    });
});
