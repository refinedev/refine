import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

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
            <button
                onClick={() =>
                    signIn(undefined, {
                        callbackUrl: to ? to.toString() : "/",
                        redirect: true,
                    })
                }
            >
                Login
            </button>
        </div>
    );
};

Login.noLayout = true;

export default Login;
