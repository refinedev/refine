import dataProvider from "@pankod/refine-simple-rest";

export { NextRouteComponent as default } from "@pankod/refine";

const API_URL = "https://api.fake-rest.refine.dev";

export async function getServerSideProps() {
    const data = await dataProvider(API_URL).getList("users", {});
    return {
        props: { users: data },
    };
}
