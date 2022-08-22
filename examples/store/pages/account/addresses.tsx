import { NextPage } from "next";
import { LayoutWrapper } from "@pankod/refine-core";

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
