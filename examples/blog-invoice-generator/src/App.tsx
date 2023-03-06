import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, LoginPage } from "@refinedev/antd";
import {
    FileAddOutlined,
    UserAddOutlined,
    TeamOutlined,
    InfoCircleOutlined,
    SlidersOutlined,
} from "@ant-design/icons";
import routerProvider from "@refinedev/react-router-v6/legacy";
import "@refinedev/antd/dist/reset.css";
import { DataProvider } from "@refinedev/strapi-v4";
import { authProvider, axiosInstance } from "./authProvider";

import { CompanyList } from "pages/company";
import { ClientList } from "pages/client";
import { ContactsList, EditContact } from "pages/contacts";
import { InvoiceList, CreateInvoice, EditInvoice } from "pages/invoice";
import { MissionList } from "pages/mission";

import { API_URL } from "../src/constants";

function App() {
    const dataProvider = DataProvider(API_URL + "/api", axiosInstance);

    return (
        <Refine
            legacyRouterProvider={routerProvider}
            notificationProvider={notificationProvider}
            Layout={Layout}
            dataProvider={dataProvider}
            authProvider={authProvider}
            LoginPage={LoginPage}
            resources={[
                {
                    name: "companies",
                    options: { label: "Company" },
                    list: CompanyList,
                    icon: <InfoCircleOutlined />,
                },
                {
                    name: "clients",
                    list: ClientList,
                    icon: <TeamOutlined />,
                },
                {
                    name: "contacts",
                    list: ContactsList,
                    edit: EditContact,
                    icon: <UserAddOutlined />,
                },
                {
                    name: "missions",
                    list: MissionList,
                    icon: <SlidersOutlined />,
                },
                {
                    name: "invoices",
                    list: InvoiceList,
                    create: CreateInvoice,
                    edit: EditInvoice,
                    icon: <FileAddOutlined />,
                },
            ]}
        />
    );
}

export default App;
