import jscodeshift from "jscodeshift";
import { fixV4Deprecations } from "./fix-v4-deprecations";

// Test for performance and large files
describe("fixV4Deprecations - Performance & Large Files", () => {
  const applyTransform = (source: string) => {
    const j = jscodeshift.withParser("tsx");
    const collection = j(source);
    fixV4Deprecations(j, collection);
    return collection.toSource();
  };

  it("should handle large files with many hook instances", () => {
    // Generate a large file with many hook instances
    const generateHookCall = (index: number) => `
  const { tableProps: props${index}, sorter: s${index}, setSorter: setS${index} } = useTable({
    refineCoreProps: {
      initialSorter: [{ field: "field${index}", order: "${
        index % 2 === 0 ? "asc" : "desc"
      }" }],
      hasPagination: ${index % 2 === 0},
      initialFilter: [{ field: "filter${index}", operator: "eq", value: "${index}" }]
    }
  });`;

    const input = `
import { useTable } from "@refinedev/react-table";

const LargeComponent = () => {
  ${Array.from({ length: 50 }, (_, i) => generateHookCall(i)).join("\n")}
  
  return <div>Large component</div>;
};
`;

    const start = performance.now();
    const result = applyTransform(input);
    const end = performance.now();

    // Should complete in reasonable time (less than 5 seconds)
    expect(end - start).toBeLessThan(5000);

    // Should transform all instances
    expect(result).toContain("sorters: {");
    expect(result).toContain("pagination: {");
    expect(result).toContain("filters: {");

    // Should rename all destructured variables
    expect(result).toContain("sorters: s0");
    expect(result).toContain("setSorters: setS0");

    // Should not contain deprecated props
    expect(result).not.toContain("initialSorter");
    expect(result).not.toContain("hasPagination");
    expect(result).not.toContain("initialFilter");
  });

  it("should handle deeply nested components", () => {
    const input = `
import { useTable, useSelect, useList } from "@refinedev/core";

const Level1 = () => {
  const { tableProps } = useTable({ initialSorter: [] });
  
  const Level2 = () => {
    const { options } = useSelect({ sort: [] });
    
    const Level3 = () => {
      const { data } = useList({ config: { sort: [] } });
      
      const Level4 = () => {
        const { tableProps: deepProps, sorter } = useTable({
          refineCoreProps: {
            initialSorter: [{ field: "deep", order: "asc" }],
            hasPagination: true
          }
        });
        
        return <div>Level 4</div>;
      };
      
      return <Level4 />;
    };
    
    return <Level3 />;
  };
  
  return <Level2 />;
};
`;

    const result = applyTransform(input);

    // Should transform all nested instances
    expect(result).toContain("sorters: {");
    expect(result).toContain("pagination: {");
    expect(result).toContain("sorters: []");
    expect(result).toContain("sorters: sorter");

    // Should not contain deprecated props
    expect(result).not.toContain("initialSorter");
    expect(result).not.toContain("config: {");
    expect(result).not.toContain("sort:");
  });

  it("should handle mixed import scenarios", () => {
    const input = `
import { useTable as useTableAntd } from "@refinedev/antd";
import { useTable as useTableMui } from "@refinedev/mui";
import { useTable } from "@refinedev/react-table";
import { useDataGrid } from "@refinedev/mui";
import { useSelect, useList } from "@refinedev/core";

const MultiLibraryComponent = () => {
  const { tableProps: antdProps, sorter: antdSorter } = useTableAntd({
    initialSorter: [{ field: "antd", order: "asc" }],
    hasPagination: true
  });

  const { tableProps: muiProps, setSorter: muiSetSorter } = useTableMui({
    refineCoreProps: {
      permanentSorter: [{ field: "mui", order: "desc" }],
      initialCurrent: 2
    }
  });

  const { tableProps: reactTableProps } = useTable({
    columns: [],
    refineCoreProps: {
      initialSorter: [],
      hasPagination: false,
      initialFilter: []
    }
  });

  const { dataGridProps, sorter: gridSorter } = useDataGrid({
    initialPageSize: 25,
    permanentSorter: [{ field: "grid", order: "asc" }]
  });

  const { options } = useSelect({
    sort: [{ field: "select", order: "desc" }],
    hasPagination: true
  });

  const { data } = useList({
    config: {
      sort: [{ field: "list", order: "asc" }],
      filters: []
    },
    hasPagination: false
  });

  return <div>Multi-library component</div>;
};
`;

    const result = applyTransform(input);

    // Should preserve import aliases
    expect(result).toContain("useTableAntd");
    expect(result).toContain("useTableMui");

    // Should transform all hook instances regardless of import source
    expect(result).toContain("sorters: antdSorter");
    expect(result).toContain("setSorters: muiSetSorter");
    expect(result).toContain("sorters: gridSorter");

    // Should transform all prop structures
    expect(result.match(/sorters: \{/g)).toHaveLength(4); // 4 hooks with sorters
    expect(result.match(/pagination: \{/g)).toHaveLength(5); // 5 hooks with pagination

    // Should not contain any deprecated props
    expect(result).not.toContain("initialSorter");
    expect(result).not.toContain("permanentSorter");
    expect(result).not.toContain("hasPagination");
    expect(result).not.toContain("initialPageSize");
    expect(result).not.toContain("initialCurrent");
    expect(result).not.toContain("config: {");
    expect(result).not.toContain("sort:");
  });

  it("should handle files with comments and complex formatting", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const ComponentWithComments = () => {
  // This is a table hook with deprecated props
  const { 
    tableProps, 
    // Old sorter property
    sorter, 
    /* Multi-line comment
       for setSorter */
    setSorter 
  } = useTable({
    // Configuration object
    refineCoreProps: {
      // Deprecated initial sorter
      initialSorter: [
        {
          field: "id", // Sort by ID
          order: "desc" // Descending order
        }
      ],
      /* 
       * Deprecated pagination flag
       * Should be converted to pagination.mode
       */
      hasPagination: true,
      // Other props
      resource: "posts"
    }
  });

  return <div>Component with comments</div>;
};
`;

    const result = applyTransform(input);

    // Should preserve comments
    expect(result).toContain("// This is a table hook");
    expect(result).toContain("// Old sorter property");
    expect(result).toContain("/* Multi-line comment");
    expect(result).toContain("// Configuration object");
    expect(result).toContain("// Sort by ID");
    expect(result).toContain("// Descending order");
    expect(result).toContain("// Other props");

    // Should transform deprecated props
    expect(result).toContain("sorters: sorter");
    expect(result).toContain("setSorters: setSorter");
    expect(result).toContain("sorters: {");
    expect(result).toContain("initial: [");
    expect(result).toContain("pagination: {");
    expect(result).toContain('mode: "server"');

    // Should preserve other props
    expect(result).toContain('resource: "posts"');

    // Should not contain deprecated props
    expect(result).not.toContain("initialSorter");
    expect(result).not.toContain("hasPagination");
  });

  it("should handle edge case with no transformations needed", () => {
    const input = `
import React from "react";
import { Table } from "antd";

const RegularComponent = () => {
  const data = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" }
  ];

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" }
  ];

  // This is not a refine hook, should not be transformed
  const useCustomHook = () => {
    return {
      initialSorter: [],
      hasPagination: true
    };
  };

  const customResult = useCustomHook();

  return <Table dataSource={data} columns={columns} />;
};
`;

    const result = applyTransform(input);

    // Should not change anything
    expect(result.trim()).toBe(input.trim());
  });
});
