---
title: Building an Customizable Invoice Generator App with Refine, Strapi & Ant Design | Part II
description: Looking for an invoice generator? Try out Refine. With our custom interface, you can build your own invoice in minutes! Learn more here.
slug: refine-invoice-generator
authors: melih
tags:
    [
        refine,
        invoice-generator,
        react,
        admin-panel,
        business-tool,
        internal-tool,
        strapi,
    ]
image: https://refine.dev/img/refine_social.png
hide_table_of_contents: false
---

import missions from '@site/static/img/blog/2022-03-01-refine-invoice-generator-p2/missions.png';
import invoice from '@site/static/img/blog/2022-03-01-refine-invoice-generator-p2/invoice.png';
import mission_page from '@site/static/img/blog/2022-03-01-refine-invoice-generator-p2/mission_page.png';
import mission_create from '@site/static/img/blog/2022-03-01-refine-invoice-generator-p2/mission_create.gif';
import invoice_list from '@site/static/img/blog/2022-03-01-refine-invoice-generator-p2/invoice_list.png';
import create_invoice from '@site/static/img/blog/2022-03-01-refine-invoice-generator-p2/create_invoice.gif';
import invoice_pdf from '@site/static/img/blog/2022-03-01-refine-invoice-generator-p2/invoice_pdf.gif';

Looking for an invoice generator that is easy to use and lets you customize your invoices? With **refine** simple and intuitive interface, you can create your own invoices in few hours. Plus, we offer a wide range of templates and customization options so you can get the exact look you want. Learn more about our invoice generator here!

<!--truncate-->

## Introduction

We are almost ready to launch our **refine** Invoice Generator. In this Part II article, we'll customize it just a little more and then take an in-depth look at what you can do with the finished **refine** product!

In this part, we will create a missions part for the services your company provides. Then we will create our invoice page using these missions and the clients and contacts we created in Part I. In addition, you will not only be able to create your invoices, but you will also be able to view and download these invoices as PDF.

