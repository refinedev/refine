import { useNavigation, useShow } from "@refinedev/core";
import { FilePdfOutlined } from "@ant-design/icons";
import { PageHeader } from "../../components/page-header";
import { InvoicePDF } from "../../components/invoice-pdf";
import { IInvoice } from "../../interfaces";
import { Button } from "antd";

export const InvoicesPageShow = () => {
  const { listUrl } = useNavigation();

  const { queryResult } = useShow<IInvoice>({
    meta: {
      populate: ["client", "account.logo"],
    },
  });
  const invoice = queryResult?.data?.data;

  return (
    <>
      <PageHeader
        backButtonText="Invoices"
        backButtonHref={listUrl("invoices")}
        extra={
          <>
            <Button
              disabled={!invoice}
              icon={<FilePdfOutlined />}
              onClick={() => window.print()}
            >
              Export PDF
            </Button>
          </>
        }
      />
      <InvoicePDF invoice={invoice} loading={queryResult?.isLoading} />
    </>
  );
};
