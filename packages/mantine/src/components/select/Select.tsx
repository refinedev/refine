import React, { useMemo } from "react";

import {
  type ComboboxItem,
  Select as MantineSelect,
  type SelectProps,
} from "@mantine/core";

import { getValue, convertOptions } from "./utils";

export const Select: React.FC<SelectProps> = ({
  data,
  value,
  defaultValue,
  onChange,
  ...rest
}) => {
  const newValue = useMemo<string | null>((): string | null => {
    return value ? value.toString() : null;
  }, [value]);

  const newDefaultValue = useMemo<string | null>((): string | null => {
    return defaultValue ? defaultValue.toString() : null;
  }, [defaultValue]);

  const newData = useMemo<ComboboxItem[]>(() => convertOptions(data), [data]);

  const newOnChange = useMemo(() => {
    return (evt: any, val: ComboboxItem) => {
      const newVal =
        data && val && val.value ? getValue(data, val.value as string) : val;
      if (onChange) {
        return onChange(newVal?.value, newVal);
      }
    };
  }, [onChange]);

  return (
    <MantineSelect
      data={newData}
      value={newValue}
      defaultValue={newDefaultValue}
      onChange={newOnChange}
      {...rest}
    />
  );
};
