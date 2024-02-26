import { composeInferencers } from ".";

describe("composeInferencers", () => {
  it("should compose multiple inferencers into one", () => {
    const inferencer1 = jest.fn();
    const inferencer2 = jest.fn();
    const inferencer3 = jest.fn();

    const composedInferencer = composeInferencers([
      inferencer1,
      inferencer2,
      inferencer3,
    ]);

    composedInferencer("key", "value", {}, composedInferencer, "list");

    expect(inferencer1).toHaveBeenCalled();
    expect(inferencer2).toHaveBeenCalled();
    expect(inferencer3).toHaveBeenCalled();

    expect(inferencer1).toHaveBeenCalledWith(
      "key",
      "value",
      {},
      composedInferencer,
      "list",
    );
    expect(inferencer2).toHaveBeenCalledWith(
      "key",
      "value",
      {},
      composedInferencer,
      "list",
    );
    expect(inferencer3).toHaveBeenCalledWith(
      "key",
      "value",
      {},
      composedInferencer,
      "list",
    );
  });
});
