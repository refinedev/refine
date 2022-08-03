import React, { useState } from "react";
import { useModalForm } from "@pankod/refine-react-hook-form";
import CountrySelect from "@components/checkout/CountrySelect/CountrySelect";
import { Modal, Input, Button, Text } from "@components";
import { Plus } from "@icons";
import { LoadingDots } from "@components";

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
    const [error, setError] = useState<string | undefined>(undefined);

    const {
        modal: { show, close },
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useModalForm<FormValues>();

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
        setError(undefined);

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

        // TODO: mutate submit address to backend API
    });

    return (
        <>
            <button
                className="border border-gray-200 p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
                onClick={() => show()}
            >
                <span className="text-base-semi">New address</span>
                <Plus size={24} />
            </button>

            <Modal onClose={handleClose}>
                <Text>Add address</Text>

                <div>
                    <div className="grid grid-cols-1 gap-y-2">
                        <div className="grid grid-cols-2 gap-x-2">
                            <Text>First name</Text>
                            <Input
                                {...register("first_name", {
                                    required: "First name is required",
                                })}
                                required
                                autoComplete="given-name"
                            />
                            <Text>Last name</Text>
                            <Input
                                {...register("last_name", {
                                    required: "Last name is required",
                                })}
                                required
                                autoComplete="family-name"
                            />
                        </div>
                        <Text>Company</Text>
                        <Input {...register("company")} />
                        <Text>Address</Text>
                        <Input
                            {...register("address_1", {
                                required: "Address is required",
                            })}
                            required
                            autoComplete="address-line1"
                        />
                        <Text>Apartment, suite, etc</Text>
                        <Input
                            {...register("address_2")}
                            autoComplete="address-line2"
                        />
                        <div className="grid grid-cols-[144px_1fr] gap-x-2">
                            <Text>Postal code</Text>
                            <Input
                                {...register("postal_code", {
                                    required: "Postal code is required",
                                })}
                                required
                                autoComplete="postal-code"
                            />
                            <Text>City</Text>
                            <Input
                                {...register("city", {
                                    required: "City is required",
                                })}
                                required
                                autoComplete="locality"
                            />
                        </div>
                        <Text>Province / State</Text>
                        <Input
                            {...register("province")}
                            autoComplete="address-level1"
                        />
                        <CountrySelect
                            {...register("country_code", { required: true })}
                            autoComplete="country"
                        />
                        <Text>Phone</Text>
                        <Input {...register("phone")} autoComplete="phone" />
                    </div>
                    {error && (
                        <div className="text-rose-500 text-small-regular py-2">
                            {error}
                        </div>
                    )}
                </div>
                <Button
                    className="!bg-gray-200 !text-gray-900 !border-gray-200 min-h-0"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    className="min-h-0"
                    onClick={submit}
                    disabled={submitting}
                >
                    Save
                    {submitting && <LoadingDots />}
                </Button>
            </Modal>
        </>
    );
};

export default AddAddress;
