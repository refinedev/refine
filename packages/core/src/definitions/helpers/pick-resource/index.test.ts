import { pickResource } from ".";
import { legacyResourceTransform } from "../legacy-resource-transform";

describe("pickResource", () => {
  it("should pick by name", () => {
    const resource = pickResource("name", [
      { name: "name", options: { route: "route" } },
    ]);

    expect(resource?.name).toBe("name");
  });

  it("should match by identifier", () => {
    const resource = pickResource("identifier", [
      {
        name: "name",
        identifier: "identifier",
        options: { route: "route" },
      },
    ]);

    expect(resource?.identifier).toBe("identifier");
  });

  it("should not match by identifier if legacy", () => {
    const resource = pickResource(
      "identifier",
      [
        {
          name: "name",
          identifier: "identifier",
          options: { route: "route" },
        },
      ],
      true,
    );

    expect(resource).toBeUndefined();
  });

  it("should return undefined if name and identifier does not match", () => {
    const resource = pickResource("users", [
      { name: "name", identifier: "identifier" },
    ]);

    expect(resource).toBeUndefined();
  });

  it("should match by route first if legacy", () => {
    const resource = pickResource(
      "route",
      legacyResourceTransform([
        { name: "name", options: { route: "route" } },
        {
          name: "route",
        },
      ]),
      true,
    );

    expect(resource?.name).toBe("name");
  });

  it("should return undefined if `identifier` is not defined", () => {
    const resource = pickResource(undefined, [{ name: "name" }], true);

    expect(resource).toBeUndefined();
  });
});
