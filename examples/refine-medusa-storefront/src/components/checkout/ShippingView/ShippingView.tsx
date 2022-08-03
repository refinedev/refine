import { FC } from "react";
import cn from "clsx";

import s from "./ShippingView.module.css";
import { UseFormRegister } from "@pankod/refine-react-hook-form";

const ShippingView: FC<{ register: UseFormRegister<any> }> = ({ register }) => {
    return (
        <form className="h-full" onSubmit={() => undefined}>
            <div className="px-4 sm:px-6 flex-1">
                <h2 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
                    Shipping
                </h2>
                <div>
                    <div className="grid gap-3 grid-flow-row grid-cols-12">
                        <div className={cn(s.fieldset, "col-span-6")}>
                            <label className={s.label}>First Name</label>
                            <input
                                className={s.input}
                                {...register("first_name", {
                                    required: {
                                        value: true,
                                        message: "first name is required",
                                    },
                                })}
                            />
                        </div>
                        <div className={cn(s.fieldset, "col-span-6")}>
                            <label className={s.label}>Last Name</label>
                            <input
                                className={s.input}
                                {...register("last_name", {
                                    required: {
                                        value: true,
                                        message: "last name is required",
                                    },
                                })}
                            />
                        </div>
                    </div>
                    <div className={s.fieldset}>
                        <label className={s.label}>Company (Optional)</label>
                        <input className={s.input} {...register("company")} />
                    </div>
                    <div className={s.fieldset}>
                        <label className={s.label}>
                            Street and House Number
                        </label>
                        <input
                            {...register("address_1", {
                                required: {
                                    value: true,
                                    message:
                                        "street and house number is required",
                                },
                            })}
                            className={s.input}
                        />
                    </div>
                    <div className={s.fieldset}>
                        <label className={s.label}>
                            Apartment, Suite, Etc. (Optional)
                        </label>
                        <input {...register("address_2")} className={s.input} />
                    </div>
                    <div className="grid gap-3 grid-flow-row grid-cols-12">
                        <div className={cn(s.fieldset, "col-span-6")}>
                            <label className={s.label}>Postal Code</label>
                            <input
                                {...register("postal_code", {
                                    required: {
                                        value: true,
                                        message: "postal code is required",
                                    },
                                })}
                                className={s.input}
                            />
                        </div>
                        <div className={cn(s.fieldset, "col-span-6")}>
                            <label className={s.label}>City</label>
                            <input
                                {...register("city", {
                                    required: {
                                        value: true,
                                        message: "city is required",
                                    },
                                })}
                                className={s.input}
                            />
                        </div>
                    </div>
                    <div className={s.fieldset}>
                        <label className={s.label}>Country/Region</label>
                        <select
                            {...register("country_code")}
                            className={s.select}
                        >
                            <option value="US">United States</option>
                            <option value="DE">Germany</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ShippingView;
