import { Col, Pagination, Row, type TableProps } from "antd";

import { ContactCard } from "./card";
import { Contact } from "../../interfaces/graphql";
import { CardSkeleton } from "./card/skeleton";
import { PaginationTotal } from "../pagination-total";

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
                {loading
                    ? Array.from({ length: 12 }).map((_, index) => {
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
                      })
                    : dataSource?.map((contact) => (
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
                showTotal={(total) => (
                    <PaginationTotal total={total} entityName="contacts" />
                )}
                onChange={(page, pageSize) => {
                    setCurrent(page);
                    setPageSize(pageSize);
                }}
            />
        </div>
    );
};

// return (
//     <div
//         style={{
//             marginTop: "1rem",
//         }}
//     >
//         <Row gutter={[32, 32]}>
//             {loading
//                 ? Array.from({ length: 12 }).map((_, index) => {
//                       return (
//                           <Col
//                               key={index}
//                               span="6"
//                               lg={{ span: 6 }}
//                               md={{ span: 12 }}
//                               xs={{ span: 24 }}
//                           >
//                               <CardSkeleton />
//                           </Col>
//                       );
//                   })
//                 : dataSource?.map((contact) => (
//                       <Col
//                           key={contact.id}
//                           span="6"
//                           lg={{ span: 6 }}
//                           md={{ span: 12 }}
//                           xs={{ span: 24 }}
//                       >
//                           <ContactCard contact={contact} />
//                       </Col>
//                   ))}
//         </Row>

//         <Pagination
//             style={{ display: "flex", marginTop: "1rem" }}
//             {...pagination}
//             showTotal={(total) => (
//                 <PaginationTotal total={total} entityName="contacts" />
//             )}
//             onChange={(page, pageSize) => {
//                 setCurrent(page);
//                 setPageSize(pageSize);
//             }}
//         />
//     </div>
// );
