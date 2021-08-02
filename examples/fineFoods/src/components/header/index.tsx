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

export const Header: React.FC = () => {
    const { i18n } = useTranslation();
    const locale = useGetLocale();
    const changeLanguage = useSetLocale();
    const { data: user } = useGetIdentity();
    const screens = useBreakpoint();

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
                const orderOptionGroup = data.data.map((item) => ({
                    value: item.orderNumber.toString(),
                }));
                if (orderOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: "Orders",
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
                const userOptionGroup = data.data.map((item) => ({
                    value: item.title,
                }));
                if (userOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: "Stores",
                            options: userOptionGroup,
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
                const courierOptionGroup = data.data.map((item) => ({
                    value: item.name,
                }));
                if (courierOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: "Couriers",
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
                        dropdownMatchSelectWidth={600}
                        style={{ width: "100%", maxWidth: "550px" }}
                        options={options}
                        filterOption={false}
                        onSearch={debounce(
                            (value: string) => setValue(value),
                            500,
                        )}
                    >
                        <Input
                            size="large"
                            placeholder="Search by Order, Product, User"
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
