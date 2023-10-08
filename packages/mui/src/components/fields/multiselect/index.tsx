import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { useTranslate } from "@refinedev/core";
import { useFormContext } from "../useFormContext";

export const MultiSelectField: React.FC<{
    name: string;
    options: string[];
}> = (props) => {
    const { name, options } = props;
    const t = useTranslate();
    const { resource, show, register, watch } = useFormContext();
    const value = watch(name) || [];
    const label = t(`${resource}.fields.${name.replaceAll(/\d/g, "num")}`);

    if (show) {
        return (
            <FormControl>
                <FormLabel>{label}</FormLabel>
                <Typography fontWeight="bold">{value.join(", ")}</Typography>
            </FormControl>
        );
    }

    return (
        <FormControl>
            <InputLabel sx={{ background: "white" }}>{label}</InputLabel>
            <Select
                {...register(name)}
                multiple
                value={value}
                renderValue={(selected: any) => selected.join(", ")}
            >
                {options.map((item) => (
                    <MenuItem key={item} value={item}>
                        {<Checkbox checked={value.indexOf(item) > -1} />}
                        <ListItemText primary={item} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
