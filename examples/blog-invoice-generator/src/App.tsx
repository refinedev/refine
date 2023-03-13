import { GitHubBanner, Refine } from "@refinedev/core";
import { notificationProvider, Layout, LoginPage } from "@refinedev/antd";

// It is recommended to use explicit import as seen below to reduce bundle size.
// import { IconName } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";

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

const {
    FileAddOutlined,
    UserAddOutlined,
    TeamOutlined,
    InfoCircleOutlined,
    SlidersOutlined,
} = Icons;

function App() {
    const dataProvider = DataProvider(API_URL + "/api", axiosInstance);

    return (
        <>
            <GitHubBanner />
            <Refine
                legacyRouterProvider={routerProvider}
                notificationProvider={notificationProvider}
                Layout={Layout}
                dataProvider={dataProvider}
                legacyAuthProvider={authProvider}
                LoginPage={LoginPage}
                resources={[
                    {
                        name: "companies",
                        meta: { label: "Company" },
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
        </>
    );
}

export default App;
