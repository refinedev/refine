import { IInvoice, IService } from "../../interfaces";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  View,
  Text,
  PDFViewer,
} from "@react-pdf/renderer";
import { Modal } from "antd";
import dayjs from "dayjs";
import { useStyles } from "./styled";
import { API_URL } from "../../utils/constants";

type Props = {
  invoice: IInvoice;
  onClose: () => void;
};

export const InvoicePDFModal = ({ invoice, onClose }: Props) => {
  const { styles } = useStyles();

  const services = JSON.parse(invoice?.services || "[]") as IService[];
  const subtotal = services.reduce(
    (acc, service) =>
      acc +
      (service.unitPrice * service.quantity * (100 - service.discount)) / 100,
    0,
  );

  return (
    <Modal
      className={styles.modal}
      open={true}
      footer={false}
      onCancel={() => {
        onClose();
      }}
    >
      <PDFViewer style={pdfStyles.viewer}>
        <Document>
          <Page style={pdfStyles.page} size="A4">
            <View>
              <View style={pdfStyles.inoviceTextNumberContainer}>
                <Text style={pdfStyles.inoviceText}>
                  {`Invoice ID: #${invoice?.id}`}
                </Text>
                <Text style={pdfStyles.inoviceId}>{`Date: ${dayjs(
                  invoice.date,
                ).format("D MMM YYYY")}`}</Text>
              </View>
            </View>
            <View style={pdfStyles.dividerLG} />

            <View style={pdfStyles.inoviceForFromCotnainer}>
              <View style={pdfStyles.inoviceFrom}>
                <Text style={pdfStyles.inoviceForFromTitle}>From:</Text>
                <View style={pdfStyles.inoviceFromContent}>
                  {invoice?.account?.logo?.url && (
                    <Image
                      src={API_URL + invoice?.account?.logo?.url}
                      style={{ width: "64px", height: "auto" }}
                    />
                  )}
                  <View>
                    <Text style={pdfStyles.inoviceForFromText}>
                      {invoice?.account.company_name}
                    </Text>
                    <Text style={pdfStyles.inoviceForFromText}>
                      {invoice?.account.address}, {invoice?.account.country}
                    </Text>
                    <Text style={pdfStyles.inoviceForFromText}>
                      {invoice?.account.phone}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={pdfStyles.inoviceFor}>
                <Text style={pdfStyles.inoviceForFromTitle}>To:</Text>
                <View style={pdfStyles.inoviceForContent}>
                  <Text style={pdfStyles.inoviceForFromText}>
                    {invoice?.client?.name}
                  </Text>
                  <Text style={pdfStyles.inoviceForFromText}>
                    {invoice?.client?.address}, {invoice?.client?.country}
                  </Text>

                  <Text style={pdfStyles.inoviceForFromText}>
                    {invoice?.client?.phone}
                  </Text>
                </View>
              </View>
            </View>

            <View style={pdfStyles.dividerLG} />

            <View style={pdfStyles.table}>
              <View style={pdfStyles.tableHeader}>
                <Text style={[pdfStyles.tableHeaderItem, { width: "40%" }]}>
                  Title
                </Text>
                <Text style={[pdfStyles.tableHeaderItem, { width: "20%" }]}>
                  Unit Price
                </Text>
                <Text style={[pdfStyles.tableHeaderItem, { width: "20%" }]}>
                  Quantity
                </Text>
                <Text style={[pdfStyles.tableHeaderItem, { width: "20%" }]}>
                  Discount
                </Text>
                <Text style={[pdfStyles.tableHeaderItem, { width: "20%" }]}>
                  Total Price
                </Text>
              </View>
              {services.map((item, i) => {
                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <View key={i} style={pdfStyles.tableRow}>
                    <Text style={[pdfStyles.tableCol, { width: "40%" }]}>
                      {item.title}
                    </Text>
                    <Text style={[pdfStyles.tableCol, { width: "20%" }]}>
                      {item.unitPrice}
                    </Text>
                    <Text style={[pdfStyles.tableCol, { width: "20%" }]}>
                      {item.quantity}
                    </Text>
                    <Text style={[pdfStyles.tableCol, { width: "20%" }]}>
                      {item.discount}
                    </Text>
                    <Text style={[pdfStyles.tableCol, { width: "20%" }]}>
                      {item.totalPrice}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={pdfStyles.totalContainer}>
              <View style={pdfStyles.totalRow}>
                <Text style={pdfStyles.totalLabel}>Subtotal:</Text>
                <Text style={pdfStyles.totalValue}>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(subtotal)}
                </Text>
              </View>
              <View style={pdfStyles.totalRow}>
                <Text style={pdfStyles.totalLabel}>Sales tax:</Text>
                <Text style={pdfStyles.totalValue}>{invoice?.tax}%</Text>
              </View>
              <View style={pdfStyles.totalRow}>
                <Text style={pdfStyles.totalLabel}>Discount:</Text>
                <Text style={pdfStyles.totalValue}>{invoice?.discount}%</Text>
              </View>

              <View style={pdfStyles.divider} />

              <View style={pdfStyles.totalRow}>
                <Text style={pdfStyles.totalLabel}> Total value:</Text>
                <Text style={pdfStyles.totalValue}>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(invoice?.total)}
                </Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Modal>
  );
};

const pdfStyles = StyleSheet.create({
  viewer: {
    paddingTop: 32,
    width: "100%",
    height: "80vh",
    border: "none",
  },
  page: {
    display: "flex",
    padding: "0.6in 0.4in",
    fontSize: 12,
    color: "#333",
    backgroundColor: "#fff",
  },
  inoviceTextNumberContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inoviceText: {
    fontSize: 14,
  },
  inoviceId: {
    fontSize: 14,
  },
  inoviceForFromCotnainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inoviceForFromTitle: {
    marginBottom: 24,
  },
  inoviceFor: {
    flex: 1,
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  inoviceForContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  inoviceFrom: {
    flex: 1,
    width: "50%",
  },
  inoviceFromContent: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
  },
  inoviceForFromText: {
    color: "#000000D9",
    lineHeight: 1.5,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e5e5e5",
  },
  dividerSM: {
    width: "100%",
    height: 1,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#e5e5e5",
  },
  dividerLG: {
    width: "100%",
    height: 1,
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: "#e5e5e5",
  },
  table: {},
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  },
  tableHeaderItem: {
    paddingVertical: 8,
    border: "1px solid #000",
    borderBottom: "none",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableCol: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    border: "1px solid #000",
  },
  totalContainer: {
    marginTop: 24,
    marginLeft: "auto",
    width: "180px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  totalRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalLabel: {
    textAlign: "right",
    width: "100px",
    color: "#000000A6",
  },
  totalValue: {},
});
