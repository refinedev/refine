import { useRef } from "react";
import { ExportButton } from "@pankod/refine-antd";

import "./pdf.css";

import { PDFExport } from "@progress/kendo-react-pdf";
import { IInvoice } from "interfaces";
import { API_URL } from "../../constants";

type PdfProps = {
    record: IInvoice | undefined;
};

export const PdfLayout: React.FC<PdfProps> = ({ record }) => {
    const pdfExportComponent = useRef<any>();

    const handleExportWithComponent = () => {
        pdfExportComponent?.current?.save();
    };

    const total = record?.missions.reduce((prev: any, cur: any): any => {
        return prev + cur.day * cur.daily_rate;
    }, 0);

    return (
        <div>
            <div className="page-container hidden-on-narrow">
                <PDFExport ref={pdfExportComponent}>
                    <div className={`pdf-page ${"size-a4"}`}>
                        <div className="inner-page">
                            <div className="pdf-header">
                                <span className="company-logo">
                                    <img
                                        src={
                                            API_URL + record?.company?.logo?.url
                                        }
                                        width={100}
                                        alt="company_logo"
                                    />
                                    <br />
                                    {`Invoice: Invoice_#${record?.id}${record?.name}`}
                                </span>
                                <span className="invoice-number">{`Invoice ID: INVOICE_#${record?.id}`}</span>
                            </div>
                            <div className="pdf-footer">
                                <p>
                                    {record?.company.city}
                                    <br />
                                    {record?.company.address},{" "}
                                    {record?.company.country}, 10785
                                </p>
                            </div>
                            <div className="addresses">
                                <div className="for">
                                    <h3>Invoice For:</h3>
                                    <p>
                                        {record?.contact?.client?.name}
                                        <br />
                                        {`${
                                            record?.contact?.first_name || ""
                                        } ${record?.contact?.last_name || ""}`}
                                        <br />
                                        {record?.contact?.email}
                                    </p>
                                </div>

                                <div className="from">
                                    <h3>From:</h3>
                                    <p>
                                        {record?.company.name}
                                        <br />
                                        {record?.company.city}
                                        <br />
                                        {record?.company.address},{" "}
                                        {record?.company.country}, 10785
                                    </p>
                                    <p>
                                        {`Invoice ID: ${record?.id}`}
                                        <br />
                                        {`Invoice Custom ID: ${record?.custom_id}`}
                                        <br />
                                        {`Invoice Date: ${record?.date}`}
                                    </p>
                                </div>
                            </div>
                            <table className="infoTable">
                                <tbody>
                                    <tr className="infoTable">
                                        <th>Mission</th>
                                        <th>Day(s)</th>
                                        <th>Day Rate</th>
                                        <th>Total</th>
                                    </tr>
                                    {record?.missions.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.mission}</td>
                                                <td>{item.day}</td>
                                                <td>{item.daily_rate}</td>
                                                <td>
                                                    {item.daily_rate * item.day}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="from" style={{ marginTop: 48 }}>
                            <p>SUBTOTAL: {total}</p>
                            <p>Discount(%): {record?.discount}</p>
                            <p>Tax(%): {record?.tax}</p>
                            <p>
                                Total($):
                                {total +
                                    (total * (record?.tax as number)) / 100 -
                                    (total * (record?.discount as number)) /
                                        100}
                            </p>
                        </div>
                        <div className="pdf-body">
                            <div id="grid"></div>
                            <p className="signature">
                                Signature: ________________ <br />
                                <br />
                                Date: {record?.date}
                            </p>
                        </div>
                    </div>
                </PDFExport>
            </div>
            <div
                style={{
                    marginTop: 16,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <ExportButton onClick={handleExportWithComponent}>
                    Download Invoice
                </ExportButton>
            </div>
        </div>
    );
};
