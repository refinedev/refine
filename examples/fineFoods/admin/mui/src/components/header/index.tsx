import { useState, useEffect, useContext } from "react";
import {
    AppBar,
    IconButton,
    Link,
    Avatar,
    Typography,
    TextField,
    Toolbar,
    Box,
    Autocomplete,
    Stack,
    FormControl,
    MenuItem,
    Select,
} from "@pankod/refine-mui";
import {
    useList,
    useTranslate,
    useGetIdentity,
    useGetLocale,
    useSetLocale,
} from "@pankod/refine-core";
import {
    SearchOutlined,
    DarkModeOutlined,
    LightModeOutlined,
} from "@mui/icons-material";
import i18n from "i18n";

import { IOrder, IStore, ICourier } from "interfaces";
import { ColorModeContext } from "contexts";

interface IOptions {
    label: string;
    url: string;
    link: string;
    category: string;
}

export const Header: React.FC = () => {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState<IOptions[]>([]);

    const { mode, setColorMode } = useContext(ColorModeContext);

    const changeLanguage = useSetLocale();
    const locale = useGetLocale();
    const currentLocale = locale();
    const { data: user } = useGetIdentity();

    const t = useTranslate();

    const { refetch: refetchOrders } = useList<IOrder>({
        resource: "orders",
        config: {
            filters: [{ field: "q", operator: "contains", value }],
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const orderOptionGroup = data.data.map((item) => {
                    return {
                        label: `${item.store.title} / #${item.orderNumber}`,
                        url: "/images/default-order-img.png",
                        link: `/orders/show/${item.id}`,
                        category: t("orders.orders"),
                    };
                });
                if (orderOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        ...orderOptionGroup,
                    ]);
                }
            },
        },
    });

    const { refetch: refetchStores } = useList<IStore>({
        resource: "stores",
        config: {
            filters: [{ field: "q", operator: "contains", value }],
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) => {
                    return {
                        label: item.title,
                        url: "images/default-store-img.png",
                        link: `/stores/edit/${item.id}`,
                        category: t("stores.stores"),
                    };
                });
                setOptions((prevOptions) => [
                    ...prevOptions,
                    ...storeOptionGroup,
                ]);
            },
        },
    });

    const { refetch: refetchCouriers } = useList<ICourier>({
        resource: "couriers",
        config: {
            filters: [{ field: "q", operator: "contains", value }],
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const courierOptionGroup = data.data.map((item) => {
                    return {
                        label: `${item.name} ${item.surname}`,
                        url: item.avatar[0].url,
                        link: `/stores/edit/${item.id}`,
                        category: t("couriers.couriers"),
                    };
                });
                setOptions((prevOptions) => [
                    ...prevOptions,
                    ...courierOptionGroup,
                ]);
            },
        },
    });

    useEffect(() => {
        setOptions([]);
        refetchOrders();
        refetchCouriers();
        refetchStores();
    }, [value]);

    return (
        <AppBar color="default" position="sticky" elevation={1}>
            <Toolbar>
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Stack direction="row" flex={1}>
                        <Autocomplete
                            sx={{
                                maxWidth: 550,
                            }}
                            id="search-autocomplete"
                            options={options}
                            filterOptions={(x) => x}
                            disableClearable
                            freeSolo
                            fullWidth
                            size="small"
                            onInputChange={(event, value) => {
                                if (event?.type === "change") {
                                    setValue(value);
                                }
                            }}
                            groupBy={(option) => option.category}
                            renderOption={(props, option: IOptions) => {
                                return (
                                    <Link href={option.link} underline="none">
                                        <Box
                                            {...props}
                                            component="li"
                                            sx={{
                                                display: "flex",
                                                padding: "10px",
                                                alignItems: "center",
                                                gap: "10px",
                                            }}
                                        >
                                            <Avatar
                                                sx={{ width: 64, height: 64 }}
                                                src={option.url}
                                            />
                                            <Typography
                                                style={{ fontSize: "16px" }}
                                            >
                                                {option.label}
                                            </Typography>
                                        </Box>
                                    </Link>
                                );
                            }}
                            renderInput={(params) => {
                                return (
                                    <Box position="relative">
                                        <TextField
                                            {...params}
                                            label={t("search.placeholder")}
                                            InputProps={{
                                                ...params.InputProps,
                                            }}
                                        />
                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                right: 0,
                                                top: 0,
                                                "&:hover": {
                                                    backgroundColor:
                                                        "transparent",
                                                },
                                            }}
                                        >
                                            <SearchOutlined />
                                        </IconButton>
                                    </Box>
                                );
                            }}
                        />
                    </Stack>
                    <Stack direction="row" gap="20px" alignItems="center">
                        <IconButton
                            onClick={() => {
                                setColorMode();
                            }}
                        >
                            {mode === "dark" ? (
                                <LightModeOutlined />
                            ) : (
                                <DarkModeOutlined />
                            )}
                        </IconButton>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                disableUnderline
                                defaultValue={currentLocale}
                                inputProps={{ "aria-label": "Without label" }}
                                variant="standard"
                            >
                                {[...(i18n.languages ?? [])]
                                    .sort()
                                    .map((lang: string) => (
                                        <MenuItem
                                            selected={currentLocale === lang}
                                            key={lang}
                                            defaultValue={lang}
                                            onClick={() => {
                                                changeLanguage(lang);
                                            }}
                                            value={lang}
                                        >
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                            >
                                                <Avatar
                                                    sx={{
                                                        width: "16px",
                                                        height: "16px",
                                                        marginRight: "5px",
                                                    }}
                                                    src={`/images/flags/${lang}.svg`}
                                                />
                                                {lang === "en"
                                                    ? "English"
                                                    : "German"}
                                            </Stack>
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <Typography variant="subtitle2">
                            {user?.name}
                        </Typography>
                        <Avatar src={user?.avatar} alt={user?.name} />
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
