import clsx from "clsx";
import React, { useState } from "react";
import { useModalForm } from "@pankod/refine-react-hook-form";
import { Address } from "@medusajs/medusa";

import CountrySelect from "@components/checkout/CountrySelect/CountrySelect";
import { Trash, Edit } from "@icons";
import { LoadingDots, Modal, Input, Button, Text } from "@components";

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

type EditAddressProps = {
    address: Address;
    isActive?: boolean;
};

const EditAddress: React.FC<EditAddressProps> = ({
    address,
    isActive = false,
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const {
        modal: { show, close, visible },
        register,
        handleSubmit,
        formState: { errors },
    } = useModalForm<FormValues>({
        defaultValues: {
            first_name: address.first_name || undefined,
            last_name: address.last_name || undefined,
            city: address.city || undefined,
            address_1: address.address_1 || undefined,
            address_2: address.address_2 || undefined,
            country_code: address.country_code || undefined,
            postal_code: address.postal_code || undefined,
            phone: address.phone || undefined,
            company: address.company || undefined,
            province: address.province || undefined,
        },
    });

    const submit = handleSubmit(async (data) => {
        setSubmitting(true);
        setError(undefined);

        const payload = {
            first_name: data.first_name,
            last_name: data.last_name,
            company: data.company || "Personal",
            address_1: data.address_1,
            address_2: data.address_2 || "",
            city: data.city,
            country_code: data.country_code,
            province: data.province || "",
            postal_code: data.postal_code,
            phone: data.phone || "None",
            metadata: {},
        };

        // TODO: update address
        // medusaClient.customers.addresses
        //     .updateAddress(address.id, payload)
        //     .then(() => {
        //         setSubmitting(false);
        //         close();
        //     })
        //     .catch(() => {
        //         setSubmitting(false);
        //         setError("Failed to update address, please try again.");
        //     });
    });

    // TODO - add delete address
    // const removeAddress = () => {
    //     medusaClient.customers.addresses.deleteAddress(address.id).then(() => {
    //         refetchCustomer();
    //     });
    // };

    return (
        <>
            <div
                className={clsx(
                    "flex h-full min-h-[220px] w-full flex-col justify-between border border-gray-200 p-5 transition-colors",
                    {
                        "border-gray-900": isActive,
                    },
                )}
            >
                <div className="flex flex-col">
                    <span className="text-base-semi text-left">
                        {address.first_name} {address.last_name}
                    </span>
                    {address.company && (
                        <span className="text-small-regular text-gray-700">
                            {address.company}
                        </span>
                    )}
                    <div className="text-base-regular mt-2 flex flex-col text-left">
                        <span>
                            {address.address_1}
                            {address.address_2 && (
                                <span>, {address.address_2}</span>
                            )}
                        </span>
                        <span>
                            {address.postal_code}, {address.city}
                        </span>
                        <span>
                            {address.province && `${address.province}, `}
                            {address.country_code?.toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <button
                        className="text-small-regular flex items-center gap-x-2 text-gray-700"
                        onClick={() => show()}
                    >
                        <Edit size={16} />
                        Edit
                    </button>
                    <button
                        className="text-small-regular flex items-center gap-x-2 text-gray-700"
                        onClick={() => undefined} // TODO: removed function here
                    >
                        <Trash />
                        Remove
                    </button>
                </div>
            </div>

            {visible && (
                <Modal onClose={close}>
                    <Text>Edit address</Text>
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
                        <Text>Apartment, suite, etc.</Text>
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
                            {...register("country_code", {
                                required: true,
                            })}
                            autoComplete="country"
                        />
                        <Text>Phone</Text>
                        <Input {...register("phone")} autoComplete="phone" />
                    </div>
                    {error && (
                        <div className="text-small-regular py-2 text-rose-500">
                            {error}
                        </div>
                    )}
                    <Button onClick={close}>Cancel</Button>
                    <Button onClick={submit} disabled={submitting}>
                        Save
                        {submitting && <LoadingDots />}
                    </Button>
                </Modal>
            )}
        </>
    );
};

export default EditAddress;
