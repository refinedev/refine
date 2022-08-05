import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { LayoutWrapper, useCreate } from "@pankod/refine-core";
import { FormProvider, useStepsForm } from "@pankod/refine-react-hook-form";
import { StoreCartsRes } from "@medusajs/medusa";

import { Button, Container, Checkbox } from "@components/ui";
import { getSearchStaticProps } from "@lib/search-props";
import PaymentMethodView from "@components/checkout/PaymentMethodView";
import ShippingView from "@components/checkout/ShippingView";
import BillingView from "@components/checkout/BillingView";
import ShippingOptionView from "@components/checkout/ShippingOptionView";
import { CartContext } from "@lib/context";

const stepTitles = ["Address", "Payment"];

const ProfilePage: React.FC = () => {
    const [checked, setChecked] = useState(true);
    const { cartId } = useContext(CartContext);
    const [clientSecret, setClientSecret] = useState<string | undefined>();

    const methods = useStepsForm({
        mode: "onTouched",
        reValidateMode: "onChange",
    });
    const {
        getValues,
        steps: { currentStep, gotoStep },
    } = methods;

    const { mutateAsync } = useCreate();

    const { mutateAsync: createPaymentSession } = useCreate<StoreCartsRes>();

    const renderFormByStep = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <div className="flex flex-col gap-2">
                        {/* TODO: Fix me */}
                        {/* {Object.keys(errors).length > 0 && (
                            <div className="text-red border-red border p-3">
                                <ul>
                                    {Object.keys(errors).map((key: any) => (
                                        <li key={key}>
                                            {
                                                (errors as any)[key as any]
                                                    .message
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )} */}

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

    useEffect(() => {
        (async () => {
            if (currentStep === 1) {
                // TODO: Fix error handling try catch
                const { shipping_address, billing_address, email } =
                    getValues();

                await mutateAsync(
                    {
                        resource: `carts/${cartId}`,
                        values: {
                            country_code: shipping_address.country_code,
                            email,
                            shipping_address,
                            billing_address: checked
                                ? shipping_address
                                : billing_address,
                        },
                    },
                    {
                        onError: (error) => {
                            console.log(error);
                        },
                    },
                );

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
            }
        })();
    }, [currentStep]);

    return (
        <LayoutWrapper>
            <Container>
                <FormProvider {...methods}>
                    <form autoComplete="off">
                        {renderFormByStep(currentStep)}
                    </form>
                </FormProvider>

                <div className="mt-8 flex justify-end">
                    {currentStep < stepTitles.length - 1 && (
                        <Button
                            variant="slim"
                            onClick={() => {
                                gotoStep(currentStep + 1);
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

export default ProfilePage;
