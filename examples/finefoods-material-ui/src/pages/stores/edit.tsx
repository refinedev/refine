import {
    HttpError,
    IResourceComponentsProps,
    useTranslate,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { Edit } from "@refinedev/mui";
import InputMask from "react-input-mask";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import type { TextFieldProps } from "@mui/material/TextField";

import { IStore } from "../../interfaces";

export const StoreEdit: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        register,
        control,
        refineCore: { formLoading },
        formState: { errors },
        saveButtonProps,
        setValue,
    } = useForm<IStore, HttpError, IStore>();

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <form>
                <Grid
                    container
                    marginTop="8px"
                    sx={{
                        marginX: { xs: "0px" },
                        paddingX: { xs: 1, md: 4 },
                    }}
                >
                    <Grid mb={1} item xs={12} md={4}>
                        <Stack
                            gap={1}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Avatar
                                src="/images/default-store-img-lg.png"
                                sx={{
                                    width: {
                                        xs: 180,
                                        lg: 256,
                                    },
                                    height: {
                                        xs: 180,
                                        lg: 256,
                                    },
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                }}
                            >
                                {t("stores.selectLocation")}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    {t("stores.fields.title")}
                                </FormLabel>
                                <TextField
                                    {...register("title", {
                                        required: t("errors.required.field", {
                                            field: "Title",
                                        }),
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.title && (
                                    <FormHelperText error>
                                        {errors.title.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    {t("stores.fields.email")}
                                </FormLabel>
                                <TextField
                                    {...register("email", {
                                        required: t("errors.required.field", {
                                            field: "Email",
                                        }),
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.email && (
                                    <FormHelperText error>
                                        {errors.email.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    {t("stores.fields.gsm")}
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name="gsm"
                                    rules={{
                                        required: t("errors.required.field"),
                                    }}
                                    defaultValue={""}
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
                                                    size="small"
                                                    margin="none"
                                                    variant="outlined"
                                                />
                                            )}
                                        </InputMask>
                                    )}
                                />
                                {errors.gsm && (
                                    <FormHelperText error>
                                        {errors.gsm.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                    required
                                >
                                    {t("products.fields.isActive")}
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name="isActive"
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            onChange={(event) => {
                                                const value =
                                                    event.target.value ===
                                                    "true";

                                                setValue("isActive", value, {
                                                    shouldValidate: true,
                                                });

                                                return value;
                                            }}
                                            row
                                        >
                                            <FormControlLabel
                                                value={true}
                                                control={<Radio />}
                                                label={t("status.enable")}
                                            />
                                            <FormControlLabel
                                                value={false}
                                                control={<Radio />}
                                                label={t("status.disable")}
                                            />
                                        </RadioGroup>
                                    )}
                                />
                                {errors.isActive && (
                                    <FormHelperText error>
                                        {errors.isActive.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid
                        sx={{
                            paddingX: {
                                xs: 0,
                                md: 4,
                            },
                        }}
                        item
                        xs={12}
                        md={4}
                    >
                        <FormControl fullWidth>
                            <FormLabel
                                required
                                sx={{
                                    marginBottom: "8px",
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    color: "text.primary",
                                }}
                            >
                                {t("stores.fields.address")}
                            </FormLabel>
                            <TextField
                                {...register("address.text", {
                                    required: t("errors.required.field", {
                                        field: "Address",
                                    }),
                                })}
                                margin="none"
                                variant="outlined"
                                multiline
                                minRows={5}
                                required
                                fullWidth
                            />
                            {errors.address && (
                                <FormHelperText error>
                                    {errors.address.text?.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </Edit>
    );
};