:::caution
This article is written as a continuation of our [Develop your Own Customizable Invoice Generator with Refine](https://refine.dev/blog/refine-react-admin-invoice-genarator/) article. If you have not read Part I, we recommend that you read Part I before reading this article.
:::

Let's see together how easily and in a short time we can develop our project with its refine features.

## Create New Strapi Collections

In our Part I article, we created our company, contact and client collections. In this section, let's create the `Missions` and `Invoice` [Strapi](https://strapi.io/) collections for the missions and invoices pages.

`Mission Collection:`

-   Mission(Mission Title): Text
-   Mission_description: Text
-   Day: Number
-   Daily_rate: Number

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={missions} alt="Strapi Mission Collection" />
</div>
<br />

`Invoice Collection:`

-   Name: Text
-   Date: Date
-   Company : Relation with Company
-   Discount : Number
-   Tax: Number
-   Custom_id: Text
-   Contact: Relation with Contact
-   Missions: Relation with Mission

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={invoice} alt="Strapi Mission Collection" />
</div>
<br />

We created our missions and invoice collections fields. Our goal here is to define the products or services you offer specifically to your company and to create invoices based on them. By determining how many working days a product or service will last and its price on a daily basis, the total will be automatically reflected on your invoice. Now let's create our **refine** Missions page using this collection. And let's understand better by creating an example missions with **refine**.

## Refine Missions Page

Let's use the refine-antd package's [useTable](https://refine.dev/docs/ui-frameworks/antd/hooks/table/useTable/) hook to create our page, and let's define the fields in our Table Component.

```tsx title="src/pages/MissionList.tsx"
import {
    List,
    Table,
    useTable,
    TagField,
    useModalForm,
    EditButton,
} from "@pankod/refine-antd";

import { IMission } from "interfaces";

export const MissionList: React.FC = () => {
    //highlight-next-line
    const { tableProps } = useTable<IMission>();

    return (
        <List>
            <Table {...tableProps}>
                //highlight-start
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="mission" title="Mission" />
                <Table.Column
                    dataIndex="mission_description"
                    title="Mission Description"
                />
                <Table.Column dataIndex="day" title="Day(s)" />
                <Table.Column
                    dataIndex="daily_rate"
                    title="Daily Rate"
                    render={(value) => <TagField value={value} color="red" />}
                />
                <Table.Column<IMission>
                    title="Total"
                    render={(_, record) => {
                        return (
                            <TagField
                                value={`${record.daily_rate * record.day} $`}
                                color="green"
                            />
                        );
                    }}
                />
                <Table.Column<IMission>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
                        <EditButton
                            hideText
                            size="small"
                            recordItemId={record.id}
                            onClick={() => editShow(record.id)}
                        />
                    )}
                />
                //highlight-end
            </Table>
        </List>
    );
};
```

We defined the fields we created on the strapi side with the **refine** Table and created our table. Let's take a look at how our table looks like.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={mission_page} alt="Refine Missions Page" />
</div>
<br />

As you can see, we were able to create and display our table very simply thanks to the **refine**. Let's learn how to create a Mission from our refine interface now.

### Refine Missions Create Page

Let's create a modal component for our `Mission Create` page. Let's connect our fields using Modal and Form from the `refine-antd` package.

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/components/mission/CreateMission.tsx"
import {
    //highlight-start
    Modal,
    Form,
    //highlight-end
    Input,
    ModalProps,
    FormProps,
    InputNumber,
} from "@pankod/refine-antd";

type CreateMissionProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const CreateMission: React.FC<CreateMissionProps> = ({
    modalProps,
    formProps,
}) => {
    return (
        //highlight-start
        <Modal {...modalProps} title="Create Contact">
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="mission"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="mission_description">
                    <Input />
                </Form.Item>
                <Form.Item label="Day(s)" name="day">
                    <InputNumber defaultValue={1} />
                </Form.Item>
                <Form.Item label="Daily Rate" name="daily_rate">
                    <InputNumber defaultValue={1} />
                </Form.Item>
            </Form>
        </Modal>
        //highlight-end
    );
};
```

</p>
</details>

Let's define the `CreateMission` component we created above in our `MissionList` and fill its props with **refine** [**useModalForm**](https://refine.dev/docs/ui-frameworks/antd/hooks/form/useModalForm/).

```tsx title="src/pages/MissionList.tsx"
import {
    List,
    Table,
    useTable,
    TagField,
    useModalForm,
} from "@pankod/refine-antd";

import { IMission } from "interfaces";
import { CreateMission, EditMission } from "components/mission";

export const MissionList: React.FC = () => {
    const { tableProps } = useTable<IMission>();

    //highlight-start
    const { formProps, modalProps, show } = useModalForm({
        resource: "missions",
        action: "create",
    });
    //highlight-end

    return (
        <>
            <List
                //highlight-start
                createButtonProps={{
                    onClick: () => {
                        show();
                    },
                }}
                //highlight-end
            >
                <Table {...tableProps}>
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="mission" title="Mission" />
                    <Table.Column
                        dataIndex="mission_description"
                        title="Mission Description"
                    />
                    <Table.Column dataIndex="day" title="Day(s)" />
                    <Table.Column
                        dataIndex="daily_rate"
                        title="Daily Rate"
                        render={(value) => (
                            <TagField value={value} color="red" />
                        )}
                    />
                    <Table.Column<IMission>
                        title="Total"
                        render={(_, record) => {
                            return (
                                <TagField
                                    value={`${
                                        record.daily_rate * record.day
                                    } $`}
                                    color="green"
                                />
                            );
                        }}
                    />
                </Table>
            </List>
            //highlight-start
            <CreateMission modalProps={modalProps} formProps={formProps} />
            //highlight-end
        </>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={mission_create} alt="Refine Mission Create Page" />
</div>
<br />

Missions Page is now ready, you can create and manage your business's products or services here with **refine**.

Our next step is to create invoices according to these tasks and clients. Let's create, organize and display invoices with **refine**.

## Refine Invoices Page

Let's put the `Invoice Collections` fields that we created with Strapi into our Table by fetch the refine-antd useTable. Our Invoice collection has a relation with the client, company and missions collections.

Thanks to the [refine-strapi-v4 dataProvider](https://refine.dev/docs/guides-and-concepts/data-provider/strapi-v4/#relations-population), we can use the data of collections that are related to each other.

In order to use the fields of the collections that are related to each other, we must populate the collections in `metaData`.

Populate the contacts, companies and missions related with our Invoice collection in metaData.

<details>
<summary>Show Code</summary>

<p>

```tsx title="src/pages/InvoiceList.tsx"
import {
    List,
    Table,
    useTable,
    DateField,
    TagField,
    EmailField,
    Space,
    DeleteButton,
    EditButton,
    Icons,
    Button,
    Modal,
} from "@pankod/refine-antd";

import { IInvoice } from "interfaces";
import { PdfLayout } from "components/pdf";

const { FilePdfOutlined } = Icons;

export const InvoiceList: React.FC = () => {
    //highlight-start
    const { tableProps } = useTable<IInvoice>({
        metaData: {
            populate: {
                contact: { populate: ["client"] },
                company: { populate: ["logo"] },
                missions: "*",
            },
        },
    });
    //highlight-end

    return (
        <>
            <List>
                <Table {...tableProps}>
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column<IInvoice>
                        dataIndex="name"
                        title="Invoice Name"
                        render={(_, record) => {
                            return `Invoice_#${record.id}${record.name}`;
                        }}
                    />
                    <Table.Column<IInvoice>
                        dataIndex="date"
                        title="Invoice Date"
                        render={(value) => (
                            <DateField format="LL" value={value} />
                        )}
                    />
                    <Table.Column
                        dataIndex={["company", "name"]}
                        title="Your Company"
                    />
                    <Table.Column
                        dataIndex={"missions"}
                        title="Missions"
                        render={(value) => {
                            return value.map((item: any) => {
                                return (
                                    <TagField
                                        color="blue"
                                        value={item.mission}
                                    />
                                );
                            });
                        }}
                    />
                    <Table.Column
                        dataIndex="discount"
                        title="Discount(%)"
                        render={(value) => (
                            <TagField color="blue" value={value} />
                        )}
                    />
                    <Table.Column
                        dataIndex="tax"
                        title="Tax(%)"
                        render={(value) => (
                            <TagField color="cyan" value={value} />
                        )}
                    />
                    <Table.Column
                        dataIndex="custom_id"
                        title="Custom Invoice ID"
                    />

                    <Table.Column
                        dataIndex={["contact", "email"]}
                        title="Contact"
                        render={(value) => <EmailField value={value} />}
                    />
                    <Table.Column<IInvoice>
                        title="Actions"
                        dataIndex="actions"
                        render={(_, record) => {
                            return (
                                <Space>
                                    <EditButton
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                    <DeleteButton
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                </Space>
                            );
                        }}
                    />
                </Table>
            </List>
        </>
    );
};
```

</p>
</details>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={invoice_list} alt="Refine Invoice List Page" />
</div>
<br />

As you can see, we were able to list invoices with **refine**. Using the Invoice collection and the fields associated with it, we can create a fully featured Invoice.

Our invoice contains all the information. With `Refine Invoice Generator` you can define the company issuing the invoice, discount percentage, tax percentage, customId and similar information in a single invoice.

Let's understand better by creating an invoice example from our **refine** UI.

### Refine Create Invoice Page

Here, we first fetch the company, contacts and missions using the **refine**'s [useSelect](https://refine.dev/docs/ui-frameworks/antd/hooks/field/useSelect/) hook, and by giving it to the Select component, we create selectable components to detail our invoice.

Then, we fill our refine [Create](https://refine.dev/docs/ui-frameworks/antd/components/basic-views/create/) and Form components with the fields of the collection in the strap to perform a creation process as we did in our previous examples.

<details>
<summary>Show Code</summary>

<p>

```tsx title="src/pages/invoice/CreateInvoice"
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    Create,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
    DatePicker,
} from "@pankod/refine-antd";

