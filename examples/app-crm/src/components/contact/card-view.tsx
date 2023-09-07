import { Col, Pagination, Row, type TableProps } from "antd";

import { ContactCard } from "./card";
import { Contact } from "../../interfaces/graphql";
import { CardSkeleton } from "../company/card-skeleton";

type Props = {
    tableProps: TableProps<Contact>;
    setCurrent: (current: number) => void;
    setPageSize: (pageSize: number) => void;
    loading?: boolean;
};

export const CardView: React.FC<Props> = ({
    tableProps: { dataSource, pagination },
    setCurrent,
    setPageSize,
    loading,
}) => {
    return (
        <div
            style={{
                marginTop: "1rem",
            }}
        >
            <Row gutter={[32, 32]}>
                {loading &&
                    Array.from({ length: 12 }).map((_, index) => {
                        return (
                            <Col
                                key={index}
                                span="6"
                                lg={{ span: 6 }}
                                md={{ span: 12 }}
                                xs={{ span: 24 }}
                            >
                                <CardSkeleton />
                            </Col>
                        );
                    })}

                {dataSource?.map((contact) => (
                    <Col
                        key={contact.id}
                        span="6"
                        lg={{ span: 6 }}
                        md={{ span: 12 }}
                        xs={{ span: 24 }}
                    >
                        <ContactCard contact={contact} />
                    </Col>
                ))}
            </Row>

            <Pagination
                style={{ display: "flex", marginTop: "1rem" }}
                {...pagination}
                showTotal={(total) => {
                    return (
                        <span
                            style={{
                                marginLeft: "48px",
                            }}
                        >
                            <span className="ant-text secondary">{total}</span>{" "}
                            contacts in total
                        </span>
                    );
                }}
                onChange={(page, pageSize) => {
                    setCurrent(page);
                    setPageSize(pageSize);
                }}
            />
        </div>
    );
};
