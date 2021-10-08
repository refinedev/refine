import {
    AntdLayout,
    Space,
    Typography,
    useRouterContext,
} from "@pankod/refine";

import { MotorcycleIcon, FinefoodsIcon, RefineLoveIcon } from "@components";

const { Text } = Typography;

require("./footer.less");

export const Footer = () => {
    const { Link } = useRouterContext();
    return (
        <AntdLayout.Footer className="footer">
            <div>
                <MotorcycleIcon height={36} style={{ marginRight: 24 }} />
                <FinefoodsIcon height={36} />
            </div>
            <Space size="large">
                {footerItems.map((i) => (
                    <Link key={i} href={i.href ?? "/"}>
                        <a>
                            <Text className="footer-item">{i}</Text>
                        </a>
                    </Link>
                ))}
            </Space>
            <RefineLoveIcon height={72} />
        </AntdLayout.Footer>
    );
};

const footerItems = ["Home", "Menu", "Contact", "Getting Started", "Tutorials"];
