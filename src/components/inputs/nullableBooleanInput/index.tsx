import React from "react";
import { Select } from "antd";
import { SelectProps } from "antd/lib/select";

type NullableBooleanInputProps = SelectProps<any> & {
    trueLabel?: string;
    falseLabel?: string;
    nullLabel?: string;
};

const getBooleanFromString = (value: string): boolean | null => {
    if (value === "true") return true;
    if (value === "false") return false;
    return null;
};

const getStringFromBoolean = (value?: boolean | null): string => {
    if (value === true) return "true";
    if (value === false) return "false";
    return "";
};

export const NullableBooleanInput: React.FC<NullableBooleanInputProps> = ({
    trueLabel = "YES",
    falseLabel = "NO",
    nullLabel = "",
    value,
    onChange: onChangeProp,
    ...rest
}) => {
    return (
        <Select
            value={getStringFromBoolean(value)}
            onChange={(value, option) => {
                onChangeProp &&
                    onChangeProp(getBooleanFromString(value), option);
            }}
            options={[
                {
                    label: trueLabel,
                    value: "true",
                },
                {
                    label: falseLabel,
                    value: "false",
                },
                {
                    label: nullLabel,
                    value: "",
                },
            ]}
            {...rest}
        />
    );
};
