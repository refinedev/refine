import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import * as Icons from "../../../static/become-a-refine-expert/icons";

const icons = [
    {
        title: "Early Access",
        description: "Early access to new releases and beta programs.",
        icon: <Icons.EarlyAccess />,
    },
    {
        title: "Training",
        description: "Exclusive content and live events.",
        icon: <Icons.Training />,
    },
    {
        title: "Fast Track Support",
        description: "Priority support from refine core team.",
        icon: <Icons.FastTrackSupport />,
    },
    {
        title: "New Business",
        description: "Access to new clients and markets.",
        icon: <Icons.NewBusiness />,
    },
];

const BecomeAnRefineExpert: React.FC = () => {
    return (
        <Layout>
            <Head title="Become an Expert | refine">
                <html
                    data-page="become-an-refine-expert"
                    data-customized="true"
                />
            </Head>
            <div className="font-montserrat container flex flex-col items-center pt-8 pb-40 py-4">
                <h1 className="text-[#1890FF] text-center font-montserrat mb-0 tracking-[0.01em]">
                    <div className="text-4xl font-medium">GROW WITH</div>
                    <div className="text-3xl font-extrabold">refine</div>
                </h1>

                <p className="text-[#242436] max-w-[592px] text-center font-semibold mb-0 mt-7">
                    Using <strong className="font-extrabold">refine</strong> for
                    client projects? Would you like to offer your{" "}
                    <strong className="font-extrabold">refine</strong> related
                    services to a global audience? Join{" "}
                    <strong className="font-extrabold">
                        refine EXPERTS program
                    </strong>{" "}
                    and open doors to new opportunities for your business.
                </p>

                <h2 className="text-center font-montserrat mb-0 mt-8">
                    <div className="text-[#3FDCF7] text-xs font-bold tracking-[0.16em]">
                        ABOUT
                    </div>
                    <div className="text-[#1890FF] text-xl font-bold tracking-[-0.02em]">
                        THE PROGRAM
                    </div>
                </h2>

                <p className="text-[#242436] max-w-[592px] text-center text-sm font-medium mb-0 mt-4">
                    Despite being a relatively new framework, hundreds of
                    companies have already started using{" "}
                    <strong className="font-bold">refine</strong> to build
                    amazing things. The widespread adoption has resulted in a
                    greater demand for professionals who are able to carry out{" "}
                    <strong className="font-bold">refine</strong> projects.
                </p>

                <p className="text-[#242436] max-w-[592px] text-center text-sm font-medium mb-0 mt-4">
                    The{" "}
                    <strong className="font-bold">
                        refine EXPERTS program
                    </strong>{" "}
                    aims to certify eligible agencies that offer{" "}
                    <strong className="font-bold">refine</strong> services and
                    showcase them. This way, they can be easily discovered by
                    companies who need these skills.{" "}
                    <strong className="font-bold">refine experts</strong> will
                    receive continuous support, updates and training from{" "}
                    <strong className="font-bold">refine core</strong> team
                    creating a beneficial relationship for all parties.
                </p>

                <p className="text-[#242436] max-w-[592px] text-center text-xs font-medium mb-0 mt-4">
                    Join & Grow with{" "}
                    <strong className="font-bold">refine</strong> today
                </p>

                <a
                    href="https://refinedev.typeform.com/to/ivcj9D2t"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shadow-startTiles appearance-none flex items-center justify-center no-underline font-bold font-montserrat text-sm h-8 w-44 text-white text-center bg-gradient-to-l from-[#1890FF] to-[#47EBF5] border-0 rounded-[4px] cursor-pointer mt-4"
                >
                    Apply Now
                </a>

                <div className="mt-11 md:min-h-[380px] w-auto max-w-[592px]">
                    <img
                        srcSet="
                        /become-a-refine-expert/img/dashboard-4x.png 2x,
                        /become-a-refine-expert/img/dashboard-2x.png 1x"
                        src="/become-a-refine-expert/img/dashboard-2x.png"
                        sizes="100vw"
                        alt="Refine app screenshot"
                        className="block object-cover"
                    />
                </div>

                <h2 className="text-center font-montserrat mb-0 mt-16">
                    <div className="text-[#3FDCF7] text-xs font-bold tracking-[0.16em]">
                        WHY BECOME
                    </div>
                    <div className="text-[#1890FF] text-xl font-bold tracking-[-0.02em]">
                        A <strong className="font-extrabold">refine</strong>{" "}
                        EXPERT
                    </div>
                </h2>

                <p className="text-[#242436] max-w-[592px] text-center text-xs font-medium mb-0 mt-4">
                    As a member of the{" "}
                    <strong className="font-bold">
                        refine EXPERTS program
                    </strong>
                    , you’ll enjoy many benefits, including:
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-8 lg:gap-16 mt-16 w-full lg:w-[800px]">
                    {icons.map(({ description, icon, title }, index) => {
                        return (
                            <div
                                key={index}
                                className="h-full w-full flex flex-col items-center justify-start text-[#242436]"
                            >
                                <div>{icon}</div>
                                <h3 className="font-montserrat text-center text-sm font-bold mb-0 mt-4">
                                    {title}
                                </h3>
                                <p className="font-montserrat text-center text-xs font-medium mb-0 mt-2">
                                    {description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* <div className="w-full lg:w-[800px] shadow-startTiles border border-solid border-[#EEEEF0] rounded-xl flex flex-col items-center justify-center mt-16 py-8 px-16">
                    <p className="font-montserrat text-center text-base font-bold text-[#242436] uppercase mb-0">
                        “Partnering with{" "}
                        <span className="font-black lowercase">
                            <q>refine</q>
                        </span>{" "}
                        has been a game changer for our business. We’re able to
                        exceed customer expectations, bring in new business, and
                        delight our developers.”
                    </p>
                    <div className="mt-4 text-[#1890FF] text-sm font-bold">
                        Ali Emir Şen
                    </div>
                    <div className="text-[#C1C1C6] text-xs font-medium">
                        Frontend Team Lead @refine
                    </div>
                </div> */}
            </div>
        </Layout>
    );
};

export default BecomeAnRefineExpert;
