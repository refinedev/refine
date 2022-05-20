import React from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import {
    IResourceComponentsProps,
    useTranslate,
    useApiUrl,
} from "@pankod/refine-core";
import {
    Avatar,
    Button,
    Edit,
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    SaveButton,
    Stack,
    Step,
    Stepper,
    StepButton,
    TextField,
    Typography,
    MenuItem,
    useAutocomplete,
    Autocomplete,
    Input,
} from "@pankod/refine-mui";
import { useStepsForm, Controller } from "@pankod/refine-react-hook-form";
import { IStore } from "interfaces";

export const CourierEdit: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const stepTitles = [
        t("couriers.steps.content"),
        t("couriers.steps.relations"),
    ];
    const apiUrl = useApiUrl();

    const {
        refineCore: { onFinish, formLoading },
        control,
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        steps: { currentStep, gotoStep },
    } = useStepsForm({
        stepsProps: {
            isBackValidate: false,
        },
    });

    const imageInput = watch("avatar");

    const onChangeHandler = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const formData = new FormData();

        const target = event.target;
        const file: File = (target.files as FileList)[0];

        formData.append("file", file);

        const res = await axios.post<{ url: string }>(
            `${apiUrl}/media/upload`,
            formData,
            {
                withCredentials: false,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            },
        );

        const { name, size, type, lastModified } = file;

        const imagePaylod = [
            {
                name,
                size,
                type,
                lastModified,
                url: res.data.url,
            },
        ];

        setValue("avatar", imagePaylod, { shouldDirty: true });
    };

    const { autocompleteProps } = useAutocomplete<IStore>({
        resource: "stores",
    });

    const renderFormByStep = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Grid
                            container
                            sx={{
                                marginX: { xs: "0px" },
                            }}
                        >
                            <Grid item xs={12} md={4}>
                                <Stack
                                    gap={1}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <label htmlFor="avatar-input">
                                        <Input
                                            id="avatar-input"
                                            type="file"
                                            sx={{
                                                display: "none",
                                            }}
                                            onChange={onChangeHandler}
                                        />
                                        <input
                                            id="file"
                                            {...register("avatar")}
                                            type="hidden"
                                        />
                                        <Avatar
                                            sx={{
                                                cursor: "pointer",
                                                width: "200px",
                                                height: "200px",
                                            }}
                                            src={
                                                imageInput && imageInput[0].url
                                            }
                                            alt="User Picture"
                                        />
                                    </label>
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {t(
                                            "couriers.fields.images.description",
                                        )}
                                    </Typography>
                                    <Typography sx={{ fontSize: "12px" }}>
                                        {t("couriers.fields.images.validation")}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid container>
                                    <Grid item paddingX={4} xs={12} md={6}>
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
                                                    {t("couriers.fields.name")}
                                                </FormLabel>
                                                <TextField
                                                    {...register("name", {
                                                        required:
                                                            "Name is required",
                                                    })}
                                                    size="small"
                                                    margin="none"
                                                    variant="outlined"
                                                />
                                                {errors.name && (
                                                    <FormHelperText error>
                                                        {errors.name.message}
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
                                                    {t(
                                                        "couriers.fields.surname",
                                                    )}
                                                </FormLabel>
                                                <TextField
                                                    {...register("surname", {
                                                        required:
                                                            "Surname is required",
                                                    })}
                                                    size="small"
                                                    margin="none"
                                                    variant="outlined"
                                                />
                                                {errors.surname && (
                                                    <FormHelperText error>
                                                        {errors.surname.message}
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
                                                    {t(
                                                        "couriers.fields.gender.label",
                                                    )}
                                                </FormLabel>
                                                <TextField
                                                    select
                                                    {...register("gender", {
                                                        required:
                                                            "Gender is required",
                                                    })}
                                                    size="small"
                                                    margin="none"
                                                    variant="outlined"
                                                    defaultValue="Male"
                                                >
                                                    <MenuItem value="Male">
                                                        {t(
                                                            "couriers.fields.gender.male",
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="Female">
                                                        {t(
                                                            "couriers.fields.gender.female",
                                                        )}
                                                    </MenuItem>
                                                </TextField>
                                                {errors.gender && (
                                                    <FormHelperText error>
                                                        {errors.gender.message}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Stack>
                                    </Grid>
                                    <Grid item paddingX={4} xs={12} md={6}>
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
                                                    {t("stores.fields.gsm")}
                                                </FormLabel>
                                                <InputMask
                                                    mask="(999) 999 99 99"
                                                    disabled={false}
                                                    {...register("gsm", {
                                                        required:
                                                            "Phone is required",
                                                    })}
                                                >
                                                    {(props: any) => (
                                                        <TextField
                                                            {...props}
                                                            size="small"
                                                            margin="none"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                </InputMask>
                                                {errors.gsm && (
                                                    <FormHelperText error>
                                                        {errors.gsm.message}
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
                                                    {t("couriers.fields.email")}
                                                </FormLabel>
                                                <TextField
                                                    {...register("email", {
                                                        required:
                                                            "Email is required",
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
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    paddingX={4}
                                    paddingY={4}
                                    xs={12}
                                    md={12}
                                    justifyContent="flex-end"
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
                                            {...register("address", {
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
                        </Grid>
                    </>
                );
            case 1:
                return (
                    <>
                        <Grid container spacing={2}>
                            <Grid container item xs={12} md={12} gap={5}>
                                <Grid item xs={8} md={6}>
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
                                            {t("couriers.fields.store")}
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="store"
                                            rules={{
                                                required: "Store required",
                                            }}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Autocomplete
                                                    size="small"
                                                    {...autocompleteProps}
                                                    {...field}
                                                    onChange={(_, value) => {
                                                        field.onChange(value);
                                                    }}
                                                    getOptionLabel={(item) => {
                                                        return item.title
                                                            ? item.title
                                                            : "";
                                                    }}
                                                    isOptionEqualToValue={(
                                                        option,
                                                        value,
                                                    ) =>
                                                        value === undefined ||
                                                        option.id === value.id
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            error={
                                                                !!errors.item
                                                            }
                                                            required
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                        {errors.store && (
                                            <FormHelperText error>
                                                {errors.store.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} md={5}>
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
                                            {t("couriers.fields.vehicle")}
                                        </FormLabel>
                                        <TextField
                                            {...register("licensePlate", {
                                                required:
                                                    "Vehicle Number is required",
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.licensePlate && (
                                            <FormHelperText error>
                                                {errors.licensePlate.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} md={6}>
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
                                        {t("couriers.fields.accountNumber")}
                                    </FormLabel>
                                    <TextField
                                        {...register("accountNumber", {
                                            required:
                                                "Account Number is required",
                                            maxLength: {
                                                value: 10,
                                                message:
                                                    "Account Number must be 10 digits",
                                            },
                                            minLength: {
                                                value: 10,
                                                message:
                                                    "Account Number must be 10 digits",
                                            },
                                        })}
                                        size="small"
                                        margin="none"
                                        variant="outlined"
                                    />
                                    {errors.accountNumber && (
                                        <FormHelperText error>
                                            {errors.accountNumber.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </>
                );
        }
    };

    return (
        <Edit
            isLoading={formLoading}
            actionButtons={
                <>
                    {currentStep > 0 && (
                        <Button
                            onClick={() => {
                                gotoStep(currentStep - 1);
                            }}
                        >
                            Previous
                        </Button>
                    )}
                    {currentStep < stepTitles.length - 1 && (
                        <Button onClick={() => gotoStep(currentStep + 1)}>
                            Next
                        </Button>
                    )}
                    {currentStep === stepTitles.length - 1 && (
                        <SaveButton onClick={handleSubmit(onFinish)} />
                    )}
                </>
            }
        >
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
                autoComplete="off"
            >
                <Stepper nonLinear activeStep={currentStep}>
                    {stepTitles.map((label, index) => (
                        <Step key={label}>
                            <StepButton onClick={() => gotoStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <br />
                {renderFormByStep(currentStep)}
            </Box>
        </Edit>
    );
};
