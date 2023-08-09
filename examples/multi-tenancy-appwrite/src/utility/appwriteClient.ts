import { Account, Appwrite, Storage } from "@refinedev/appwrite";

const APPWRITE_URL = "https://refine.appwrite.org/v1";
const APPWRITE_PROJECT = "61caf74beffc8";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);

const resources = {
    tenant: "61cdb05132609",
    products: "61cb01b17ef57",
    orders: "61cb019fdbd11",
    databaseId: "default",
    stores: "61cd62db95f92",
} as const;

export { appwriteClient, account, storage, resources };
