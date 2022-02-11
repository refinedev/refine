import { useContext } from "react";
import { Select, useSelect } from "@pankod/refine-antd";

import { StoreContext } from "context/store";
import { IStore } from "interfaces";

type SelectProps = {
    onSelect: () => void;
};

export const StoreSelect: React.FC<SelectProps> = ({ onSelect }) => {
    const [store, setStore] = useContext(StoreContext);

    const { selectProps: storeSelectProps } = useSelect<IStore>({
        resource: "stores",
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
