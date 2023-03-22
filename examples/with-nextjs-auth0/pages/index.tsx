import { useUser } from "@auth0/nextjs-auth0/client";
import { NavigateToResource } from "@refinedev/nextjs-router";
import { ExtendedNextPage } from "./_app";

const Home: ExtendedNextPage = () => {
    const { user, error, isLoading, checkSession } = useUser();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return <span>{JSON.stringify(user, null, 2)}</span>;
    // return <NavigateToResource resource="posts" />;
};

export default Home;

Home.noLayout = true;
