import {
    AntdLayout,
    Space,
    Typography,
    useRouterContext,
    Row,
} from "@pankod/refine";

import { MotorcycleIcon, FinefoodsIcon, RefineLoveIcon } from "@components";

const { Text } = Typography;

require("./style.less");

export const Footer = () => {
    const { Link } = useRouterContext();

    return (
        <AntdLayout.Footer className="footer">
            <Row>
                <MotorcycleIcon
                    svgProps={{ height: 36, style: { marginRight: 24 } }}
                />
                <FinefoodsIcon height={36} />
            </Row>
            <Space size="large">
                {footerItems.map((i) => (
                    <Link key={i} href={i.href ?? "/"}>
                        <a>
                            <Text className="footer-item">{i.label}</Text>
                        </a>
                    </Link>
                ))}
            </Space>
            <RefineLoveIcon height={72} />
        </AntdLayout.Footer>
    );
};

const footerItems: Array<{ label: string; href: string }> = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/" },
    { label: "Getting Started", href: "/" },
    { label: "Tutorials", href: "/" },
];