import { ICompany, IContact, IMission, IInvoice } from "interfaces";

export const CreateInvoice: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IInvoice>();

    const { selectProps: companySelectProps } = useSelect<ICompany>({
        resource: "companies",
        optionLabel: "name",
    });

    const { selectProps: contactSelectProps } = useSelect<IContact>({
        resource: "contacts",
        optionLabel: "first_name",
    });

    const { selectProps: missionSelectProps } = useSelect<IMission>({
        resource: "missions",
        optionLabel: "mission",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Invoice Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Select Your Company"
                    name="company"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...companySelectProps} />
                </Form.Item>

                <Form.Item
                    label="Mission"
                    name="missions"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...missionSelectProps} mode="multiple" />
                </Form.Item>
                <Form.Item label="Discount(%)" name="discount">
                    <Input />
                </Form.Item>
                <Form.Item label="Tax(%)" name="tax">
                    <Input />
                </Form.Item>
                <Form.Item label="Custom ID" name="custom_id">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Contact"
                    name="contact"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...contactSelectProps} />
                </Form.Item>
                <Form.Item label="Invoice Date" name="date">
                    <DatePicker style={{ width: "50%" }} />
                </Form.Item>
            </Form>
        </Create>
    );
};
```

</p>
</details>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={create_invoice} alt="Refine Invoice Create" />
</div>
<br />

Our invoice generator is almost ready! As you can see, we can now create a fully featured invoice with **refine** and display it in our table. As the last step, let's view and download the invoices we created as PDF.

## View and Download Invoice as PDF

In this example, we will use the [KendoReact PDF](https://www.telerik.com/kendo-react-ui/components/pdfprocessing/) package to view as PDF. Let's start our process by installing our package.

Let's start our process by installing our package.

### Installation

```bash
npm i @progress/kendo-react-pdf
```

### Usage

To begin, let's create a pdf layout and add props to receive the data in our Invoice List.

```tsx title="src/components/pdf/PdfLayout.tsx"
import { useRef } from "react";

