import jscodeshift from "jscodeshift";
import { fixV4Deprecations } from "./fix-v4-deprecations";

// Test for setSortertoSetSorters function
describe("setSortertoSetSorters", () => {
  const applyTransform = (source: string) => {
    const j = jscodeshift.withParser("tsx");
    const collection = j(source);
    fixV4Deprecations(j, collection);
    return collection.toSource();
  };

  it("should rename sorter to sorters in destructuring when sorters doesn't exist", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps, sorter, setSorter } = useTable();
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps, sorters: sorter, setSorters: setSorter } = useTable();
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should NOT rename sorter when sorters already exists", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps, sorters, sorter, setSorter } = useTable();
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps, sorters, sorter, setSorters: setSorter } = useTable();
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should work with useDataGrid hook", () => {
    const input = `
import { useDataGrid } from "@refinedev/mui";

const MyComponent = () => {
  const { dataGridProps, sorter, setSorter } = useDataGrid();
};
`;

    const expectedOutput = `
import { useDataGrid } from "@refinedev/mui";

const MyComponent = () => {
  const { dataGridProps, sorters: sorter, setSorters: setSorter } = useDataGrid();
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle complex destructuring patterns", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { 
    tableProps, 
    sorter, 
    setSorter,
    filters,
    setFilters 
  } = useTable({
    sorters: {
      initial: [{ field: "id", order: "desc" }]
    }
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { 
    tableProps, 
    sorters: sorter, 
    setSorters: setSorter,
    filters,
    setFilters 
  } = useTable({
    sorters: {
      initial: [{ field: "id", order: "desc" }]
    }
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle case where only setSorter exists", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps, setSorter } = useTable();
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps, setSorters: setSorter } = useTable();
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle case where only sorter exists", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps, sorter } = useTable();
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps, sorters: sorter } = useTable();
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });
});

// Test for mode duplication fix
describe("fixUseSelectHasPaginationToPaginationMode - duplication fix", () => {
  const applyTransform = (source: string) => {
    const j = jscodeshift.withParser("tsx");
    const collection = j(source);
    fixV4Deprecations(j, collection);
    return collection.toSource();
  };

  it("should NOT add duplicate mode when mode already exists", () => {
    const input = `
import { useSelect } from "@refinedev/core";

const MyComponent = () => {
  const { options } = useSelect({
    pagination: {
      mode: "server",
      pageSize: 20
    }
  });
};
`;

    const expectedOutput = `
import { useSelect } from "@refinedev/core";

