import { NavigateToResource } from "@refinedev/nextjs-router";
import { ExtendedNextPage } from "./_app";

const Home: ExtendedNextPage = () => {
    return <NavigateToResource resource="blog_posts" />;
};

export default Home;

Home.noLayout = true;
