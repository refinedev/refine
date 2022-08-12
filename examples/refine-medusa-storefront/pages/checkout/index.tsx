import { useState } from "react";
import { GetServerSideProps } from "next";
import { HttpError, LayoutWrapper, useCreate } from "@pankod/refine-core";
import { FormProvider, useStepsForm } from "@pankod/refine-react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { StoreCartsRes } from "@medusajs/medusa";

import { Button, Container, Checkbox } from "@components/ui";
import { getSearchStaticProps } from "@lib/search-props";
import PaymentMethodView from "@components/checkout/PaymentMethodView";
import ShippingView from "@components/checkout/ShippingView";
import BillingView from "@components/checkout/BillingView";
import ShippingOptionView from "@components/checkout/ShippingOptionView";
import CheckoutSummary from "@components/checkout/CheckoutSummary";
import { useCartContext } from "@lib/context";

const totalStep = 2;

const CheckoutPage: React.FC = () => {
    const [checked, setChecked] = useState(true);
    const { cart } = useCartContext();
    const [clientSecret, setClientSecret] = useState<string | undefined>();

    const cartId = cart?.id;

    const methods = useStepsForm({
        mode: "onChange",
        reValidateMode: "onChange",
    });
    const {
        getValues,
        steps: { currentStep, gotoStep },
        formState: { errors },
        setError,
        clearErrors,
        trigger,
    } = methods;

    const { mutateAsync, isLoading } = useCreate();

    const {
        mutateAsync: createPaymentSession,
        isLoading: isCreatePaymentSessionLoading,
    } = useCreate<StoreCartsRes>();

    const renderFormByStep = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <div className="flex flex-col gap-2">
                        <ShippingView />

                        <Checkbox
                            className="my-4"
                            label="Same as billing address"
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                        />

                        {!checked && <BillingView />}

                        <ShippingOptionView />
                    </div>
                );
            case 1:
                return (
                    <PaymentMethodView
                        clientSecret={clientSecret}
                        goBack={() => gotoStep(currentStep - 1)}
                    />
                );
        }
    };

    const nextPage = async () => {
        const isValid = await trigger(undefined, { shouldFocus: true });

        if (isValid) {
            const { shipping_address, billing_address, email } = getValues();

            try {
                await mutateAsync({
                    resource: `carts/${cartId}`,
                    values: {
                        country_code: shipping_address.country_code,
                        email,
                        shipping_address,
                        billing_address: checked
                            ? shipping_address
                            : billing_address,
                    },
                });

                await mutateAsync({
                    resource: `carts/${cartId}/shipping-methods`,
                    values: {
                        option_id: getValues()?.shippingMethod,
                    },
                });

                const paymentSession = await createPaymentSession({
                    resource: `carts/${cartId}/payment-sessions`,
                    values: {},
                });

                const isStripeAvailable =
                    paymentSession.data.cart.payment_sessions?.some(
                        (session) => session.provider_id === "stripe",
                    );

                if (!isStripeAvailable) {
                    return;
                }

                const stripePaymentSession = await createPaymentSession({
                    resource: `carts/${cartId}/payment-session`,
                    values: {
                        provider_id: "stripe",
                    },
                });

                setClientSecret(
                    stripePaymentSession?.data?.cart?.payment_session?.data
                        .client_secret as string,
                );

                clearErrors();
                gotoStep(currentStep + 1);
            } catch (error) {
                setError("server", { message: (error as HttpError).message });
            }
        }
    };

    return (
        <LayoutWrapper>
            <Container>
                <div className="relative">
                    <div className="small:grid-cols-[1fr_416px] content-container grid grid-cols-1 gap-y-8 gap-x-8 py-12">
                        <>
                            <FormProvider {...methods}>
                                <form autoComplete="off">
                                    {renderFormByStep(currentStep)}
                                </form>
                            </FormProvider>

                            <ErrorMessage
                                errors={errors}
                                name="server"
                                render={({ message }) => {
                                    return (
                                        <div className="text-right text-xs text-rose-500">
                                            <span>{message}</span>
                                        </div>
                                    );
                                }}
                            />
                        </>
                        <CheckoutSummary />
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    {currentStep < totalStep - 1 && (
                        <Button
                            loading={isLoading || isCreatePaymentSessionLoading}
                            variant="slim"
                            onClick={() => {
                                nextPage();
                            }}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </Container>
        </LayoutWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const searchProps = await getSearchStaticProps();

        return {
            props: {
                ...searchProps.props,
            },
        };
    } catch (error) {
        return { props: {} };
    }
};

export default CheckoutPage;
