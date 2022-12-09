import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    LoginPage,
    Icons,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";
import { DataProvider } from "@pankod/refine-strapi-v4";
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
        <Refine
            routerProvider={routerProvider}
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
