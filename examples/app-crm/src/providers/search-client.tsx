import algoliasearch from "algoliasearch/lite";

const APP_ID = "SIY27MS63R";
const API_KEY = "7fd59a730930ed2490543821e632aa91";

export const searchClient = algoliasearch(APP_ID, API_KEY);

export const indexName = "refine-crm";
