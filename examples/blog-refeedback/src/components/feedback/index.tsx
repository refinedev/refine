import { useState } from "react";

import { Card, Button, Icons, Typography } from "@pankod/refine-antd";

import { TypePage } from "./typePage";
import { InputPage } from "./inputPage";

const { CloseOutlined, ArrowLeftOutlined } = Icons;
const { Title } = Typography;

export const Feedback = () => {
    const [visibleCard, setVisibleCard] = useState(false);
    const [selectedType, setSelectedType] = useState("");

    const handleVisibility = () => {
        setVisibleCard((prev) => !prev);
        setSelectedType("");
    };

    const handleCardTitle = () => {
        switch (selectedType) {
            case "idea":
                return "Share an idea";
            case "issue":
                return "Report an issue";
            case "other":
                return "Tell us anything!";
            default:
                return "What's on your mind?";
        }
    };

    const CardTitle = (
        <div style={{ display: "flex", alignItems: "center" }}>
            {selectedType && (
                <Button
                    size="small"
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => setSelectedType("")}
                />
            )}
            <Title
                level={5}
                style={{
                    textAlign: "center",
                    width: "100%",
                    marginBottom: "0px",
                }}
            >
                {handleCardTitle()}
            </Title>
        </div>
    );

    return (
        <>
            <Card
                className="feedback-card"
                style={{ display: visibleCard ? "block" : "none" }}
                bodyStyle={{
                    padding: "0px 12px 12px 12px",
                }}
                headStyle={{
                    padding: "0px 12px",
                    borderBottom: "none",
                }}
                title={CardTitle}
                extra={
                    <Button
                        size="small"
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={handleVisibility}
                    />
                }
            >
                {selectedType ? (
                    <InputPage
                        selectedType={selectedType}
                        handleVisibleCard={handleVisibility}
                    />
                ) : (
                    <TypePage setSelectedType={setSelectedType} />
                )}
            </Card>
            <Button className="feedback-button" onClick={handleVisibility}>
                Give us Feedback
            </Button>
        </>
    );
};
