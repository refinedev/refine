import React, { useMemo } from "react";

import {
  type ComboboxItem,
  type MultiSelectProps,
  MultiSelect as MantineMultiSelect,
} from "@mantine/core";

import { getValue, convertOptions } from "./utils";

export type RefineMantineMultiSelectProps = Omit<
  MultiSelectProps,
  "onChange"
> & { onChange: (values: any) => void };

export const MultiSelect: React.FC<RefineMantineMultiSelectProps> = ({
  data,
  value,
  defaultValue,
  onChange,
  ...rest
}) => {
  const newValue = useMemo<string[] | undefined>((): string[] | undefined => {
    return value ? value.map((v) => v.toString()) : undefined;
  }, [value]);

  const newDefaultValue = useMemo<string[] | undefined>(():
    | string[]
    | undefined => {
    return defaultValue ? defaultValue.map((v) => v.toString()) : undefined;
  }, [defaultValue]);

  const newData = useMemo<ComboboxItem[]>(() => convertOptions(data), [data]);

  const newOnChange = useMemo(() => {
    return (val: string[]) => {
      let newVal: string[] | undefined;
      if (val && data) {
        newVal = val
          .map((v: string): ComboboxItem => getValue(data, v))
          .map((v) => v.value);
      } else {
        newVal = [];
      }
      if (onChange) {
        onChange(newVal);
      }
    };
  }, [onChange]);

  return (
    <MantineMultiSelect
      data={newData}
      value={newValue}
      defaultValue={newDefaultValue}
      onChange={newOnChange}
      {...rest}
    />
  );
};
