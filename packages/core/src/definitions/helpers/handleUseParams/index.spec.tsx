import { handleUseParams } from ".";

const paramsWithoutId = {
    resource: "posts",
};

const paramsWithId = {
    resource: "posts",
    id: "11",
};

const paramsWithUniqueId = {
    resource: "posts",
    id: "hede/hede",
};

const paramsWithBase64EncodedId = {
    resource: "posts",
    id: "cmVmaW5lIHJ1bHo=",
};

describe("handleUseParams", () => {
    it("should return params true even id does not passed", () => {
        expect(handleUseParams(paramsWithoutId)).toEqual(paramsWithoutId);
    });

    it("should return params true with Id", () => {
        expect(handleUseParams(paramsWithId)).toEqual(paramsWithId);
    });

    it("should return params true with unique Id", () => {
        expect(handleUseParams(paramsWithUniqueId)).toEqual(paramsWithUniqueId);
    });

    it("should return params true with nique Id", () => {
        expect(handleUseParams(paramsWithBase64EncodedId)).toEqual(
            paramsWithBase64EncodedId,
        );
    });
});
