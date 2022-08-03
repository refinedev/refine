import { useGetIdentity } from "@pankod/refine-core";
import React, { PropsWithChildren } from "react";
import { AccountNav, LoadingDots } from "@components";
import UnderlineLink from "@components/common/UnderlineLink/UnderlineLink"; // refactor path alli

const AccountLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { data } = useGetIdentity();

    if (!data) {
        return (
            <div className="flex items-center justify-center w-full min-h-[640px] h-full text-gray-900">
                <LoadingDots />
            </div>
        );
    }

    return (
        <div className="flex-1 mt-16">
            <div className="w-full  px-56">
                <div className="shadow-md grid grid-cols-1 small:grid-cols-[240px_1fr] small:px-8 py-6 small:py-12 ">
                    <div>
                        <AccountNav />
                    </div>
                    <div className="flex-1">{children}</div>
                </div>
                <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-gray-200 px-8 py-12 gap-x-8">
                    <div>
                        <h3 className="text-xl-semi mb-4">Got questions?</h3>
                        <span className="text-small-regular">
                            You can find frequently asked questions and answers
                            on our customer service page.
                        </span>
                    </div>
                    <div>
                        <UnderlineLink href="/customer-service">
                            Customer Service
                        </UnderlineLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountLayout;
