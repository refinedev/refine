import jscodeshift from "jscodeshift";
import { fixV4Deprecations } from "./fix-v4-deprecations";

// Test for error handling and edge cases
describe("fixV4Deprecations - Error Handling & Edge Cases", () => {
  const applyTransform = (source: string) => {
    const j = jscodeshift.withParser("tsx");
    const collection = j(source);
    fixV4Deprecations(j, collection);
    return collection.toSource();
  };

  it("should handle empty arguments gracefully", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable();
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable();
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle null/undefined arguments", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const config = null;
  const { tableProps } = useTable(config);
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const config = null;
  const { tableProps } = useTable(config);
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle non-object arguments", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable("invalid");
};
`;

    // Should not crash and should leave code unchanged
    expect(() => applyTransform(input)).not.toThrow();
  });

  it("should handle empty refineCoreProps", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {}
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {}
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle malformed refineCoreProps", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: null
  });
};
`;

    // Should not crash
    expect(() => applyTransform(input)).not.toThrow();
  });

  it("should handle complex expressions in prop values", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      initialSorter: getSorters() || defaultSorters,
      hasPagination: conditions.some(c => c.enabled) && config?.pagination !== false,
      initialFilter: filters.filter(f => f.active).map(transformFilter)
    }
  });
};
`;

    const result = applyTransform(input);

    // Should preserve complex expressions
    expect(result).toContain("getSorters() || defaultSorters");
    expect(result).toContain(
      "conditions.some(c => c.enabled) && config?.pagination !== false",
    );
    expect(result).toContain(
      "filters.filter(f => f.active).map(transformFilter)",
    );

    // Should transform structure
    expect(result).toContain("sorters: {");
    expect(result).toContain("initial: getSorters() || defaultSorters");
    expect(result).toContain("pagination: {");
    expect(result).toContain("filters: {");
  });

  it("should handle spread operators", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const baseConfig = {
    initialSorter: [{ field: "id", order: "desc" }]
  };
  
  const { tableProps } = useTable({
    ...baseConfig,
    refineCoreProps: {
      ...otherProps,
      hasPagination: true,
      initialFilter: [...existingFilters, newFilter]
    }
  });
};
`;

    const result = applyTransform(input);

    // Should preserve spread operators
    expect(result).toContain("...baseConfig");
    expect(result).toContain("...otherProps");
    expect(result).toContain("[...existingFilters, newFilter]");

    // Should transform deprecated props
    expect(result).toContain("sorters: {");
    expect(result).toContain("pagination: {");
    expect(result).toContain("filters: {");
  });

  it("should handle computed property names", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const propName = "initialSorter";
  const { tableProps } = useTable({
    refineCoreProps: {
      [propName]: [{ field: "id", order: "desc" }],
      hasPagination: true
    }
  });
};
`;

    const result = applyTransform(input);

    // Should handle computed property names (though transformation might not apply)
    expect(result).toContain("[propName]");
    expect(() => applyTransform(input)).not.toThrow();
  });

  it("should handle method calls as property values", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      initialSorter: getSorters(),
      hasPagination: checkPagination(),
      initialFilter: getFilters().filter(Boolean)
    }
  });
};
`;

    const result = applyTransform(input);

    // Should preserve method calls
    expect(result).toContain("getSorters()");
    expect(result).toContain("checkPagination()");
    expect(result).toContain("getFilters().filter(Boolean)");

    // Should transform structure
    expect(result).toContain("sorters: {");
    expect(result).toContain("initial: getSorters()");
    expect(result).toContain("pagination: {");
    expect(result).toContain("mode: checkPagination()");
  });

  it("should handle nested object destructuring in hook calls", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { 
    tableProps: { 
      dataSource, 
      loading 
    }, 
    sorter, 
    setSorter 
  } = useTable({
    refineCoreProps: {
      initialSorter: [{ field: "id", order: "desc" }]
    }
  });
};
`;

    const result = applyTransform(input);

    // Should preserve nested destructuring
    expect(result).toContain("tableProps: {");
    expect(result).toContain("dataSource,");
    expect(result).toContain("loading");

    // Should transform deprecated props
    expect(result).toContain("sorters: sorter");
    expect(result).toContain("setSorters: setSorter");
    expect(result).toContain("sorters: {");
    expect(result).toContain('initial: [{ field: "id", order: "desc" }]');
  });

  it("should handle hooks called with variable references", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const tableConfig = {
    refineCoreProps: {
      initialSorter: sortersArray,
      hasPagination: paginationFlag
    }
  };
  
  const anotherConfig = getTableConfig();
  
  const { tableProps, sorter } = useTable(tableConfig);
  const { tableProps: props2 } = useTable(anotherConfig);
};
`;

    const result = applyTransform(input);

    // Should transform the first case (object literal)
    expect(result).toContain("sorters: {");
    expect(result).toContain("initial: sortersArray");
    expect(result).toContain("pagination: {");
    expect(result).toContain("mode: paginationFlag");

    // Should preserve variable references
    expect(result).toContain("useTable(anotherConfig)");
    expect(result).toContain("sorters: sorter");
  });

  it("should handle TypeScript type annotations", () => {
    const input = `
import { useTable } from "@refinedev/react-table";
import type { IPost } from "./types";

const MyComponent = () => {
  const { tableProps, sorter, setSorter } = useTable<IPost>({
    refineCoreProps: {
      initialSorter: [{ field: "id", order: "desc" }],
      hasPagination: true
    }
  });
};
`;

    const result = applyTransform(input);

    // Should preserve TypeScript type annotations
    expect(result).toContain("useTable<IPost>");

    // Should transform deprecated props
    expect(result).toContain("sorters: sorter");
    expect(result).toContain("setSorters: setSorter");
    expect(result).toContain("sorters: {");
    expect(result).toContain("pagination: {");
  });

  it("should handle multiple transformations on same line", () => {
    const input = `
import { useTable, useSelect, useList } from "@refinedev/core";

const MyComponent = () => {
  const [result1, result2, result3] = [
    useTable({ initialSorter: [], hasPagination: true }),
    useSelect({ sort: [], hasPagination: false }),
    useList({ config: { sort: [] } })
  ];
};
`;

    const result = applyTransform(input);

    // Should transform all instances
    expect(result).toContain("sorters: {");
    expect(result).toContain("pagination: {");
    expect(result).toContain("sorters: []");

    // All deprecated props should be transformed
    expect(result).not.toContain("initialSorter");
    expect(result).not.toContain("hasPagination");
    expect(result).not.toContain("config: {");
  });
});
