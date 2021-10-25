import { useRefineContext } from "@pankod/refine";

const Login = () => {
    const { LoginPage } = useRefineContext();
    return LoginPage ? <LoginPage /> : null;
};
export default Login;
