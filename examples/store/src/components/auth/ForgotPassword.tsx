import { useForm } from "@refinedev/react-hook-form";

import { useUI } from "@lib/context";
import { emailRegex } from "@lib/regex";
import { Logo, Button, Input } from "@components";

const ForgotPassword: React.FC = () => {
    const { setModalView } = useUI();

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm();

    return (
        <form
            onSubmit={handleSubmit((values) => console.log(values))}
            className="flex w-80 flex-col justify-between p-3"
        >
            <div className="flex justify-center pb-12 ">
                <Logo width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-4">
                <Input
                    label="Email"
                    {...register("email", {
                        required: "email is required",
                        pattern: emailRegex,
                    })}
                    errors={errors}
                    touched={touchedFields}
                />
                <div className="flex w-full flex-col pt-2">
                    <Button variant="slim" type="submit">
                        Recover Password
                    </Button>
                </div>

                <span className="pt-3 text-center text-sm">
                    <span className="text-accent-7">
                        Do you have an account?
                    </span>
                    {` `}
                    <a
                        className="text-accent-9 cursor-pointer font-bold hover:underline"
                        onClick={() => setModalView("LOGIN_VIEW")}
                    >
                        Log In
                    </a>
                </span>
            </div>
        </form>
    );
};

export default ForgotPassword;
