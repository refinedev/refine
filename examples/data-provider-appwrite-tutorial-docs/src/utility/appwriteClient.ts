import { Account, Appwrite, Storage } from "@refinedev/appwrite";

const APPWRITE_URL = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = "6537bcde069d747b2abf";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);

export { appwriteClient, account, storage };

/* const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6537bcde069d747b2abf'); */
