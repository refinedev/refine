import { NextPage } from "next";
import { LayoutWrapper } from "@pankod/refine-core";

import AccountLayout from "@components/account/AccountLayout/AccountLayout";
import AddressesTemplate from "@components/address/AddressTemplate/AddressTemplate";

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
