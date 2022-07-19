import { getSearchStaticProps } from "@lib/search-props";
import type { GetStaticPathsResult, GetStaticPropsContext } from "next";
import Search from "@components/search";

export async function getStaticProps(context: GetStaticPropsContext) {
    return getSearchStaticProps(context);
}

export function getStaticPaths(): GetStaticPathsResult {
    return {
        paths: [],
        fallback: "blocking",
    };
}

export default Search;
