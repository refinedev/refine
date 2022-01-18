import { useNavigation } from "@pankod/refine-core";

import { Button, Typography } from "@pankod/refine-antd";

import { PlateIcon } from "@components/icons";

import { useIsMobile } from "@hooks";

const { Text } = Typography;

require("./style.less");

export const Promotional = () => {
    const isMobile = useIsMobile();
    const { push } = useNavigation();

    return (
        <div className="promotional-wrapper">
            <div className="text-wrapper">
                <Text className="title">
                    Delight <br /> in every bite!
                </Text>
                <Text className="subtitle">Delivering happiness, on time.</Text>
                <Button
                    className="explore-button"
                    onClick={() => {
                        push("/[id]/[category]", "/1/Starters");
                    }}
                >
                    <Text style={{ fontSize: 24, fontWeight: 700 }}>
                        Explore menu
                    </Text>
                </Button>
            </div>
            <PlateIcon height={isMobile ? 300 : 400} />
        </div>
    );
};