const MyComponent = () => {
  const { options } = useSelect({
    pagination: {
      mode: "server",
      pageSize: 20
    }
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should add mode when hasPagination exists but mode doesn't", () => {
    const input = `
import { useSelect } from "@refinedev/core";

const MyComponent = () => {
  const { options } = useSelect({
    hasPagination: true,
    pagination: {
      pageSize: 20
    }
  });
};
`;

    const expectedOutput = `
import { useSelect } from "@refinedev/core";

const MyComponent = () => {
  const { options } = useSelect({
    pagination: {
      pageSize: 20,
      mode: "server"
    }
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should add default mode when no hasPagination and no mode exists", () => {
    const input = `
import { useSelect } from "@refinedev/core";

const MyComponent = () => {
  const { options } = useSelect({
    pagination: {
      pageSize: 20
    }
  });
};
`;

    const expectedOutput = `
import { useSelect } from "@refinedev/core";

const MyComponent = () => {
  const { options } = useSelect({
    pagination: {
      pageSize: 20,
      mode: "server"
    }
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });
});

// Test for complex combinations
describe("fixV4Deprecations - Complex Combinations", () => {
  const applyTransform = (source: string) => {
    const j = jscodeshift.withParser("tsx");
    const collection = j(source);
    fixV4Deprecations(j, collection);
    return collection.toSource();
  };

  it("should handle all transformations together", () => {
    const input = `
import { useTable, useSelect, useList } from "@refinedev/core";

const MyComponent = () => {
  const { tableProps, sorter, setSorter } = useTable({
    refineCoreProps: {
      initialSorter: [{ field: "id", order: "desc" }],
      hasPagination: true,
      initialFilter: [{ field: "status", operator: "eq", value: "active" }]
    }
  });

  const { options } = useSelect({
    hasPagination: false,
    sort: [{ field: "name", order: "asc" }]
  });

  const { data } = useList({
    config: {
      filters: [{ field: "type", operator: "eq", value: "post" }],
      sort: [{ field: "createdAt", order: "desc" }]
    }
  });
};
`;

    const expectedOutput = `
import { useTable, useSelect, useList } from "@refinedev/core";

const MyComponent = () => {
  const { tableProps, sorters: sorter, setSorters: setSorter } = useTable({
    refineCoreProps: {
      pagination: {
        mode: "server"
      },
      filters: {
        initial: [{ field: "status", operator: "eq", value: "active" }]
      },
      sorters: {
        initial: [{ field: "id", order: "desc" }]
      }
    }
  });

  const { options } = useSelect({
    pagination: {
      mode: "off"
    },
    sorters: [{ field: "name", order: "asc" }]
  });

  const { data } = useList({
    filters: [{ field: "type", operator: "eq", value: "post" }],
    sorters: [{ field: "createdAt", order: "desc" }]
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle nested object patterns correctly", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const tableConfig = {
    refineCoreProps: {
      initialSorter: computedSorters,
      hasPagination: config.enablePagination,
      initialFilter: filters.active,
      resource: "posts"
    }
  };

  const { tableProps, sorter: currentSorter, setSorter: updateSorter } = useTable(tableConfig);
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const tableConfig = {
    refineCoreProps: {
      pagination: {
        mode: config.enablePagination ? "server" : "off"
      },
      filters: {
        initial: filters.active
      },
      sorters: {
        initial: computedSorters
      },
      resource: "posts"
    }
  };

  const { tableProps, sorters: currentSorter, setSorters: updateSorter } = useTable(tableConfig);
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should preserve existing modern props while transforming deprecated ones", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps, sorter } = useTable({
    refineCoreProps: {
      sorters: {
        permanent: [{ field: "status", order: "asc" }]
      },
      initialSorter: [{ field: "id", order: "desc" }],
      pagination: {
        current: 1,
        pageSize: 10
      },
      hasPagination: true
    }
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps, sorters: sorter } = useTable({
    refineCoreProps: {
      pagination: {
        current: 1,
        pageSize: 10,
        mode: "server"
      },
      sorters: {
        permanent: [{ field: "status", order: "asc" }],
        initial: [{ field: "id", order: "desc" }]
      }
    }
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle multiple hook instances with different patterns", () => {
    const input = `
import { useTable, useDataGrid } from "@refinedev/core";

const MyComponent = () => {
  // Old pattern with top-level props
  const { tableProps: props1, sorter: s1 } = useTable({
    initialSorter: [{ field: "id", order: "asc" }],
    hasPagination: false
  });

  // New pattern with refineCoreProps
  const { tableProps: props2, sorter: s2, setSorter: setS2 } = useTable({
    refineCoreProps: {
      initialSorter: [{ field: "name", order: "desc" }],
      hasPagination: true
    }
  });

  // Mixed pattern
  const { dataGridProps, setSorter: setDataGridSorter } = useDataGrid({
    columns: [],
    initialSorter: [{ field: "date", order: "desc" }]
  });
};
`;

    const expectedOutput = `
import { useTable, useDataGrid } from "@refinedev/core";

const MyComponent = () => {
  // Old pattern with top-level props
  const { tableProps: props1, sorters: s1 } = useTable({
    pagination: {
      mode: "off"
    },
    sorters: {
      initial: [{ field: "id", order: "asc" }]
    }
  });

  // New pattern with refineCoreProps
  const { tableProps: props2, sorters: s2, setSorters: setS2 } = useTable({
    refineCoreProps: {
      pagination: {
        mode: "server"
      },
      sorters: {
        initial: [{ field: "name", order: "desc" }]
      }
    }
  });

  // Mixed pattern
  const { dataGridProps, setSorters: setDataGridSorter } = useDataGrid({
    columns: [],
    sorters: {
      initial: [{ field: "date", order: "desc" }]
    }
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });
});
