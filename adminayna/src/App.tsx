import { Admin, Resource, AuthProvider, ILoginForm } from "@pankod/refine";
import dataProvider from "@pankod/refine-nestjsx-crud";
import axios from "axios";

import {
    PrizesList,
    PrizesCreate,
    PrizeEdit,
    PrizeShow,
} from "./components/pages/prizes";
import {
    UsersList,
    UsersEdit,
    UsersCreate,
    UsersShow,
} from "./components/pages/users";
import {
    PromotionCodesEdit,
    PromotionCodesList,
    PromotionCodesCreate,
    PromotionCodesShow,
} from "./components/pages/promotion-codes";
import { GamesList, GameShow } from "./components/pages/games";

const axiosInstance = axios.create();

const authProvider: AuthProvider = {
    login: async (params: ILoginForm) => {
        const result = await axios.post(
            "https://api.turkcell-ayna-ayna.puul.tv/auth/login",
            {
                username: params.username,
                password: params.password,
            },
        );
        if (result.data.token) {
            localStorage.setItem("token", result.data.token);
            axiosInstance.defaults.headers = {
                Authorization: `Bearer ${result.data.token}`,
            };
            return Promise.resolve();
        }

        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem("token");
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        if (localStorage.getItem("token")) {
            axiosInstance.defaults.headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    },
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () =>
        Promise.resolve({
            id: 1,
            fullName: "Jane Doe",
            avatar:
                "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
};

const MenuHeader = () => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#FFFFFF",
            paddingTop: 20,
        }}
    >
        <img src={"/images/logo.svg"} />
        <div style={{ marginTop: 15, fontSize: 18, textAlign: "center" }}>Ayna Ayna</div>
    </div>
);

function App() {
    return (
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider(
                "https://api.turkcell-ayna-ayna.puul.tv/admin",
                axiosInstance,
            )}
            title={<MenuHeader />}
        >
            <Resource
                name="prizes"
                list={PrizesList}
                edit={PrizeEdit}
                create={PrizesCreate}
                show={PrizeShow}
                canDelete
            />
            <Resource
                name="users"
                list={UsersList}
                edit={UsersEdit}
                create={UsersCreate}
                show={UsersShow}
                canDelete
            />
            <Resource
                name="promotion-codes"
                list={PromotionCodesList}
                edit={PromotionCodesEdit}
                create={PromotionCodesCreate}
                show={PromotionCodesShow}
                canDelete
            />
            <Resource name="games" list={GamesList} show={GameShow} />
        </Admin>
    );
}

export default App;
