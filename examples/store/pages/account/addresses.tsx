import { NextPage } from "next";
import { LayoutWrapper } from "@refinedev/core";

import { AccountLayout, AddressesTemplate } from "@components";

const Addresses: NextPage = () => {
    return (
        <LayoutWrapper>
            <AccountLayout>
                <AddressesTemplate />
            </AccountLayout>
        </LayoutWrapper>
    );
};

export default Addresses;
