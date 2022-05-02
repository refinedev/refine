import { useContext } from "react";
import { Select, useSelect } from "@pankod/refine-antd";

import { StoreContext } from "context/store";
import { IStore } from "interfaces";

export const StoreSelect: React.FC = () => {
    const [store, setStore] = useContext(StoreContext);

    const { selectProps: storeSelectProps } = useSelect<IStore>({
        resource: "61cd62db95f92",
        optionLabel: "title",
        optionValue: "id",
    });

    const handleChange = (selectedValue: string) => {
        setStore(selectedValue);
    };

    return (
        <Select
            defaultValue={store}
            style={{ width: 130 }}
            onChange={handleChange}
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
