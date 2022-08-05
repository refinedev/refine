import React, { useEffect } from "react";
import { useForm, useWatch } from "@pankod/refine-react-hook-form";
import { Customer } from "@medusajs/medusa";

import Input from "@components/common/Input";
import AccountInfo from "@components/account/AccountInfo/AccountInfo";

type MyInformationProps = {
    customer: Omit<Customer, "password_hash">;
};

type UpdateCustomerEmailFormData = {
    email: string;
};

const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
    const [errorMessage, setErrorMessage] =
        React.useState<string | undefined>(undefined);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitSuccessful },
        refineCore: { onFinish, formLoading },
    } = useForm<UpdateCustomerEmailFormData>({
        defaultValues: {
            email: customer.email,
        },
        refineCoreProps: {
            resource: "customers/me",
            action: "edit",
            redirect: false,
            invalidates: ["all"],
        },
    });

    useEffect(() => {
        reset({
            email: customer.email,
        });
    }, [customer, reset]);

    const email = useWatch({
        control,
        name: "email",
    });

    return (
        <form
            onSubmit={handleSubmit((data) => {
                onFinish(data);
            })}
            className="w-full"
        >
            <AccountInfo
                label="Email"
                currentInfo={`${customer.email}`}
                isLoading={formLoading}
                isSuccess={isSubmitSuccessful}
                errorMessage={errorMessage}
                clearState={() => undefined}
            >
                <div className="grid grid-cols-1 gap-y-2">
                    <Input
                        label="Email"
                        {...register("email", {
                            required: true,
                        })}
                        defaultValue={email}
                        errors={errors}
                    />
                </div>
            </AccountInfo>
        </form>
    );
};

export default ProfileEmail;
