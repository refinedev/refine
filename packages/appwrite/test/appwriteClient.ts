import { Client as Appwrite, Account } from "appwrite";

const APPWRITE_URL = "http://localhost/v1";
const APPWRITE_PROJECT = "6180e3c470b7f";

const client = new Appwrite();

client.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(client);

export { client, account };
