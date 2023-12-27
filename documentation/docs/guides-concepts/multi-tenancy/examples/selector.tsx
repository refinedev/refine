import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function Selector() {
  return (
    <Sandpack
      hidePreview={true}
      showFiles={false}
      showOpenInCodeSandbox={false}
      showReadOnly={false}
      template="react-ts"
      dependencies={{
        "@refinedev/core": "latest",
      }}
      files={{
        "/components/tenant-selector.tsx": {
          code: TenantSelectorTsxCode,
          active: true,
          readOnly: true,
        },
        "App.tsx": {
          code: "",
          hidden: true,
        },
      }}
    />
  );
}

const TenantSelectorTsxCode = /* jsx */ `
import React from "react";
import { useSelect, useParsed, useGo, useGetToPath } from "@refinedev/core";

export const TenantSelector = () => {
  const {
    options,
    queryResult: { isLoading },
  } = useSelect({
    // We're using the \`tenants\` resource to get the list of tenants
    // Your API may have a different way to access the list of tenants
    // or you may have a specific set of tenants that you want to show
    resource: "tenants",
    optionLabel: "name",
    optionValue: "id",
  });

  // We'll use the useGo and useGetToPath hooks to navigate to the selected tenant
  const go = useGo();
  const getToPath = useGetToPath();
  // We're using the useParsed hook to get the current route information and params (tenantId)
  const {
    resource,
    action,
    id,
    params: { tenantId },
  } = useParsed();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTenantId = event.target.value;

    go({
      to: getToPath({
        resource,
        action: action ?? "list",
        id,
        meta: {
          // We're passing the selected tenantId to the meta object
          // Refine will use \`meta\` to decorate the additional parameters when constructing the route to navigate to
          tenantId: selectedTenantId,
        },
      }),
      type: "replace",
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <select onChange={onChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value} selected={value === tenantId}>
          {label}
        </option>
      ))}
    </select>
  );
};
`.trim();
