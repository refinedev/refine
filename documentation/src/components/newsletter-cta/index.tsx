import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import useScrollTracker from "../../hooks/use-scroll-tracker";
import { CancelIcon } from "../landing/icons";
import useCookie from "react-use-cookie";

const NewsletterCta = () => {
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
                    className="fixed bottom-4 right-4 z-50 flex flex-col items-center w-[312px] lg:w-[384px] rounded-2xl shadow-modal bg-white"
                >
                    <button
                        className="absolute text-white bg-transparent border-none cursor-pointer top-2 right-2 hover:scale-110"
                        onClick={onCloseClickHandler}
                    >
                        <CancelIcon />
                    </button>

                    <img
                        srcSet="
                                /img/newsletter-logo2x.jpg 1920w,
                                /img/newsletter-logo.jpg 1200w"
                        src="/img/newsletter-logo.jpg"
                        sizes="100vw"
                        alt="Refine app screenshot"
                        className="bg-[#5D26D3] block object-cover w-full rounded-tl-2xl rounded-tr-2xl"
                    />

                    <section className="w-[280px] lg:w-[320px] font-montserrat pt-3 pb-4 lg:pt-8 lg:pb-8">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="font-bold text-xl uppercase text-[#1890FF] mb-0 lg:mb-4">
                                Join our Newsletter
                            </h2>
                            <p className="text-xs leading-[18px] font-medium tracking-[-0.01rem] mb-0 text-[#2A2A42]">
                                Get started with our monthly newsletter for
                                helpful tips on how to run your business
                                smoothly.
                            </p>
                        </div>

                        <form
                            action="https://www.getrevue.co/profile/refine_dev/add_subscriber"
                            method="post"
                            id="revue-form"
                            name="revue-form"
                            target="_blank"
                            className="flex flex-col w-full mt-2 lg:mt-6"
                        >
                            <div className="flex gap-2 items-center w-full p-2 border border-[#EDEDEF] border-solid rounded-[4px]">
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
                                    placeholder="example@refine.com"
                                    className="text-[#2A2A42] font-medium text-xs  w-full bg-transparent border-none outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    background:
                                        "linear-gradient(265.27deg, #1890FF -1.58%, #47EBF5 90.77%, #47EBF5 90.77%)",
                                }}
                                className="text-white mt-2 lg:mt-4 font-bold text-xs p-2 shadow-modal rounded-[4px] border-none"
                            >
                                Subscribe
                            </button>
                        </form>
                    </section>
                </motion.aside>
            )}
        </AnimatePresence>
    );
};

export default NewsletterCta;
