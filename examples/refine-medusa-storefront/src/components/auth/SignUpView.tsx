import { FC } from "react";
import { Controller, useForm } from "@pankod/refine-react-hook-form";

import { Info } from "@components/icons";
import { useUI } from "@components/ui/context";
import { Logo, Button, Input } from "@components/ui";
import { HttpError, useLogin } from "@pankod/refine-core";

type Customer = {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
};
const SignUpView: FC = () => {
    const { setModalView, closeModal } = useUI();

    const { mutate: login } = useLogin();
    const {
        refineCore: { onFinish, formLoading },
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Customer, HttpError, Customer>({
        refineCoreProps: {
            redirect: false,
            resource: "customers",
            onMutationSuccess: async (_, { email, password }) => {
                await login({
                    email,
                    password,
                });

                closeModal();
            },
            onMutationError(error, variables, context) {
                console.log(error);
                if (error?.response?.data.type === "duplicate_error") {
                    setError("email", {
                        message:
                            "A customer with the given email already has an account. Log in instead.",
                    });
                }
            },
        },
    });

    console.log(errors);

    return (
        <form
            className="w-80 flex flex-col justify-between p-3"
            onSubmit={handleSubmit(onFinish)}
        >
            <div className="flex justify-center pb-12 ">
                <Logo width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-4">
                {Object.keys(errors).length > 0 && (
                    <div className="text-red border border-red p-3">
                        <ul>
                            {Object.keys(errors).map((key: any) => (
                                <li key={key}>
                                    {(errors as any)[key as any].message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <Controller
                    control={control}
                    name="first_name"
                    rules={{
                        required: {
                            message: "first name is required",
                            value: true,
                        },
                    }}
                    render={({ field }) => (
                        <Input placeholder="First Name" {...field} />
                    )}
                />
                <Controller
                    control={control}
                    name="last_name"
                    rules={{
                        required: {
                            message: "last name is required",
                            value: true,
                        },
                    }}
                    render={({ field }) => (
                        <Input placeholder="Last Name" {...field} />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        /* pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])/, */
                        required: {
                            message: "email is required",
                            value: true,
                        },
                    }}
                    render={({ field }) => (
                        <Input type="email" placeholder="Email" {...field} />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: {
                            message: "password is required",
                            value: true,
                        },
                        minLength: {
                            message:
                                "Password is too short (minimum is 7 characters)",
                            value: 7,
                        },
                    }}
                    render={({ field }) => (
                        <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                        />
                    )}
                />
                <span className="text-accent-8">
                    <span className="inline-block align-middle ">
                        <Info width="15" height="15" />
                    </span>{" "}
                    <span className="leading-6 text-sm">
                        <strong>Info</strong>: Passwords must be longer than 7
                        chars and include numbers.{" "}
                    </span>
                </span>
                <div className="pt-2 w-full flex flex-col">
                    <Button variant="slim" type="submit" loading={formLoading}>
                        Sign Up
                    </Button>
                </div>

                <span className="pt-1 text-center text-sm">
                    <span className="text-accent-7">
                        Do you have an account?
                    </span>
                    {` `}
                    <a
                        className="text-accent-9 font-bold hover:underline cursor-pointer"
                        onClick={() => setModalView("LOGIN_VIEW")}
                    >
                        Log In
                    </a>
                </span>
            </div>
        </form>
    );
};

export default SignUpView;
