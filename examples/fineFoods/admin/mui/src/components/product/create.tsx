import React, { useState } from "react";

import { useTranslate, useForm, useApiUrl } from "@pankod/refine-core";

import {
    FieldValues,
    UseFormRegister,
    UseFormHandleSubmit,
    UseFormSetValue,
} from "@pankod/refine-react-hook-form";

import axios from "axios";

import {
    Drawer,
    FormControlLabel,
    Input,
    Radio,
    RadioGroup,
    Select,
    MenuItem,
    Avatar,
    Typography,
    FormLabel,
    Stack,
    useTheme,
    Box,
    IconButton,
    SaveButton,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    OutlinedInput,
    InputAdornment,
} from "@pankod/refine-mui";

import CloseIcon from "@mui/icons-material/Close";

import { ICategory } from "interfaces";

import TextArea from "antd/lib/input/TextArea"; //todo: should export from mui

type CreateProductProps = {
    visible: boolean;
    close: () => void;
    register: UseFormRegister<FieldValues>;
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    categoryData: ICategory[];
    setValue: UseFormSetValue<FieldValues>;
};

export const CreateProduct: React.FC<CreateProductProps> = ({
    visible,
    close,
    register,
    handleSubmit,
    categoryData,
    setValue,
}) => {
    const t = useTranslate();

    const [uploadedImage, setUploadedImage] = useState(
        "/images/product-default-img.png",
    );

    const [selectedCategory, setSelectedCategory] = useState("");

    const theme = useTheme();

    const apiUrl = useApiUrl();

    const { onFinish } = useForm({
        action: "create",
    });

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
        setUploadedImage(res.data.url);

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

        setValue("images", imagePaylod);
    };

    return (
        <Drawer
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                "& .MuiDrawer-paper": {
                    [theme.breakpoints.down("sm")]: {
                        width: " 100%",
                    },
                    width: "500px",
                },
            }}
            open={visible}
            onClose={() => close()}
            anchor="right"
        >
            <Stack marginX="30px" marginY="20px">
                <IconButton onClick={() => close()} sx={{ width: "30px" }}>
                    <CloseIcon />
                </IconButton>
                <Typography fontWeight="bold">{t("Create Product")}</Typography>
            </Stack>
            <Stack width="100%">
                <Box
                    paddingX="50px"
                    justifyContent="center"
                    alignItems="center"
                    marginBottom="50px"
                >
                    <form onSubmit={handleSubmit(onFinish)}>
                        <FormLabel>
                            {t("products.fields.images.label")}
                        </FormLabel>
                        <Stack
                            display="flex"
                            alignItems="center"
                            border="1px dashed  "
                            borderColor="primary.main"
                            borderRadius="5px"
                            padding="10px"
                            marginTop="5px"
                            sx={{
                                backgroundColor: "#fafafa",
                            }}
                        >
                            <label htmlFor="images">
                                <Input
                                    id="images"
                                    type="file"
                                    sx={{
                                        display: "none",
                                    }}
                                    onChange={onChangeHandler}
                                />
                                <Avatar
                                    sx={{
                                        cursor: "pointer",
                                        width: "200px",
                                        height: "200px",
                                    }}
                                    src={uploadedImage}
                                    alt="Store Location"
                                />
                            </label>
                            <Typography
                                style={{
                                    fontWeight: 800,
                                    fontSize: "16px",
                                    marginTop: "8px",
                                }}
                            >
                                {t("products.fields.images.description")}
                            </Typography>
                            <Typography style={{ fontSize: "12px" }}>
                                {t("products.fields.images.validation")}
                            </Typography>
                        </Stack>
                        <Stack gap="10px" marginTop="10px">
                            <FormLabel>{t("products.fields.name")}</FormLabel>
                            <OutlinedInput
                                id="name"
                                {...register("name", { required: true })}
                                style={{ height: "40px" }}
                            />
                            <FormLabel>
                                {t("products.fields.description")}
                            </FormLabel>
                            <TextArea
                                id="description"
                                {...register("description", { required: true })}
                                style={{ minHeight: "200px" }}
                            />
                            <FormLabel>{t("products.fields.price")}</FormLabel>
                            <OutlinedInput
                                id="price"
                                {...register("price", { required: true })}
                                style={{ width: "150px", height: "40px" }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                }
                            />

                            <FormControl fullWidth sx={{ marginTop: "20px" }}>
                                <InputLabel id="select-label">
                                    Category
                                </InputLabel>
                                <Select
                                    id="category"
                                    {...register("category", {
                                        required: true,
                                    })}
                                    labelId="category"
                                    value={selectedCategory}
                                    label="Category"
                                    onChange={(event: SelectChangeEvent) => {
                                        setSelectedCategory(
                                            event.target.value as string,
                                        );
                                    }}
                                    sx={{ height: "50px" }}
                                >
                                    {categoryData.map((category) => {
                                        return (
                                            <MenuItem
                                                key={category.id}
                                                value={category.title}
                                            >
                                                {category.title}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <FormLabel sx={{ marginTop: "10px" }}>
                                {t("products.fields.isActive")}
                            </FormLabel>
                            <RadioGroup
                                id="isActive"
                                {...register("active", { required: true })}
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
                        </Stack>
                        <Stack
                            flexDirection="row"
                            justifyContent="flex-end"
                            marginTop="30px"
                        >
                            <SaveButton type="submit" />
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Drawer>
    );
};
