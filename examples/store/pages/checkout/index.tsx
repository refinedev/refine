import { GetServerSideProps } from "next";

import { CheckoutTemplate } from "@components/checkout";
import { SEO } from "@components/common";
import { getSearchStaticProps } from "@lib/search-props";

const CheckoutPage: React.FC = () => {
    return (
        <>
            <SEO title="Checkout" />
            <CheckoutTemplate />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const searchStaticProps = await getSearchStaticProps();

        return {
            props: {
                ...searchStaticProps.props,
            },
        };
    } catch (error) {
        return { props: {} };
    }
};

export default CheckoutPage;
