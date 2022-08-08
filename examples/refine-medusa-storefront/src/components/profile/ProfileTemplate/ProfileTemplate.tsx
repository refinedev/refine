// import { useAccount } from "@lib/context/account-context";
// import ProfileEmail from "@modules/account/components/profile-email";
import { useGetIdentity, useOne } from "@pankod/refine-core";

import ProfileEmail from "@components/profile/ProfileEmail/ProfileEmail";
import ProfileName from "@components/profile/ProfileName/ProfileName";
import ProfilePassword from "@components/profile/ProfilePassword/ProfilePassword";
import ProfilePhone from "@components/profile/ProfilePhone/ProfilePhone";
import ProfileBillingAddress from "@components/profile/ProfileBillingAddress/ProfileBillingAddress";

// import ProfileBillingAddress from "../components/profile-billing-address";
// import ProfilePhone from "../components/profile-phone";

const ProfileTemplate: React.FC = () => {
    const { data } = useOne({
        resource: "customers",
        id: "me",
    });

    const customer = data?.data?.customer;

    return (
        customer && (
            <div className="w-full">
                <div className="mb-8 flex flex-col gap-y-4">
                    <h1 className="text-2xl-semi">Profile</h1>
                    <p className="text-base-regular">
                        View and update your profile information, including your
                        name, email, and phone number. You can also update your
                        billing address, or change your password.
                    </p>
                </div>
                <div className="flex w-full flex-col gap-y-8">
                    <ProfileName customer={customer} />
                    <Divider />
                    <ProfileEmail customer={customer} />
                    <Divider />
                    <ProfilePhone customer={customer} />
                    <Divider />
                    <ProfilePassword customer={customer} />
                    <Divider />
                    <ProfileBillingAddress customer={customer} />
                </div>
            </div>
        )
    );
};

const Divider = () => {
    return <div className="h-px w-full bg-gray-200" />;
};

export default ProfileTemplate;
