import { Col, Row } from "antd";

import {
    CompanyContactsTable,
    CompanyDealsTable,
    CompanyInfoForm,
    CompanyNotes,
    CompanyQuotesTable,
    CompanyTitleForm,
} from "./components";

export const CompanyEditPage = () => {
    return (
        <div className="page-container">
            <CompanyTitleForm />
            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: 32,
                }}
            >
                <Col span={16}>
                    <CompanyContactsTable />
                    <CompanyDealsTable
                        style={{
                            marginTop: 32,
                        }}
                    />
                    <CompanyQuotesTable
                        style={{
                            marginTop: 32,
                        }}
                    />
                    <CompanyNotes
                        style={{
                            marginTop: 32,
                        }}
                    />
                </Col>
                <Col span={8}>
                    <CompanyInfoForm />
                </Col>
            </Row>
        </div>
    );
};
