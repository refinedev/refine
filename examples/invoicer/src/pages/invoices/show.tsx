import { useNavigation } from "@refinedev/core";
import { PageHeader } from "../../components/page-header";

import { InvoicePDF } from "../../components/invoice-pdf";

export const InvoicesPageShow = () => {
  const { listUrl } = useNavigation();

  return (
    <>
      <PageHeader
        backButtonText="Invoices"
        backButtonHref={listUrl("invoices")}
      />
      <InvoicePDF />
    </>
  );
};