import "./pdf.css";
//highlight-next-line
import { PDFExport } from "@progress/kendo-react-pdf";
import { IInvoice } from "interfaces";

//highlight-start
type PdfProps = {
    record: IInvoice | undefined;
};
//highlight-end

export const PdfLayout: React.FC<PdfProps> = ({ record }) => {
    return <></>;
};
```

Let's create a button to display our PDF arrangement in the Invoice List, as well as a modal component for this field to appear.

```tsx title="src/pages/invoice/InvoiceList.tsx"
import { useState } from "react";
//highlight-next-line
import { useModal } from "@pankod/refine-core";
import {
    List,
    Table,
    useTable,
    DateField,
    TagField,
    EmailField,
    Space,
    DeleteButton,
    EditButton,
    Icons,
    Button,
    Modal,
} from "@pankod/refine-antd";

import { IInvoice } from "interfaces";
import { PdfLayout } from "components/pdf";

const { FilePdfOutlined } = Icons;

export const InvoiceList: React.FC = () => {
    //highlight-next-line
    const [record, setRecord] = useState<IInvoice>();

    const { tableProps } = useTable<IInvoice>({
        metaData: {
            populate: {
                contact: { populate: ["client"] },
                company: { populate: ["logo"] },
                missions: "*",
            },
        },
    });

    //highlight-next-line
    const { show, visible, close } = useModal();

    return (
        <>
            <List>
                <Table {...tableProps}>
                    ...
                    <Table.Column<IInvoice>
                        title="Actions"
                        dataIndex="actions"
                        render={(_, record) => {
                            return (
                                <Space>
                                    <EditButton
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                    <DeleteButton
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                    //highlight-start
                                    <Button
                                        size="small"
                                        icon={<FilePdfOutlined />}
                                        onClick={() => {
                                            setRecord(record);
                                            show();
                                        }}
                                    />
                                    //highlight-end
                                </Space>
                            );
                        }}
                    />
                </Table>
            </List>
            //highlight-start
            <Modal visible={visible} onCancel={close} width={700} footer={null}>
                <PdfLayout record={record} />
            </Modal>
            //highlight-end
        </>
    );
};
```

We`ve created a button in our Invoice List and when this button is pressed, we show the Modal component that contains the PdfLayout we created. Finally, as you can see, we passed the record data in the Invoice List as PdfLayout props.

