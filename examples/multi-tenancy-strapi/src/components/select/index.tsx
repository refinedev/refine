import { useSelect } from "@refinedev/antd";
import { Select } from "antd";
import { useGetToPath, useGo, useParsed } from "@refinedev/core";

import { IStore } from "interfaces";

type SelectProps = {
    onSelect?: () => void;
};

export const StoreSelect: React.FC<SelectProps> = ({ onSelect }) => {
    const getToPath = useGetToPath();
    const go = useGo();
    const { resource, action, params } = useParsed<{ tenant: string }>();

    const { selectProps: storeSelectProps } = useSelect<IStore>({
        resource: "stores",
        optionLabel: "title",
        optionValue: "id",
    });

    if (!params?.tenant) {
        return null;
    }

    return (
        <Select
            defaultValue={+params?.tenant}
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
            onSelect={onSelect}
        >
            {storeSelectProps.options?.map(({ value, label }) => (
                <Select.Option key={value} value={value}>
                    {label}
                </Select.Option>
            ))}
        </Select>
    );
};
