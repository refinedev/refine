import React, { useMemo, useState } from "react";
import { useForm, useModalForm } from "@pankod/refine-react-hook-form";
import CountrySelect from "@components/checkout/CountrySelect/CountrySelect";
import { Modal, Input } from "@components";
import { Plus } from "@icons";
import { LoadingDots } from "@components";
import { useCreate } from "@pankod/refine-core";

type FormValues = {
    first_name: string;
    last_name: string;
    city: string;
    country_code: string;
    postal_code: string;
    province?: string;
    address_1: string;
    address_2?: string;
    phone?: string;
    company?: string;
};

const AddAddress: React.FC = () => {
    const [submitting, setSubmitting] = useState(false);

    const {
        modal: { show, visible, close },
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useModalForm<FormValues>({
        refineCoreProps: { action: "create" },
        warnWhenUnsavedChanges: false,
    });

    const { mutate } = useCreate();

    const handleClose = () => {
        reset({
            first_name: "",
            last_name: "",
            city: "",
            country_code: "",
            postal_code: "",
            address_1: "",
            address_2: "",
            company: "",
            phone: "",
            province: "",
        });
        close();
    };

    const submit = handleSubmit(async (data: any) => {
        setSubmitting(true);

        const payload = {
            first_name: data.first_name,
            last_name: data.last_name,
            company: data.company || "",
            address_1: data.address_1,
            address_2: data.address_2 || "",
            city: data.city,
            country_code: data.country_code,
            province: data.province || "",
            postal_code: data.postal_code,
            phone: data.phone || "",
            metadata: {},
        };

        mutate({
            resource: "customers/me/shipping_addresses",
            values: payload,
        });
    });
    console.log("rerendering");

    return (
        <>
            <button
                className="border border-gray-200 p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
                onClick={() => show()}
            >
                <span className="text-base-semi">New address</span>
                <Plus size={24} />
            </button>
            {visible && (
                <Modal onClose={handleClose}>
                    <form
                        onSubmit={submit}
                        className="grid grid-cols-1 gap-y-2"
                    >
                        <div className="text-xl-semi mb-2">Add address</div>
                        <div className="grid grid-cols-2 gap-x-2">
                            <div className="flex flex-col">
                                <div className="text-base-semi">First name</div>
                                <Input
                                    {...register("first_name", {
                                        required: "First name is required",
                                    })}
                                />
                                {errors && (
                                    <div className="text-rose-500 text-small-regular">
                                        {
                                            errors.first_name
                                                ?.message as React.ReactNode
                                        }
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <div className="text-base-semi">Last name</div>
                                <Input
                                    {...register("last_name", {
                                        required: "Last name is required",
                                    })}
                                />
                                {errors && (
                                    <div className="text-rose-500 text-small-regular">
                                        {
                                            errors.last_name
                                                ?.message as React.ReactNode
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-base-semi">Company</div>
                            <Input {...register("company")} />
                            {errors && (
                                <div className="text-rose-500 text-small-regular">
                                    {errors.company?.message as React.ReactNode}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <div className="text-base-semi">Address</div>
                            <Input
                                {...register("address_1", {
                                    required: "Address is required",
                                })}
                            />
                            {errors && (
                                <div className="text-rose-500 text-small-regular">
                                    {
                                        errors.address_1
                                            ?.message as React.ReactNode
                                    }
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-base-semi">
                                Apartment, suite, etc
                            </div>
                            <Input {...register("address_2")} />
                        </div>
                        <div className="grid grid-cols-[144px_1fr] gap-x-2">
                            <div className="flex flex-col">
                                <div className="text-base-semi">
                                    Postal code
                                </div>
                                <Input
                                    {...register("postal_code", {
                                        required: "Postal code is required",
                                    })}
                                />
                                {errors && (
                                    <div className="text-rose-500 text-small-regular">
                                        {
                                            errors.postal_code
                                                ?.message as React.ReactNode
                                        }
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <div className="text-base-semi">City</div>
                                <Input
                                    {...register("city", {
                                        required: "City is required",
                                    })}
                                />
                                {errors && (
                                    <div className="text-rose-500 text-small-regular">
                                        {
                                            errors.city
                                                ?.message as React.ReactNode
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-base-semi">
                                Province / State
                            </div>
                            <Input
                                className=" mb-2"
                                {...register("province")}
                            />
                            <CountrySelect
                                {...register("country_code", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-base-semi">Phone</div>
                            <Input {...register("phone")} />
                            {errors && (
                                <div className="text-rose-500 text-small-regular">
                                    {errors.phone?.message as React.ReactNode}
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <button
                                className="!bg-gray-200 !text-gray-900 !border-gray-200 min-h-0"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="min-h-0"
                                disabled={submitting}
                            >
                                Save
                                {submitting && <LoadingDots />}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
};

export default AddAddress;
