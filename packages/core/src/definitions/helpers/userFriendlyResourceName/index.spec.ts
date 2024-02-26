import { userFriendlyResourceName } from "@definitions";

describe("userFriendlyResourceName Helper", () => {
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
