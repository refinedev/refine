import Link from "next/link";
import { useRouter } from "next/router";
import { ExtendedNextPage } from "./_app";

const Login: ExtendedNextPage = () => {
    const router = useRouter();
    const { to } = router.query;

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Link href={`/api/auth/login?returnTo=${to}`}>Login</Link>
        </div>
    );
};

Login.noLayout = true;

export default Login;
