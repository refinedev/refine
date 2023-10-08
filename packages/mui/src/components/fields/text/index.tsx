import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslate } from "@refinedev/core";
import { useFormContext } from "../../useFormContext";

const TextField: React.FC<{
    name: string;
}> = (props: any) => {
    const { name } = props;
    const t = useTranslate();
    const { resource, show, register, watch } = useFormContext();
    const value = watch(name) || "";
    const label = t(`${resource}.fields.${name.replaceAll(/\d/g, "num")}`);

    if (show) {
        return (
            <FormControl>
                <FormLabel>{label}</FormLabel>
                <Typography fontWeight="bold">{value}</Typography>
            </FormControl>
        );
    }

    return (
        <TextField
            {...register(name)}
            label={t(`${resource}.fields.${name}`)}
            fullWidth
            value={value}
        />
    );
};

export { TextField as TextFieldComponent };
