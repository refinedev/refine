import { AuthPage } from "@refinedev/antd";

import { ExtendedNextPage } from "./_app";
import { useForgotPassword } from "@refinedev/core";

const ForgotPassword: ExtendedNextPage = () => {
    const { mutate: forgotPassword } = useForgotPassword();
    return (
        <AuthPage
            type="forgotPassword"
            formProps={{
                onFinish(values) {
                    forgotPassword(values);
                },
            }}
        />
    );
};

ForgotPassword.noLayout = true;

export default ForgotPassword;
