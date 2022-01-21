import { AuthProvider } from "@pankod/refine-core";
import Web3 from "web3";
import Web3Modal from "web3modal";

import { getBalance } from "./utility";

export const TOKEN_KEY = "refine-auth";

const providerOptions = {};
const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
});

let provider: any | null = null;

export const authProvider: AuthProvider = {
    login: async () => {
        if (window.ethereum) {
            provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            localStorage.setItem(TOKEN_KEY, accounts[0]);
            return Promise.resolve();
        } else {
            return Promise.reject(
                new Error(
                    "Not set ethereum wallet or invalid. You need to install Metamask",
                ),
            );
        }
    },
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        if (provider && provider.close) {
            await provider.close;

            provider = null;
            await web3Modal.clearCachedProvider();
        }
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const address = localStorage.getItem(TOKEN_KEY);
        if (!address) {
            return Promise.reject();
        }

        const balance = await getBalance(address);

        return Promise.resolve({
            address,
            balance,
        });
    },
};
