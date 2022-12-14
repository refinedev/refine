import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import useScrollTracker from "../../hooks/use-scroll-tracker";
import { CancelIcon } from "../landing/icons";
import useCookie from "react-use-cookie";

const newsletterCTAs = [
    {
        title: "No Spam!",
        description: `The team behind the <b>popular</b> React-based framework shares <b>hand-picked</b> resources and tutorials.`,
        trackId: "no-spam",
    },
    {
        title: "Hack it!",
        description: `You'll get a weekly email from us with the latest and greatest front-end <b>trends</b> and <b>resources</b> so that you can stay on <b>top of your game!</b>`,
        trackId: "hack-it",
    },
];

const NewsletterCta = () => {
    const randomNewsletterCTA =
        newsletterCTAs[Math.floor(Math.random() * newsletterCTAs.length)];
    const { scrollY } = useScrollTracker([50]);

    const [cookie, setCookie] = useCookie("newsletter-popup-visible", "true");

    const [visible, setVisible] = useState(false);

    const onCloseClickHandler = () => {
        setVisible(false);
        setCookie("false", {
            days: 7,
        });
    };

    useEffect(() => {
        if (scrollY >= 50 && cookie !== "false") {
            setVisible(true);
        }
    }, [scrollY]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.aside
                    key="NewsletterCta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="shadow-modal fixed right-0 left-0 bottom-14 z-50 mx-auto flex w-[312px] flex-col items-center rounded-2xl bg-white sm:left-[unset] sm:right-4 sm:mx-0 lg:w-[384px] "
                >
                    <button
                        className="absolute text-white bg-transparent border-none cursor-pointer top-2 right-2 hover:scale-110"
                        onClick={onCloseClickHandler}
                    >
                        <CancelIcon />
                    </button>

                    <img
                        srcSet="
                        https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/newsletter-logo2x.jpg 2x,
                        https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/newsletter-logo1x.jpg 1x"
                        src="/img/newsletter-logo.jpg"
                        sizes="100vw"
                        alt="Refine app screenshot"
                        className="block min-h-[104px] w-full rounded-tl-2xl rounded-tr-2xl bg-[#5D26D3] object-cover lg:min-h-[128px]"
                    />

                    <section className="font-montserrat w-[280px] pt-3 lg:w-[360px] lg:pt-4 lg:pb-2">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="mb-0 text-xl font-bold uppercase text-[#1890FF] lg:mb-4">
                                {randomNewsletterCTA.title}
                            </h2>
                            <p
                                className="mb-0 text-xs font-medium leading-[18px] tracking-[-0.01rem] text-[#2A2A42]"
                                dangerouslySetInnerHTML={{
                                    __html: randomNewsletterCTA.description,
                                }}
                            />
                        </div>
                    </section>
                    <section className="font-montserrat w-[280px] pb-4 lg:w-[320px] lg:pb-8">
                        <form
                            action="https://www.getrevue.co/profile/refine_dev/add_subscriber"
                            method="post"
                            id="revue-form"
                            name="revue-form"
                            target="_blank"
                            className="flex flex-col w-full mt-2 lg:mt-6"
                            onSubmit={() => {
                                window?.gtag("event", "newsletter-subscribe", {
                                    event_category: "newsletter",
                                    value: randomNewsletterCTA.trackId,
                                });
                            }}
                        >
                            <div className="flex w-full items-center gap-2 rounded-[4px] border border-solid border-[#EDEDEF] p-2">
                                <svg
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={14}
                                    height={11}
                                    viewBox="0 0 14 11"
                                >
                                    <path
                                        d="M13.5 0H.5C.2234 0 0 .2234 0 .5v10c0 .2766.2234.5.5.5h13c.2766 0 .5-.2234.5-.5V.5c0-.2766-.2234-.5-.5-.5Zm-.625 1.7312V9.875H1.125V1.7312l-.4313-.3359.6141-.789.6688.5203H12.025l.6688-.5204.614.7891-.4328.336Zm-.85-.6062L7 5.0313 1.975 1.125 1.3062.6047l-.614.789.4312.336 5.3375 4.15a.8748.8748 0 0 0 1.0735 0l5.3406-4.1484.4312-.336-.614-.789-.6672.5187Z"
                                        fill="#81818F"
                                    />
                                </svg>

                                <label
                                    htmlFor="member_email"
                                    className="sr-only"
                                >
                                    Email
                                </label>
                                <input
                                    name="member[email]"
                                    id="member_email"
                                    type="email"
                                    placeholder="example@refine.dev"
                                    className="w-full border-none bg-transparent  text-xs font-medium text-[#2A2A42] outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    background:
                                        "linear-gradient(265.27deg, #1890FF -1.58%, #47EBF5 90.77%, #47EBF5 90.77%)",
                                }}
                                className="shadow-modal mt-2 cursor-pointer rounded-[4px] border-none p-2 text-xs font-bold text-white lg:mt-4"
                            >
                                Subscribe now
                            </button>
                        </form>
                    </section>
                </motion.aside>
            )}
        </AnimatePresence>
    );
};

export default NewsletterCta;
