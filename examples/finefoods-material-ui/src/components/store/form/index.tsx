import { useNavigation, useTranslate } from "@refinedev/core";
import { DeleteButton, ListButton } from "@refinedev/mui";
import { Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputMask from "react-input-mask";
import { useStoreForm } from "./useStoreForm";
import { StoreMap } from "../map/store-map";
import { StoreCourierTable } from "../courier-table";

type Props = {
  action: "create" | "edit";
};

export const StoreForm = (props: Props) => {
  const t = useTranslate();
  const { list } = useNavigation();
  const {
    register,
    control,
    formState: { errors },
    saveButtonProps,
    setValue,
    latLng,
    store,
    handleMapOnDragEnd,
    handleAddressChange,
  } = useStoreForm({ action: props.action });

  return (
    <>
      <ListButton
        variant="outlined"
        sx={{
          borderColor: "GrayText",
          color: "GrayText",
          backgroundColor: "transparent",
        }}
        startIcon={<ArrowBack />}
      />
      <Divider
        sx={{
          marginBottom: "24px",
          marginTop: "24px",
        }}
      />
      <Grid container spacing="24px">
        <Grid item xs={12} md={6} lg={5}>
          <form>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                padding: "24px",
              }}
            >
              <FormControl fullWidth>
                <Controller
                  name="title"
                  control={control}
                  shouldUnregister
                  defaultValue=""
                  rules={{
                    required: t("errors.required.field", {
                      field: "title",
                    }),
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t("stores.fields.title")}
                      required
                      size="small"
                      margin="none"
                      variant="outlined"
                    />
                  )}
                />
                {errors.title && (
                  <FormHelperText error>{errors.title.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel
                  sx={{
                    marginBottom: "8px",
                  }}
                >
                  {t("products.fields.isActive.label")}
                </FormLabel>
                <Controller
                  control={control}
                  name="isActive"
                  shouldUnregister
                  defaultValue={false}
                  rules={{
                    validate: (value) => {
                      if (value === undefined) {
                        return t("errors.required.field", {
                          field: "isActive",
                        });
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => {
                    return (
                      <ToggleButtonGroup
                        id="isActive"
                        {...field}
                        exclusive
                        color="primary"
                        onChange={(_, newValue) => {
                          setValue("isActive", newValue, {
                            shouldValidate: true,
                          });

                          return newValue;
                        }}
                      >
                        <ToggleButton value={true}>
                          {t("stores.fields.isActive.true")}
                        </ToggleButton>
                        <ToggleButton value={false}>
                          {t("stores.fields.isActive.false")}
                        </ToggleButton>
                      </ToggleButtonGroup>
                    );
                  }}
                />
                {errors.isActive && (
                  <FormHelperText error>
                    {errors.isActive.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth>
                <Controller
                  name="email"
                  control={control}
                  shouldUnregister
                  defaultValue=""
                  rules={{
                    required: t("errors.required.field", {
                      field: "email",
                    }),
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t("stores.fields.email")}
                      required
                      size="small"
                      margin="none"
                      variant="outlined"
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText error>{errors.email.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth>
                <Controller
                  name="address.text"
                  control={control}
                  shouldUnregister
                  defaultValue=""
                  rules={{
                    required: t("errors.required.field", {
                      field: "address.text",
                    }),
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t("stores.fields.address")}
                      required
                      size="small"
                      margin="none"
                      variant="outlined"
                      onChange={(e) => {
                        field.onChange(e);
                        handleAddressChange(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.address && (
                  <FormHelperText error>
                    {errors.address.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth>
                <Controller
                  name="gsm"
                  control={control}
                  shouldUnregister
                  defaultValue=""
                  rules={{
                    required: t("errors.required.field", {
                      field: "gsm",
                    }),
                  }}
                  render={({ field }) => (
                    <InputMask
                      {...field}
                      mask="(999) 999 99 99"
                      disabled={false}
                    >
                      {/* @ts-expect-error False alarm */}
                      {(props: TextFieldProps) => (
                        <TextField
                          {...props}
                          label={t("stores.fields.gsm")}
                          size="small"
                          margin="none"
                          variant="outlined"
                        />
                      )}
                    </InputMask>
                  )}
                />
                {errors.gsm && (
                  <FormHelperText error>{errors.gsm.message}</FormHelperText>
                )}
              </FormControl>

              {/* this is a workaround for registering fields to ant design form*/}
              {/* otherwise these fields will be null */}
              <Box
                sx={{
                  display: "none",
                }}
              >
                <input
                  {...register("address.coordinate.0", {
                    required: t("errors.required.field", {
                      field: "address.coordinate.0",
                    }),
                  })}
                  type="hidden"
                />
                <input
                  {...register("address.coordinate.1", {
                    required: t("errors.required.field", {
                      field: "address.coordinate.1",
                    }),
                  })}
                  type="hidden"
                />
              </Box>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                {props.action === "edit" && (
                  <DeleteButton
                    recordItemId={store?.id}
                    variant="contained"
                    onSuccess={() => {
                      list({ name: "stores" });
                    }}
                  />
                )}
                <Button {...saveButtonProps} variant="contained">
                  {t("buttons.save")}
                </Button>
              </Stack>
            </Card>
          </form>
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <StoreMap
            lat={latLng.lat}
            lng={latLng.lng}
            store={store}
            onDragEnd={handleMapOnDragEnd}
          />
          {props.action !== "create" && (
            <Box mt="24px">
              <StoreCourierTable store={store} />
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};
