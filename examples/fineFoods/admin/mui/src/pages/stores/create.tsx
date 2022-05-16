import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import {
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
    Create,
} from "@pankod/refine-mui";

import { IStore } from "interfaces";

export const StoreCreate: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        register,
        control,
        formState: { errors },
        saveButtonProps,
    } = useForm<IStore>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <form>
                <Grid
                    container
                    marginX="-32px"
                    marginTop="8px"
                    sx={{
                        marginX: { xs: "0px" },
                    }}
                >
                    <Grid paddingX={4} item xs={12} md={4}>
                        <Stack
                            gap={1}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Avatar
                                src="/images/default-store-img-lg.png"
                                sx={{
                                    width: 256,
                                    height: 256,
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
                    <Grid paddingX={4} item xs={12} md={4}>
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
                                        required: "Title is required",
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
                                        required: "Email is required",
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
                                        required: "Phone is required",
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
                                    defaultValue={""}
                                    rules={{ required: "Selection required" }}
                                    render={({ field }) => (
                                        <RadioGroup
                                            id="isActive"
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
                    <Grid paddingX={4} item xs={12} md={4}>
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
                                    required: "Address is required",
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
        </Create>
    );
};
