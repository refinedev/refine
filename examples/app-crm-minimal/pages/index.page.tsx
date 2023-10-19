import { Col, Row } from "antd";
import {
    CalendarUpcomingEvents,
    DashboardDealsChart,
    DashboardLatestActivities,
    DashboardTotalCountCard,
} from "@components";

export default function HomePage() {
    return (
        <div className="page-container">
            <Row gutter={[32, 32]}>
                <Col xs={24} sm={24} xl={8}>
                    <DashboardTotalCountCard resource="companies" />
                </Col>
                <Col xs={24} sm={24} xl={8}>
                    <DashboardTotalCountCard resource="contacts" />
                </Col>
                <Col xs={24} sm={24} xl={8}>
                    <DashboardTotalCountCard resource="deals" />
                </Col>
            </Row>

            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: "32px",
                }}
            >
                <Col
                    xs={24}
                    sm={24}
                    xl={8}
                    style={{
                        height: "460px",
                    }}
                >
                    <CalendarUpcomingEvents showGoToListButton />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={16}
                    style={{
                        height: "460px",
                    }}
                >
                    <DashboardDealsChart />
                </Col>
            </Row>

            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: "32px",
                }}
            >
                <Col xs={24}>
                    <DashboardLatestActivities />
                </Col>
            </Row>
        </div>
    );
}
