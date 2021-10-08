import {
    AntdLayout,
    Space,
    Typography,
    useRouterContext,
    Row,
} from "@pankod/refine";

import {
    MotorcycleIcon,
    FinefoodsIcon,
    BasketIcon,
    SearchIcon,
} from "@components";

const { Text } = Typography;

require("./header.less");

export const Header = () => {
    const { Link } = useRouterContext();
    return (
        <AntdLayout.Header className="header">
            <Row>
                <MotorcycleIcon height={36} style={{ marginRight: 24 }} />
                <FinefoodsIcon height={36} />
            </Row>
            <Space size="large">
                {headerItems.map((i) => (
                    <Link key={i} href={i.href ?? "/"}>
                        <a>
                            <Text className="header-item">{i.label}</Text>
                        </a>
                    </Link>
                ))}
            </Space>
            <Row>
                <SearchIcon height={24} style={{ marginRight: 14 }} />
                <BasketIcon height={24} />
            </Row>
        </AntdLayout.Header>
    );
};

const headerItems: Array<{ label: string; href: string }> = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/" },
    { label: "Contact", href: "/" },
];
