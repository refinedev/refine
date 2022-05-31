import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import {
    Edit,
    FormControl,
    FormControlLabel,
    Avatar,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
    FormHelperText,
} from "@pankod/refine-mui";

import { IStore } from "interfaces";

export const StoreEdit: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        register,
        control,
        formState: { errors },
        saveButtonProps,
        getValues,
    } = useForm<IStore>();

    return (
        <Edit saveButtonProps={saveButtonProps}>
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
                                        md: 256,
                                    },
                                    height: {
                                        xs: 180,
                                        md: 256,
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
                                <TextField
                                    {...register("gsm", {
                                        required: t("errors.required.field", {
                                            field: "Phone",
                                        }),
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
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
                                    rules={{
                                        required: t("errors.required.common"),
                                    }}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <RadioGroup
                                            id="isActive"
                                            defaultValue={getValues("isActive")}
                                            {...field}
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
                                    {errors.address.text.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </Edit>
    );
};
