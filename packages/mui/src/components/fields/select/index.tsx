import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { useTranslate } from "@refinedev/core";
import { ReactNode } from "react";
import { useFormContext } from "../../useFormContext";

export const SelectField: React.FC<{
    name: string;
    options: [value: any, label: ReactNode][];
}> = (props) => {
    const { name, options } = props;
    const t = useTranslate();
    const { resource, show, register, watch } = useFormContext();
    const value = watch(name) || "";
    const label = t(`${resource}.fields.${name.replaceAll(/\d/g, "num")}`);

    if (show) {
        return (
            <FormControl>
                <FormLabel>{label}</FormLabel>
                <Typography fontWeight="bold">
                    {options?.find(([v]) => value === v)?.[1] || value}
                </Typography>
            </FormControl>
        );
    }

    return (
        <FormControl>
            <InputLabel sx={{ background: "white" }}>{label}</InputLabel>
            <Select {...register(name)} value={value}>
                {options.map((item, i) => (
                    <MenuItem key={i} value={item[0]}>
                        {item[1]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
