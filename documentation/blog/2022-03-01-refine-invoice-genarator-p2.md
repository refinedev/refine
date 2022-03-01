---
title: Create The Best Invoice Generator for Your Business with Refine and Strapi  | Part II
description: Looking for an invoice generator? Try out Refine. With our custom interface, you can build your own invoice in minutes! Learn more here.
slug: refine-react-admin-invoice-genarator-pt2
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

Looking for an invoice generator that is easy to use and lets you customize your invoices? With **refine** simple and intuitive interface, you can create your own invoices in few hours. Plus, we offer a wide range of templates and customization options so you can get the exact look you want. Learn more about our invoice generator here!

<!--truncate-->

We are almost ready to launch our **refine** Invoice Genarator. In this Part II article, we'll customize it just a little more and then take an in-depth look at what you can do with the finished **refine** product!

In this part, we will create a missions part for the services your company provides. Then we will create our invoice page using these missions and the clients and contacts we created in Part I. In addition, you will not only be able to create your invoices, but you will also be able to view and download these invoices as PDF.

:::caution
This article is written as a continuation of our [Develop your Own Customizable Invoice Generator with Refine](https://refine.dev/blog/refine-react-admin-invoice-genarator/) article. If you have not read Part I, we recommend that you read Part I before reading this article.
:::

Let's see together how easily and in a short time we can develop our project with its refined features.

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

Let's create our page by using the [useTable](https://refine.dev/docs/ui-frameworks/antd/hooks/table/useTable/) hook from our `refine-antd` package and defining the fields in our Table Component.

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

As you can see, thanks to the **refine**, we created and displayed our table very simply. Now let's learn how we can create a Missions from our refine interface.

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
