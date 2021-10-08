import { Button, Typography } from "@pankod/refine";

import { PlateIcon } from "@components/icons";

const { Text } = Typography;

require("./homepage.less");

export const HomePage = () => {
    return (
        <div className="promotional-wrapper">
            <div className="text-wrapper">
                <Text className="title">Delight in every bite!</Text>
                <Text className="subtitle">Delivering happiness, on time.</Text>
                <Button className="explore-button">
                    <Text style={{ fontSize: 24, fontWeight: 700 }}>
                        Explore menu
                    </Text>
                </Button>
            </div>
            <PlateIcon height={400} />
        </div>
    );
};
