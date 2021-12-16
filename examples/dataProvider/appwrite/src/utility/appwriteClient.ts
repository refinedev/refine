import { Appwrite } from "appwrite";

const APPWRITE_URL = "http://localhost/v1";
const APPWRITE_PROJECT = "6180e3c470b7f";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

export { appwriteClient };
