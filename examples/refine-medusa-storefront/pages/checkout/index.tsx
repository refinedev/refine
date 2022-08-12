import CheckoutTemplate from "@components/checkout/CheckoutTemplate";
import SEO from "@components/common/SEO";

const CheckoutPage: React.FC = () => {
    return (
        <>
            <SEO title="Checkout" />
            <CheckoutTemplate />
        </>
    );
};

export default CheckoutPage;
