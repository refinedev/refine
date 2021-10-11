import { AntdLayout, Row } from "@pankod/refine";

import {
    MotorcycleIcon,
    FinefoodsIcon,
    BasketIcon,
    SearchIcon,
} from "@components";

import { useIsMobile } from "@hooks";

require("./header.less");

export const Header = () => {
    const isMobile = useIsMobile();

    return (
        <AntdLayout.Header className="header">
            <Row>
                <MotorcycleIcon
                    svgProps={{
                        height: isMobile ? 24 : 36,
                        style: { marginRight: isMobile ? 14 : 24 },
                    }}
                />
                <FinefoodsIcon height={isMobile ? 24 : 36} />
            </Row>
            <Row>
                <SearchIcon height={24} style={{ marginRight: 14 }} />
                <BasketIcon />
            </Row>
        </AntdLayout.Header>
    );
};
