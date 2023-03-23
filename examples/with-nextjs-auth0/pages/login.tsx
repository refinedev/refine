import Link from "next/link";
import { ExtendedNextPage } from "./_app";

const Login: ExtendedNextPage = () => {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Link href="/api/auth/login">Login</Link>
        </div>
    );
};

Login.noLayout = true;

export default Login;
