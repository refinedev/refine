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
} from "@pankod/refine";
import { useTranslation } from "react-i18next";

const { SearchOutlined, DownOutlined } = Icons;
const { Text } = Typography;
const { useBreakpoint } = Grid;

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

export const Header = () => {
    const { i18n } = useTranslation();
    const locale = useGetLocale();
    const changeLanguage = useSetLocale();
    const { data: user } = useGetIdentity();
    const screens = useBreakpoint();

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
                    <Input
                        size="large"
                        placeholder="Search by Store ID, E-mail, Keyword"
                        style={{
                            maxWidth: "550px",
                        }}
                        suffix={<SearchOutlined />}
                    />
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
