import { Payment, PaymentStatus } from "@medusajs/medusa";

interface PaymentDetailsProps {
    payments: Payment[];
    paymentStatus: PaymentStatus;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
    payments,
    paymentStatus,
}) => {
    return (
        <div>
            <h2 className="text-base-semi">Payment</h2>
            <div className="my-2">
                {payments.map((p) => {
                    switch (p.provider_id) {
                        case "stripe":
                            return <StripeDetails key={p.id} payment={p} />;
                        case "paypal":
                            return <PayPalDetails key={p.id} />;
                        case "manual":
                            return <TestDetails key={p.id} />;
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

const PayPalDetails = () => {
    return (
        <div className="text-base-regular flex flex-col">
            <span className="text-small-regular text-primary">PayPal</span>
            <span>PayPal payment</span>
        </div>
    );
};

const StripeDetails = ({ payment }: { payment: Payment }) => {
    const card: {
        brand: string;
        last4: string;
        exp_year: number;
        exp_month: number;
    } = (payment.data.charges as any).data[0].payment_method_details.card;

    return (
        <div className="text-base-regular flex flex-col">
            <span className="text-small-regular text-primary">
                {card.brand.substring(0, 1).toUpperCase()}
                {card.brand.substring(1)}
            </span>
            <span>************{card.last4}</span>
            <span>
                {card.exp_month > 9 ? card.exp_month : `0${card.exp_month}`} /{" "}
                {card.exp_year.toString().slice(2)}
            </span>
        </div>
    );
};

const TestDetails = () => {
    return (
        <div className="text-base-regular flex flex-col">
            <span className="text-small-regular text-primary">Test</span>
            <span>Test payment using medusa-payment-manual</span>
        </div>
    );
};
