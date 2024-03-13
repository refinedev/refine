import { Create } from "@refinedev/mui";

import Box from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useForm } from "@refinedev/react-hook-form";
import { useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const CategoryCreate = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("title", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.title}
          helperText={(errors as any)?.title?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={translate("categories.fields.title")}
          name="title"
        />
        <Controller
          control={control}
          name="isActive"
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <FormControlLabel
              label={translate("isActive")}
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(event) => {
                    field.onChange(event.target.checked);
                  }}
                />
              }
            />
          )}
        />
        <TextField
          {...register("cover", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.cover}
          helperText={(errors as any)?.cover?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label={translate("cover")}
          name="cover"
        />
      </Box>
    </Create>
  );
};
