import { AntdLayout, Typography, Row } from "@pankod/refine";

import {
    MotorcycleIcon,
    FinefoodsIcon,
    BasketIcon,
    SearchIcon,
} from "@components";

const { Text } = Typography;

require("./header.less");

export const Header = () => {
    return (
        <AntdLayout.Header className="header">
            <Row>
                <MotorcycleIcon height={36} style={{ marginRight: 24 }} />
                <FinefoodsIcon />
            </Row>
            <Row>
                <SearchIcon height={24} style={{ marginRight: 14 }} />
                <BasketIcon />
            </Row>
        </AntdLayout.Header>
    );
};