Now that we have the data of the Invoices we can edit the PdfLayout.

<details>
<summary>Show Code</summary>

<p>

```tsx title="src/components/pdf/PdfLayout.tsx"
import { useRef } from "react";
import { ExportButton } from "@pankod/refine-antd";

import "./pdf.css";

//highlight-next-line
import { PDFExport } from "@progress/kendo-react-pdf";
import { IInvoice } from "interfaces";
import { API_URL } from "../../constants";

type PdfProps = {
    record: IInvoice | undefined;
};

export const PdfLayout: React.FC<PdfProps> = ({ record }) => {
    //highlight-start
    const pdfExportComponent = useRef<any>();

    const handleExportWithComponent = () => {
        pdfExportComponent?.current?.save();
    };
    //highlight-end

    const total = record?.missions.reduce((prev: any, cur: any): any => {
        return prev + cur.day * cur.daily_rate;
    }, 0);

    return (
        <div>
            <div className="page-container hidden-on-narrow">
                //highlight-start
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
                                <tr className="infoTable">
                                    <th>Mission</th>
                                    <th>Day(s)</th>
                                    <th>Day Rate</th>
                                    <th>Total</th>
                                </tr>
                                {record?.missions.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.mission}</td>
                                            <td>{item.day}</td>
                                            <td>{item.daily_rate}</td>
                                            <td>
                                                {item.daily_rate * item.day}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </table>
                        </div>
                        <div className="from" style={{ marginTop: 48 }}>
                            <p>SUBTOTAL: {total}</p>
                            <p>Discount(%): {record?.discount}</p>
                            <p>Tax(%): {record?.tax}</p>
                            <p>
                                Total($):
                                {total +
                                    (total * record?.tax!!) / 100 -
                                    (total * record?.discount!!) / 100}
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
                //highlight-end
            </div>
            <div
                style={{
                    marginTop: 16,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                //highlight-start
                <ExportButton onClick={handleExportWithComponent}>
                    Download Invoice
                </ExportButton>
                //highlight-end
            </div>
        </div>
    );
};
```

</p>
</details>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={invoice_pdf} alt="Refine Invoice PDF Export" />
</div>
<br />

## Live CodeSandbox Example

-   `Username`: demo
-   `Password`: demodemo

:::note
PDF download may not work in codeSandbox mode. With [**this**](https://n59710.csb.app/invoices) link, you can open the example in the browser and try it.
:::

<iframe src="https://codesandbox.io/embed/refine-invoice-genarator-n59710?autoresize=1&fontsize=14&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-invoice-generator"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Conclusion

In this post, we've created a fully customizable and completely functional Invoice Generator app. If you want to construct an application similar to this, you may add any feature with **refine** and personalize your invoice generator to your liking. We developed in very short amount of time, thanks to **refine**'s features and the possibilities it provides for customization.

You can develop any web application or admin panel you want in a very short time with **refine**.

With **refine**'s headless and SSR-Next.js features, it is possible and very easy to develop both **B2B** and **B2C** applications using a single framework.
