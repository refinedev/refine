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
import Checkbox from "@components/common/Checkbox";

const stepTitles = ["Address", "Payment"];

const ProfilePage: React.FC = () => {
    const [checked, setChecked] = useState(true);
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

    const { mutateAsync } = useCreate();

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
                    <div className="flex flex-col gap-2">
                        {Object.keys(errors).length > 0 && (
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
                        )}

                        <ShippingView
                            title="Shipping Address"
                            registerNamePrefix="shipping_address"
                            register={register}
                        />

                        <Checkbox
                            label="Same as billing address"
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                        />
                        <br />

                        {!checked && (
                            <ShippingView
                                title="Billing Address"
                                registerNamePrefix="billing_address"
                                register={register}
                            />
                        )}

                        <Text variant="pageHeading">Delivery</Text>
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
                    </div>
                );
            case 1:
                return <PaymentMethodView clientSecret={clientSecret} />;
        }
    };

    useEffect(() => {
        (async () => {
            if (currentStep === 1) {
                const { shipping_address, billing_address } = getValues();

                await mutateAsync({
                    resource: `carts/${cartId}`,
                    values: {
                        country_code: shipping_address.country_code,
                        email: "omer@refine.dev",
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
            }
        })();
    }, [currentStep]);

    return (
        <LayoutWrapper>
            <Container>
                <form autoComplete="off">{renderFormByStep(currentStep)}</form>

                <div className="mt-8 flex gap-2">
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
