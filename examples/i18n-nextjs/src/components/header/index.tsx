import { useGetLocale } from "@refinedev/core";
import { DownOutlined } from "@ant-design/icons";
import {
    Layout as AntdLayout,
    Space,
    Button,
    Dropdown,
    Avatar,
    MenuProps,
} from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

export const Header: React.FC = () => {
    const locale = useGetLocale();
    const { locales } = useRouter();

    const currentLocale = locale();

    const menuItems: MenuProps["items"] = [...(locales || [])]
        .sort()
        .map((lang: string) => ({
            key: lang,
            icon: (
                <span style={{ marginRight: 8 }}>
                    <Avatar size={16} src={`/images/flags/${lang}.svg`} />
                </span>
            ),
            label: (
                <Link href="/" locale={lang}>
                    {lang === "en" ? "English" : "German"}
                </Link>
            ),
        }));

    return (
        <AntdLayout.Header
            style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0px 24px",
                height: "48px",
                backgroundColor: "#FFF",
                position: "sticky",
                top: 0,
                zIndex: 1,
            }}
        >
            <Dropdown
                menu={{
                    items: menuItems,
                    selectedKeys: currentLocale ? [currentLocale] : [],
                }}
            >
                <Button type="text">
                    <Space>
                        <Avatar
                            size={16}
                            src={`/images/flags/${currentLocale}.svg`}
                        />
                        {currentLocale === "en" ? "English" : "German"}
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </AntdLayout.Header>
    );
};
