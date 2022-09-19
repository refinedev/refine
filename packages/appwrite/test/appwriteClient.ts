import { Client as Appwrite, Account } from "appwrite";

const APPWRITE_URL = "https://matej10qa.appwrite.org/v1";
const APPWRITE_PROJECT = "6324555073b9706cb1f5";

const client = new Appwrite();

client.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(client);

export { client, account };
