import { useGetIdentity } from "@pankod/refine-core";
import AddressBook from "@components/address/AddressBook/AddressBook";

const AddressesTemplate: React.FC = () => {
    const customer = useGetIdentity();

    return (
        <div className="w-full">
            <div className="mb-8 flex flex-col gap-y-4">
                <h1 className="text-2xl-semi">Shipping Addresses</h1>
                <p className="text-base-regular">
                    View and update your shipping addresses, you can add as many
                    as you like. Saving your addresses will make them available
                    during checkout.
                </p>
            </div>
            <AddressBook customer={customer.data} />
        </div>
    );
};

export default AddressesTemplate;
