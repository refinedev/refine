import { useSelect } from "@refinedev/antd";
import { useGetToPath, useGo, useParsed } from "@refinedev/core";
import { Select } from "antd";

import { IStore } from "interfaces";

export const StoreSelect: React.FC = () => {
    const getToPath = useGetToPath();
    const go = useGo();
    const { resource, action, params } = useParsed<{ tenant: string }>();

    const { selectProps: storeSelectProps } = useSelect<IStore>({
        resource: "stores",
        optionLabel: "title",
        optionValue: "id",
        meta: {
            tenant: undefined,
        },
    });

    return (
        <Select
            defaultValue={params?.tenant}
            style={{ width: 120 }}
            onChange={(tenant) =>
                go({
                    to: getToPath({
                        resource,
                        action: action || "list",
                        meta: {
                            tenant,
                        },
                    }),
                })
            }
            onSelect={() => false}
        >
            {storeSelectProps.options?.map(({ value, label }) => (
                <Select.Option key={value} value={value}>
                    {label}
                </Select.Option>
            ))}
        </Select>
    );
};
