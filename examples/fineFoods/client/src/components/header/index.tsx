import {
    AntdLayout,
    Space,
    Typography,
    useRouterContext,
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
            <div style={{ display: "flex" }}>
                <MotorcycleIcon height={36} style={{ marginRight: 24 }} />
                <FinefoodsIcon height={36} />
            </div>
            <Space size="large">
                {headerItems.map((i) => (
                    <Link key={i} href={i.href ?? "/"}>
                        <a>
                            <Text className="header-item">{i}</Text>
                        </a>
                    </Link>
                ))}
            </Space>
            <div style={{ display: "flex" }}>
                <SearchIcon height={24} style={{ marginRight: 14 }} />
                <BasketIcon height={24} />
            </div>
        </AntdLayout.Header>
    );
};

const headerItems = ["Home", "Menu", "Contact"];
