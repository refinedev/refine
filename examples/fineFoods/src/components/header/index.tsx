import { useState, useEffect } from "react";
import {
    AntdLayout,
    Menu,
    Icons,
    Dropdown,
    useGetLocale,
    useSetLocale,
    Input,
    Avatar,
    Typography,
    useGetIdentity,
    Space,
    Grid,
    Row,
    Col,
    AutoComplete,
    useList,
    useTranslate,
} from "@pankod/refine";
import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";

const { SearchOutlined, DownOutlined } = Icons;
const { Text } = Typography;
const { useBreakpoint } = Grid;

import { IOrder, IStore, ICourier } from "interfaces";
interface IOptionGroup {
    value: string;
}

interface IOptions {
    label: string | React.ReactNode;
    options: IOptionGroup[];
}
interface ILanguage {
    title: string;
    flag: string;
}

const languages: Record<string, ILanguage> = {
    en: {
        title: "English",
        flag: "🇬🇧",
    },
    de: {
        title: "German",
        flag: "🇩🇪",
    },
};

const renderTitle = (title: string) => (
    <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            fontWeight: "bold",
            borderBottom: "1px",
        }}
    >
        <Text style={{ fontSize: "16px" }}>{title}</Text>
        <a href="#">more</a>
    </div>
);

const renderItem = (title: string, imageUrl: string) => ({
    value: title,
    label: (
        <div
            style={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <Avatar size={64} src={imageUrl} />
            <Text style={{ marginLeft: "16px" }}>{title}</Text>
        </div>
    ),
});

export const Header: React.FC = () => {
    const { i18n } = useTranslation();
    const locale = useGetLocale();
    const changeLanguage = useSetLocale();
    const { data: user } = useGetIdentity();
    const screens = useBreakpoint();
    const t = useTranslate();

    const [value, setValue] = useState<string>("");
    const [options, setOptions] = useState<IOptions[]>([]);

    const { refetch: refetchOrders } = useList<IOrder>(
        "orders",
        {
            filters: [{ field: "q", operator: "contains", value }],
        },
        {
            enabled: false,
            onSuccess: (data) => {
                const orderOptionGroup = data.data.map((item) =>
                    renderItem(
                        `${item.store.title} / #${item.orderNumber}`,
                        "/images/default-order-img.png",
                    ),
                );
                if (orderOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle(t("orders:title")),
                            options: orderOptionGroup,
                        },
                    ]);
                }
            },
        },
    );

    const { refetch: refetchStores } = useList<IStore>(
        "stores",
        {
            filters: [{ field: "q", operator: "contains", value }],
        },
        {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) =>
                    renderItem(item.title, "/images/default-store-img.png"),
                );
                if (storeOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle(t("stores:title")),
                            options: storeOptionGroup,
                        },
                    ]);
                }
            },
        },
    );

    const { refetch: refetchCouriers } = useList<ICourier>(
        "couriers",
        {
            filters: [{ field: "q", operator: "contains", value }],
        },
        {
            enabled: false,
            onSuccess: (data) => {
                const courierOptionGroup = data.data.map((item) =>
                    renderItem(
                        `${item.name} ${item.surname}`,
                        item.avatar[0].url,
                    ),
                );
                if (courierOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle(t("couriers:title")),
                            options: courierOptionGroup,
                        },
                    ]);
                }
            },
        },
    );

    useEffect(() => {
        setOptions([]);
        refetchOrders();
        refetchStores();
        refetchCouriers();
    }, [value]);

    const menu = (
        <Menu selectedKeys={[locale()]}>
            {[...i18n.languages].sort().map((lang: string) => (
                <Menu.Item
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    icon={
                        <span style={{ marginRight: 8 }}>
                            {languages[lang].flag}
                        </span>
                    }
                >
                    {languages[lang].title}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <AntdLayout.Header
            style={{
                padding: "0px 24px",
                height: "64px",
                backgroundColor: "#FFF",
            }}
        >
            <Row align="middle" justify={screens.sm ? "space-between" : "end"}>
                <Col xs={0} sm={12}>
                    <AutoComplete
                        style={{
                            width: "100%",
                            maxWidth: "550px",
                        }}
                        options={options}
                        filterOption={false}
                        onSearch={debounce(
                            (value: string) => setValue(value),
                            500,
                        )}
                    >
                        <Input
                            size="large"
                            placeholder="Search by Store ID, E-mail, Keyword"
                            suffix={<SearchOutlined />}
                        />
                    </AutoComplete>
                </Col>
                <Col>
                    <Space size="large">
                        <Dropdown overlay={menu}>
                            <a
                                style={{ color: "inherit" }}
                                onClick={(e) => e.preventDefault()}
                            >
                                <Space>
                                    {languages[locale()].flag}
                                    <div
                                        style={{
                                            display: screens.lg
                                                ? "block"
                                                : "none",
                                        }}
                                    >
                                        {languages[locale()].title}
                                        <DownOutlined
                                            style={{
                                                fontSize: "12px",
                                                marginLeft: "6px",
                                            }}
                                        />
                                    </div>
                                </Space>
                            </a>
                        </Dropdown>
                        <Text ellipsis strong>
                            {user?.name}
                        </Text>
                        <Avatar
                            size="large"
                            src={user?.avatar}
                            alt={user?.name}
                        />
                    </Space>
                </Col>
            </Row>
        </AntdLayout.Header>
    );
};
