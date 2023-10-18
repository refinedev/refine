import { Col, Row } from "antd";

import { CompanyContactsTable, CompanyForm } from "..";

export const CompanyEdit = () => {
    return (
        <div className="page-container">
            <Row gutter={[32, 32]}>
                <Col xs={24} xl={12}>
                    <CompanyForm />
                </Col>
                <Col xs={24} xl={12}>
                    <CompanyContactsTable />
                </Col>
            </Row>
        </div>
    );
};
