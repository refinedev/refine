import { CheckoutTemplate } from "@components/checkout";
import { SEO } from "@components/common";

const CheckoutPage: React.FC = () => {
    return (
        <>
            <SEO title="Checkout" />
            <CheckoutTemplate />
        </>
    );
};

export default CheckoutPage;
