import {
    BulbFilled,
    WarningTwoTone,
    EllipsisOutlined,
} from "@ant-design/icons";
import { Card, Typography } from "antd";

import { FeedBackCardTypes } from "interfaces";

export type FeedBackCardPageProps = {
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
};

const { Text } = Typography;

const FEEDBACK_TYPES = [
    {
        icon: (
            <WarningTwoTone
                style={{ fontSize: "36px" }}
                twoToneColor="#fa8c16"
            />
        ),
        type: "issue",
    },
    {
        icon: <BulbFilled style={{ fontSize: "36px", color: "#ffd666" }} />,
        type: "idea",
    },
    {
        icon: <EllipsisOutlined style={{ fontSize: "36px" }} />,
        type: "other",
    },
];

export const TypePage: React.FC<FeedBackCardPageProps> = ({
    setSelectedType,
}) => {
    const FeedbackTypeCard = ({ icon, type }: FeedBackCardTypes) => (
        <Card
            bodyStyle={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "12px 24px",
            }}
            hoverable
            onClick={() => setSelectedType(type)}
        >
            {icon}
            <Text style={{ textTransform: "capitalize" }} strong>
                {type}
            </Text>
        </Card>
    );

    return (
        <div className="feedback-type-card-container">
            {FEEDBACK_TYPES.map((item) => (
                <FeedbackTypeCard
                    key={item.type}
                    icon={item.icon}
                    type={item.type}
                />
            ))}
        </div>
    );
};
