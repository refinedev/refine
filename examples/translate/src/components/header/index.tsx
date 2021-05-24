import {
    AntdLayout,
    Button,
    Menu,
    Icons,
    Dropdown,
    useGetLocale,
} from "@pankod/refine";
import { useTranslation } from "react-i18next";

const { DownOutlined } = Icons;

interface ILanguage {
    title: string;
    flag: string;
}

const languages: Record<string, ILanguage> = {
    en: {
        title: "English",
        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    },
    tr: {
        title: "Türkçe",
        flag: "🇹🇷",
    },
};

export const Header = () => {
    const { i18n } = useTranslation();
    const locale = useGetLocale();

    const changeLanguage = ({ key }: any) => {
        i18n.changeLanguage(key);
    };

    const menu = (
        <Menu onClick={changeLanguage} selectedKeys={[locale()]}>
            {i18n.languages?.sort().map((lang) => (
                <Menu.Item
                    key={lang}
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
                padding: "0px 24px 0px 0px",
                height: "48px",
                backgroundColor: "#FFF",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    height: "100%",
                    alignItems: "center",
                }}
            >
                <Dropdown overlay={menu}>
                    <Button
                        type="text"
                        style={{ height: "100%" }}
                        onClick={(e) => e.preventDefault()}
                    >
                        {languages[locale()]?.title} <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
        </AntdLayout.Header>
    );
};
