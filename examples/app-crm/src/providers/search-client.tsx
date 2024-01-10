import algoliasearch from "algoliasearch/lite";

const ALGOLIA_APP_ID = import.meta.env.VITE_ALGOLIA_APP_ID;

const ALGOLIA_API_KEY = import.meta.env.VITE_ALGOLIA_API_KEY;

const isAlgoliaEnabled = ALGOLIA_APP_ID && ALGOLIA_API_KEY;

export const searchClient = isAlgoliaEnabled
    ? algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    : false;

export const indexName = "refine-crm";
