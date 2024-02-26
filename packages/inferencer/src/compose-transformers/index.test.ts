import { composeTransformers } from ".";

describe("composeTransformers", () => {
  it("should compose multiple transformers into one", () => {
    const transformer1 = jest.fn();
    const transformer2 = jest.fn();
    const transformer3 = jest.fn();

    const inferencer = jest.fn();

    const composedTransformer = composeTransformers([
      transformer1,
      transformer2,
      transformer3,
    ]);

    composedTransformer([], [], { name: "test" }, {}, inferencer, "list");

    expect(transformer1).toHaveBeenCalled();
    expect(transformer2).toHaveBeenCalled();
    expect(transformer3).toHaveBeenCalled();
  });
});
