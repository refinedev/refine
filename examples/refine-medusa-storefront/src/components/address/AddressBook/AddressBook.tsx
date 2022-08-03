import React from "react";
import { Customer } from "@medusajs/medusa";
import AddAddress from "@components/address/AddAddress/AddAddress";

type AddressBookProps = {
    customer: Omit<Customer, "password_hash">;
};

const AddressBook: React.FC<AddressBookProps> = ({ customer }) => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-4">
                {/* <AddAddress /> */}
                {/* {customer.shipping_addresses.map((address) => {
                    return <EditAddress address={address} key={address.id} />;
                })} */}
            </div>
        </div>
    );
};

export default AddressBook;
