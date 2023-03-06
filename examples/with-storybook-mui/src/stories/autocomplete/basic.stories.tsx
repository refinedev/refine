import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useAutocomplete } from "@refinedev/mui";

import {
    Autocomplete,
    TextField,
    AutocompleteProps,
    Checkbox,
} from "@mui/material";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { RefineWithoutLayout } from "../../../.storybook/preview";
import { ICategory } from "../../interfaces";

export default {
    title: "Hooks / Autocomplete",
    component: Autocomplete,
    argTypes: {
        loadingText: {
            control: "text",
            defaultValue: "Loading...",
        },
        noOptionsText: {
            control: "text",
            defaultValue: "No options",
        },
        sx: {
            control: "object",
            defaultValue: { width: "300px" },
        },
    },

    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof Autocomplete>;

export const Basic: ComponentStory<typeof Autocomplete> = (args) => {
    const { autocompleteProps } = useAutocomplete({
        resource: "categories",
    });

    return (
        <Autocomplete
            {...autocompleteProps}
            {...(args as AutocompleteProps<
                ICategory,
                boolean,
                boolean,
                boolean
            >)}
            getOptionLabel={(option: ICategory) => option.title}
            renderInput={(params) => (
                <TextField {...params} variant="standard" label="Category" />
            )}
        />
    );
};

type IGroupedCategory = { firstLetter: string } & ICategory;

export const Grouped: ComponentStory<typeof Autocomplete> = (args) => {
    const { autocompleteProps } = useAutocomplete({
        resource: "categories",
        sort: [{ field: "title", order: "asc" }],
        fetchSize: 100,
    });

    const options = autocompleteProps.options.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        return {
            ...option,
            firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        };
    });

    return (
        <Autocomplete
            {...(args as AutocompleteProps<
                IGroupedCategory,
                boolean,
                boolean,
                boolean
            >)}
            {...autocompleteProps}
            options={options}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
                <TextField {...params} variant="standard" label="Category" />
            )}
        />
    );
};

export const MultipleValues: ComponentStory<typeof Autocomplete> = () => {
    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
    });

    return (
        <Autocomplete
            {...autocompleteProps}
            sx={{ width: "600px" }}
            multiple
            getOptionLabel={(option: ICategory) => option.title}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Category"
                    placeholder="Add category"
                />
            )}
        />
    );
};

export const CheckboxesTags: ComponentStory<typeof Autocomplete> = () => {
    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
    });

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <Autocomplete
            {...autocompleteProps}
            sx={{ width: "600px" }}
            multiple
            disableCloseOnSelect
            getOptionLabel={(option: ICategory) => option.title}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Category"
                    placeholder="Add category"
                />
            )}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.title}
                </li>
            )}
        />
    );
};
