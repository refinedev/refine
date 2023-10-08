import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";

import { useSelect, useTranslate } from "@refinedev/core";
import { useFormContext } from "../../useFormContext";
import { Controller } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

export const RelationField: React.FC<{
    name: string;
    relation: string;
    searchIn?: string[];
    getOptionLabel: (row: any) => string;
}> = (props) => {
    const { name, relation, searchIn = [], getOptionLabel } = props;
    const t = useTranslate();
    const { resource, show, control, getValues } = useFormContext();
    const label = t(`${resource}.fields.${name.replaceAll(/\d/g, "num")}`);

    const {
        queryResult: { data: users },
        onSearch,
    } = useSelect({
        resource: relation,
        pagination: {
            current: 1,
            pageSize: 100,
        },
        queryOptions: {
            enabled: !show,
        },
        onSearch: (value: any) => [
            {
                operator: "or",
                value: [
                    {
                        field: "id",
                        operator: "eq",
                        value: Number.isInteger(Number(value))
                            ? Number(value)
                            : 0,
                    },
                    ...searchIn.map((item) => ({
                        field: item,
                        operator: "contains" as const,
                        value,
                    })),
                ],
            },
        ],
    });
    if (show) {
        const id = getValues(name)?.id;
        return (
            <FormControl>
                <FormLabel>{label}</FormLabel>
                {id ? (
                    <Link
                        component={RouterLink}
                        to={`/${relation}/${id}`}
                        fontWeight="bold"
                    >
                        {getOptionLabel(getValues(name) || "")}
                    </Link>
                ) : (
                    "-"
                )}
            </FormControl>
        );
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }: any) => (
                <Autocomplete
                    onChange={(event: any, newValue: any) =>
                        field.onChange(newValue)
                    }
                    options={users?.data || []}
                    value={field.value || null}
                    renderInput={(params: any) => (
                        <TextField {...params} label={label} />
                    )}
                    getOptionLabel={getOptionLabel}
                    filterOptions={(x: any) => x}
                    onInputChange={(event: any, newInputValue: any) =>
                        onSearch(newInputValue)
                    }
                />
            )}
        />
    );
};
