import { FC } from "react";
import cn from "clsx";

import useAddCard from "@framework/customer/card/use-add-item";
import { Button, Text } from "@components/ui";
import { useUI } from "@components/ui/context";
import SidebarLayout from "@components/common/SidebarLayout";

import s from "./PaymentMethodView.module.css";

interface Form extends HTMLFormElement {
    cardHolder: HTMLInputElement;
    cardNumber: HTMLInputElement;
    cardExpireDate: HTMLInputElement;
    cardCvc: HTMLInputElement;
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    company: HTMLInputElement;
    streetNumber: HTMLInputElement;
    zipCode: HTMLInputElement;
    city: HTMLInputElement;
    country: HTMLSelectElement;
}

const PaymentMethodView: FC = () => {
    const { setSidebarView } = useUI();
    const addCard = useAddCard();

    async function handleSubmit(event: React.ChangeEvent<Form>) {
        event.preventDefault();

        await addCard({
            cardHolder: event.target.cardHolder.value,
            cardNumber: event.target.cardNumber.value,
            cardExpireDate: event.target.cardExpireDate.value,
            cardCvc: event.target.cardCvc.value,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            company: event.target.company.value,
            streetNumber: event.target.streetNumber.value,
            zipCode: event.target.zipCode.value,
            city: event.target.city.value,
            country: event.target.country.value,
        });

        setSidebarView("CHECKOUT_VIEW");
    }

    return (
        <form className="h-full" onSubmit={handleSubmit}>
            <SidebarLayout handleBack={() => setSidebarView("CHECKOUT_VIEW")}>
                <div className="px-4 sm:px-6 flex-1">
                    <Text variant="sectionHeading"> Payment Method</Text>
                    <div>
                        <div className={s.fieldset}>
                            <label className={s.label}>Cardholder Name</label>
                            <input name="cardHolder" className={s.input} />
                        </div>
                        <div className="grid gap-3 grid-flow-row grid-cols-12">
                            <div className={cn(s.fieldset, "col-span-7")}>
                                <label className={s.label}>Card Number</label>
                                <input name="cardNumber" className={s.input} />
                            </div>
                            <div className={cn(s.fieldset, "col-span-3")}>
                                <label className={s.label}>Expires</label>
                                <input
                                    name="cardExpireDate"
                                    className={s.input}
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div className={cn(s.fieldset, "col-span-2")}>
                                <label className={s.label}>CVC</label>
                                <input name="cardCvc" className={s.input} />
                            </div>
                        </div>
                        <hr className="border-accent-2 my-6" />
                        <div className="grid gap-3 grid-flow-row grid-cols-12">
                            <div className={cn(s.fieldset, "col-span-6")}>
                                <label className={s.label}>First Name</label>
                                <input name="firstName" className={s.input} />
                            </div>
                            <div className={cn(s.fieldset, "col-span-6")}>
                                <label className={s.label}>Last Name</label>
                                <input name="lastName" className={s.input} />
                            </div>
                        </div>
                        <div className={s.fieldset}>
                            <label className={s.label}>
                                Company (Optional)
                            </label>
                            <input name="company" className={s.input} />
                        </div>
                        <div className={s.fieldset}>
                            <label className={s.label}>
                                Street and House Number
                            </label>
                            <input name="streetNumber" className={s.input} />
                        </div>
                        <div className={s.fieldset}>
                            <label className={s.label}>
                                Apartment, Suite, Etc. (Optional)
                            </label>
                            <input className={s.input} name="apartment" />
                        </div>
                        <div className="grid gap-3 grid-flow-row grid-cols-12">
                            <div className={cn(s.fieldset, "col-span-6")}>
                                <label className={s.label}>Postal Code</label>
                                <input name="zipCode" className={s.input} />
                            </div>
                            <div className={cn(s.fieldset, "col-span-6")}>
                                <label className={s.label}>City</label>
                                <input name="city" className={s.input} />
                            </div>
                        </div>
                        <div className={s.fieldset}>
                            <label className={s.label}>Country/Region</label>
                            <select name="country" className={s.select}>
                                <option>Hong Kong</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="sticky z-20 bottom-0 w-full right-0 left-0 py-12 bg-accent-0 border-t border-accent-2 px-6">
                    <Button type="submit" width="100%" variant="ghost">
                        Continue
                    </Button>
                </div>
            </SidebarLayout>
        </form>
    );
};

export default PaymentMethodView;
