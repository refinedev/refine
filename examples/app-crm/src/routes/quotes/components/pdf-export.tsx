import { useParams } from "react-router-dom";

import { useModal } from "@refinedev/antd";
import { useOne } from "@refinedev/core";
import { GetFields } from "@refinedev/nestjs-query";

import { FilePdfOutlined } from "@ant-design/icons";
import {
    Document,
    Image,
    Page,
    PDFViewer,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import { Button, Modal } from "antd";

import { QuotesGetQuoteQuery } from "@/graphql/types";
import { currencyNumber } from "@/utilities";

import { QUOTES_GET_QUOTE_QUERY } from "../queries";

const PdfExport = () => {
    const { modalProps, show } = useModal();
    const params = useParams<{ id: string }>();

    const { data, isLoading, isFetching, refetch } = useOne<
        GetFields<QuotesGetQuoteQuery>
    >({
        resource: "quotes",
        id: params.id,
        liveMode: "off",
        meta: {
            gqlQuery: QUOTES_GET_QUOTE_QUERY,
        },
    });

    const {
        title,
        tax,
        total,
        subTotal,
        items,
        description,
        company,
        contact,
        salesOwner,
    } = data?.data || {};

    const loading = isLoading || isFetching;

    const pdfOpenHandler = async () => {
        await refetch();
        show();
    };

    return (
        <>
            <Button
                loading={loading}
                onClick={pdfOpenHandler}
                type="primary"
                icon={<FilePdfOutlined />}
            >
                Convert to PDF
            </Button>

            <Modal {...modalProps} destroyOnClose width="80%" footer={null}>
                <PDFViewer style={styles.viewer}>
                    <Document title={`Quote of ${title}`}>
                        <Page style={styles.page} size="A4">
                            <Text
                                style={{
                                    fontSize: 24,
                                }}
                            >
                                {title}
                            </Text>
                            <View
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    gap: "16px",
                                    marginTop: 32,
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "16px",
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: "64px",
                                            height: "64px",
                                        }}
                                        src="https://avatars.githubusercontent.com/u/104967037?s=200&v=4"
                                    />
                                    <View
                                        style={{
                                            display: "flex",
                                            gap: "4px",
                                        }}
                                    >
                                        <Text>{company?.name}</Text>
                                        <Text>{company?.country}</Text>
                                        <Text>{company?.website}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        display: "flex",
                                        minWidth: "160",
                                        gap: "16px",
                                    }}
                                >
                                    <View>
                                        <Text>Prepared by:</Text>
                                        <Text>{contact?.name}</Text>
                                    </View>
                                    <View>
                                        <Text>Prepared for:</Text>
                                        <Text>{salesOwner?.name}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <Text
                                style={{
                                    fontSize: 20,
                                }}
                            >
                                Products / Services
                            </Text>
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                            Title
                                        </Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                            Unit Price
                                        </Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                            Quantity
                                        </Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                            Discout
                                        </Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                            Total Price
                                        </Text>
                                    </View>
                                </View>
                                {items?.map((item) => (
                                    <View
                                        style={styles.tableRow}
                                        key={item.title}
                                    >
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>
                                                {item.title}
                                            </Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>
                                                {currencyNumber(item.unitPrice)}
                                            </Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>
                                                {item.quantity}
                                            </Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>
                                                %{item.discount}
                                            </Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>
                                                {currencyNumber(
                                                    item.totalPrice,
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    marginTop: 12,
                                }}
                            >
                                <View
                                    style={{
                                        width: "80px",
                                        display: "flex",
                                        gap: 8,
                                    }}
                                >
                                    <Text>Subtotal</Text>
                                    <Text>Sales tax</Text>
                                    <Text>Total value</Text>
                                </View>
                                <View
                                    style={{
                                        display: "flex",
                                        gap: 8,
                                    }}
                                >
                                    <Text>{currencyNumber(subTotal || 0)}</Text>
                                    <Text>%{tax || 0}</Text>
                                    <Text>{currencyNumber(total || 0)}</Text>
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <Text
                                style={{
                                    fontSize: 12,
                                }}
                            >
                                {description}
                            </Text>
                        </Page>
                    </Document>
                </PDFViewer>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    viewer: {
        paddingTop: 32,
        width: "100%",
        height: "80vh",
        border: "none",
    },
    page: {
        display: "flex",
        padding: "0.4in 0.4in",
        fontSize: 12,
        color: "#333",
        backgroundColor: "#fff",
    },
    table: {
        display: "flex",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginTop: 24,
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
    },
    tableCol: {
        width: "20%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: {
        margin: "auto",
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 10,
    },
    divider: {
        width: "100%",
        height: 1,
        marginTop: 32,
        marginBottom: 32,
        backgroundColor: "#D9D9D9",
    },
});

export default PdfExport;
