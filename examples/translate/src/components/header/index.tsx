import {
    AntdLayout,
    Button,
    Menu,
    Icons,
    Dropdown,
    useGetLocale,
    useSetLocale,
} from "@pankod/refine";
import { useTranslation } from "react-i18next";

const { TranslationOutlined } = Icons;

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
    const changeLanguage = useSetLocale();

    const menu = (
        <Menu selectedKeys={[locale()]}>
            {i18n.languages?.sort().map((lang) => (
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
                        size="large"
                        style={{ height: "100%" }}
                        icon={<TranslationOutlined />}
                        onClick={(e) => e.preventDefault()}
                    />
                </Dropdown>
            </div>
        </AntdLayout.Header>
    );
};
