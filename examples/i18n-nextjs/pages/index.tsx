import { NavigateToResource } from "@refinedev/nextjs-router";

export default function Home() {
    return <NavigateToResource resource="posts" />;
}

Home.noLayout = true;
