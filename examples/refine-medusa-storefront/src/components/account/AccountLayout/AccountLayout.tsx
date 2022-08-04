import { useGetIdentity } from "@pankod/refine-core";
import React, { PropsWithChildren } from "react";
import { AccountNav, LoadingDots } from "@components";
import UnderlineLink from "@components/common/UnderlineLink/UnderlineLink"; // refactor path alli

const AccountLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { data } = useGetIdentity();

    if (!data) {
        return (
            <div className="flex h-full min-h-[640px] w-full items-center justify-center text-gray-900">
                <LoadingDots />
            </div>
        );
    }

    return (
        <div className="mt-16 flex-1">
            <div className="w-full  px-56">
                <div className="small:grid-cols-[240px_1fr] small:px-8 small:py-12 grid grid-cols-1 py-6 shadow-md ">
                    <div>
                        <AccountNav />
                    </div>
                    <div className="flex-1">{children}</div>
                </div>
                <div className="small:flex-row small:border-t flex flex-col items-end justify-between gap-x-8 border-gray-200 px-8 py-12">
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
