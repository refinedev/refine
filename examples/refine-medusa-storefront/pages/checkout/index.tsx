import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { LayoutWrapper, useCreate, useOne } from "@pankod/refine-core";
import { Controller, useStepsForm } from "@pankod/refine-react-hook-form";
import { StoreShippingOptionsListRes, StoreCartsRes } from "@medusajs/medusa";

import { Button, Container, Text } from "@components/ui";
import { getSearchStaticProps } from "@lib/search-props";
import PaymentMethodView from "@components/checkout/PaymentMethodView";
import ShippingView from "@components/checkout/ShippingView";
import { CartContext } from "@lib/context";
import ShippingOptionWidget from "@components/checkout/ShippingOptionWidget";

const stepTitles = ["Address", "Payment"];

const ProfilePage: React.FC = () => {
    const { cartId } = useContext(CartContext);
    const [clientSecret, setClientSecret] = useState<string | undefined>();

    const {
        register,
        control,
        formState: { errors },
        getValues,
        setValue,
        steps: { currentStep, gotoStep },
    } = useStepsForm();

    const { data: shippingOptions } = useOne<StoreShippingOptionsListRes>({
        resource: `shipping-options/${cartId}`,
        id: "",
    });

    const { mutate, mutateAsync } = useCreate();

    const { mutateAsync: createPaymentSession } = useCreate<StoreCartsRes>();

    const ShippingOptions = () => (
        <>
            {shippingOptions?.data?.shipping_options.map((option) => (
                <ShippingOptionWidget
                    key={option.id}
                    isValid={getValues()?.shippingMethod === option.id}
                    onClick={() => {
                        setValue("shippingMethod", option.id);
                    }}
                    {...register("shippingMethod")}
                >
                    {option.name}
                </ShippingOptionWidget>
            ))}
        </>
    );

    const renderFormByStep = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Container className="pt-4">
                        {Object.keys(errors).length > 0 && (
                            <div className="text-red border border-red p-3">
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
                        )}
                        <ShippingView register={register} />
                        <Controller
                            control={control}
                            name="shippingMethod"
                            rules={{
                                required: {
                                    message: "shipping is required",
                                    value: true,
                                },
                            }}
                            render={({}) => <ShippingOptions />}
                        />
                    </Container>
                );
            case 1:
                return (
                    <>
                        <PaymentMethodView clientSecret={clientSecret} />
                    </>
                );
        }
    };

    useEffect(() => {
        (async () => {
            if (currentStep === 1) {
                const {
                    country_code,
                    company,
                    first_name,
                    last_name,
                    address_1,
                    address_2,
                    city,
                } = getValues();

                await mutateAsync({
                    resource: `carts/${cartId}`,
                    values: {
                        country_code,
                        email: "omer@refine.dev",
                        billing_address: {
                            company,
                            first_name,
                            last_name,
                            address_1,
                            address_2,
                            city,
                            country_code,
                        },
                        shipping_address: {
                            company,
                            first_name,
                            last_name,
                            address_1,
                            address_2,
                            city,
                            country_code,
                        },
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

                console.log({ paymentSession });

                const isStripeAvailable =
                    paymentSession.data.cart.payment_sessions?.some(
                        (session) => session.provider_id === "stripe",
                    );
                console.log({ isStripeAvailable });

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
            <Container className="pt-4">
                <Text variant="pageHeading">Checkout</Text>
                <div className="grid grid-cols-1">
                    <form autoComplete="off">
                        {renderFormByStep(currentStep)}
                    </form>

                    <div style={{ display: "flex", gap: 8 }}>
                        {currentStep > 0 && (
                            <Button
                                variant="slim"
                                onClick={() => {
                                    gotoStep(currentStep - 1);
                                }}
                            >
                                Previous
                            </Button>
                        )}
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
