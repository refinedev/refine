import React from "react";

export const CompanyDetail = ({ companyDetails }) => {
    const { logo, title, user, message } = companyDetails;

    return (
        <div className="bg-[#FBFBFC] p-6 rounded-lg shadow-startTiles relative">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-48 h-16 flex-shrink-0"></div>
                <img
                    className="absolute left-0 -top-2.5 w-60"
                    src={logo}
                    alt="Company Logo"
                />
                <div className="font-montserrat text-[#242436] font-bold grow">
                    <div className="max-w-none md:max-w-[350px]">{title}</div>
                </div>
                <div className="flex gap-2">
                    <img
                        className="w-12 h-12 rounded-full"
                        src={user.avatarURL}
                        alt="User Avatar"
                    />
                    <div className="flex flex-col min-w-[280px]">
                        <div className="font-bold font-montserrat text-[#242436]">
                            {user.username}
                        </div>
                        <div
                            className="font-montserrat text-[#242436] text-sm"
                            dangerouslySetInnerHTML={{
                                __html: user.description,
                            }}
                        />
                    </div>
                </div>
            </div>
            <hr className="m-0 my-4" />
            <div
                className="font-montserrat text-[#242436]  font-medium"
                dangerouslySetInnerHTML={{
                    __html: message,
                }}
            />
        </div>
    );
};
