// import { useAccount } from "@lib/context/account-context";
// import ProfileEmail from "@modules/account/components/profile-email";
import { useGetIdentity } from "@pankod/refine-core";

import ProfileName from "@components/profile/ProfileEmail/ProfileEmail";
// import ProfilePassword from "@modules/account/components/profile-password";
// import ProfileBillingAddress from "../components/profile-billing-address";
// import ProfilePhone from "../components/profile-phone";

const ProfileTemplate = () => {
    const { data } = useGetIdentity();
    return (
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
                <ProfileName customer={data} />
                <Divider />
                {/* <ProfileEmail customer={customer} />
                <Divider />
                <ProfilePhone customer={customer} />
                <Divider />
                <ProfilePassword customer={customer} />
                <Divider />
                <ProfileBillingAddress customer={customer} /> */}
            </div>
        </div>
    );
};

const Divider = () => {
    return <div className="h-px w-full bg-gray-200" />;
};

export default ProfileTemplate;
