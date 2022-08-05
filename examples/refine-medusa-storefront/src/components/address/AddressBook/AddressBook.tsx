import React from "react";
import { Customer } from "@medusajs/medusa";
import AddAddress from "@components/address/AddAddress/AddAddress";
import EditAddress from "@components/address/EditAddress/EditAddress";

type AddressBookProps = {
    customer: Omit<Customer, "password_hash">;
};

const AddressBook: React.FC<AddressBookProps> = ({ customer }) => {
    return (
        <div className="w-full">
            <div className="mt-4 grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
                <AddAddress />
                {customer?.shipping_addresses?.map((address) => {
                    return <EditAddress address={address} key={address.id} />;
                })}
            </div>
        </div>
    );
};

export default AddressBook;
