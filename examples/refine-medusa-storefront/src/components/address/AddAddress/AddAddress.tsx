import React, { useContext, useState } from "react";
import { useCreate, useList } from "@pankod/refine-core";
import { useModalForm } from "@pankod/refine-react-hook-form";
import { Country, Region } from "@medusajs/medusa";

import { Modal, Button } from "@components";
import { Plus } from "@icons";
import { LoadingDots } from "@components";
import Input from "@components/common/Input";
import NativeSelect from "@components/common/NativeSelect";
import { CartContext } from "@lib/context";

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
        formState: { errors, touchedFields },
        reset,
    } = useModalForm<FormValues>({
        reValidateMode: "onChange",
        mode: "onTouched",
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
            address: {
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
            },
        };

        mutate(
            {
                resource: "customers/me/addresses",
                values: payload,
            },
            {
                onSuccess: () => {
                    setSubmitting(false);
                    handleClose();
                },
            },
        );
    });
    const { cartId } = useContext(CartContext);

    const { data: regions } = useList<Region>({
        resource: "regions",
    });

    const countriesByRegion = regions?.data.map((region) => region.countries);

    const countries =
        countriesByRegion &&
        ([] as Country[]).concat(...(countriesByRegion ?? []));

    return (
        <>
            <button
                className="flex h-full min-h-[220px] w-full flex-col justify-between border border-gray-200 p-5"
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
                        <div className="grid grid-flow-row grid-cols-12 gap-3">
                            <Input
                                containerClassName="col-span-6"
                                label="First name"
                                {...register("first_name", {
                                    required: {
                                        value: true,
                                        message: "first name is required",
                                    },
                                })}
                                errors={errors}
                                touched={touchedFields}
                            />
                            <Input
                                containerClassName="col-span-6"
                                label="Last name"
                                {...register("last_name", {
                                    required: {
                                        value: true,
                                        message: "last name is required",
                                    },
                                })}
                                errors={errors}
                                touched={touchedFields}
                            />
                        </div>
                        <Input
                            label="Company (Optional)"
                            {...register("company")}
                            errors={errors}
                            touched={touchedFields}
                        />
                        <Input
                            label="Address"
                            {...register("address_1", {
                                required: {
                                    value: true,
                                    message: "Address is required",
                                },
                            })}
                            errors={errors}
                            touched={touchedFields}
                        />
                        <Input
                            label="Apartment, Suite, Etc. (Optional)"
                            {...register("address_2")}
                            errors={errors}
                            touched={touchedFields}
                        />
                        <div className="grid grid-flow-row grid-cols-12 gap-3">
                            <Input
                                containerClassName="col-span-6"
                                label="Postal Code"
                                {...register("postal_code", {
                                    required: {
                                        value: true,
                                        message: "postal code is required",
                                    },
                                })}
                                errors={errors}
                                touched={touchedFields}
                            />
                            <Input
                                containerClassName="col-span-6"
                                label="City"
                                {...register("city", {
                                    required: {
                                        value: true,
                                        message: "city is required",
                                    },
                                })}
                                errors={errors}
                                touched={touchedFields}
                            />
                        </div>
                        <NativeSelect
                            label="Country/Region"
                            {...register("country_code", {
                                required: {
                                    value: true,
                                    message: "country is required",
                                },
                            })}
                            errors={errors}
                            touched={touchedFields}
                        >
                            {countries?.map((country, index) => (
                                <option key={index} value={country.iso_2}>
                                    {country.display_name}
                                </option>
                            ))}
                        </NativeSelect>
                        <div className="grid grid-flow-row grid-cols-12 gap-3">
                            <Input
                                containerClassName="col-span-6"
                                label="Province"
                                {...register("province", {
                                    required: {
                                        value: true,
                                        message: "province is required",
                                    },
                                })}
                                errors={errors}
                                touched={touchedFields}
                            />
                            <Input
                                containerClassName="col-span-6"
                                label="Phone"
                                {...register("phone")}
                                errors={errors}
                                touched={touchedFields}
                            />
                        </div>
                        <div className="mt-4">
                            <Button
                                className="min-h-0 !border-gray-200 !bg-gray-200 !text-gray-900"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="min-h-0"
                                disabled={submitting}
                            >
                                Save
                                {submitting && <LoadingDots />}
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
};

export default AddAddress;
