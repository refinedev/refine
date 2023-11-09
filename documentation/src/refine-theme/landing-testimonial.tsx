import clsx from "clsx";
import React, { FC } from "react";
import { LandingSectionCtaButton } from "./landing-section-cta-button";

type Props = {
    className?: string;
};

export const LandingTestimonial: FC<Props> = ({ className }) => {
    const [showMore, setShowMore] = React.useState(false);

    const testimonialsFirstThree = testimonials.slice(0, 3);
    const testiomianlsStartFromThree = testimonials.slice(3);
    const testimonialsFirstTwo = testimonials.slice(0, 2);
    const testimonialsStartFromTwo = testimonials.slice(2);

    return (
        <div
            className={clsx(
                className,
                "w-full",
                "flex",
                "flex-col",
                "items-center",
            )}
        >
            <div
                className={clsx("not-prose", "w-full", "px-4 landing-md:px-10")}
            >
                <h2
                    className={clsx(
                        "text-2xl landing-sm:text-[32px]",
                        "tracking-tight",
                        "text-start",
                        "p-0",
                        "dark:text-gray-0 text-gray-900",
                    )}
                >
                    Loved by developers{" "}
                    <span
                        className={clsx(
                            "font-semibold",
                            "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
                            "text-refine-blue drop-shadow-[0_0_30px_rgba(0,128,255,0.3)]",
                        )}
                    >
                        like you
                    </span>
                    .
                </h2>
            </div>

            <div
                className={clsx(
                    "mt-8 landing-sm:mt-12 landing-lg:mt-20",
                    "grid grid-cols-12",
                    "gap-6",
                )}
            >
                {testimonialsFirstThree.map((testimonial, index) => {
                    return (
                        <TestimonialCard
                            key={index}
                            className={clsx(
                                "block landing-md:hidden landing-lg:block",
                                "col-span-full landing-lg:col-span-4",
                                "h-full",
                            )}
                            {...testimonial}
                        />
                    );
                })}
                {testimonialsFirstTwo.map((testimonial, index) => {
                    return (
                        <TestimonialCard
                            key={index}
                            className={clsx(
                                "hidden landing-md:block landing-lg:hidden",
                                "col-span-6",
                                "h-full",
                            )}
                            {...testimonial}
                        />
                    );
                })}
            </div>
            {showMore && (
                <div
                    className={clsx(
                        "block landing-md:hidden landing-lg:block",
                        "columns-1 landing-lg:columns-3 gap-6",
                    )}
                >
                    {testiomianlsStartFromThree.map((testimonial, index) => {
                        return (
                            <TestimonialCard
                                key={index}
                                className={clsx(
                                    "inline-block",
                                    "w-full",
                                    "mt-6",
                                )}
                                {...testimonial}
                            />
                        );
                    })}
                </div>
            )}
            {showMore && (
                <div
                    className={clsx(
                        "hidden landing-md:block landing-lg:hidden",
                        "columns-2 gap-6",
                    )}
                >
                    {testimonialsStartFromTwo.map((testimonial, index) => {
                        return (
                            <TestimonialCard
                                key={index}
                                className={clsx(
                                    "inline-block",
                                    "w-full",
                                    "mt-6",
                                )}
                                {...testimonial}
                            />
                        );
                    })}
                </div>
            )}
            <LandingSectionCtaButton
                className={clsx("cursor-pointer", "mt-6")}
                onClick={() => setShowMore((prev) => !prev)}
            >
                Show {showMore ? "less" : "more"}
            </LandingSectionCtaButton>
        </div>
    );
};

const TestimonialCard = ({
    name,
    title,
    description,
    img,
    link,
    className,
}) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                "appearance-none",
                "no-underline",
                "border dark:border-gray-700 border-gray-200",
                "rounded-3xl",
                className,
            )}
        >
            <div
                className={clsx(
                    "not-prose",
                    "h-full",
                    "flex flex-col",
                    "justify-between",
                    "gap-6",
                    "p-10",
                )}
            >
                <div
                    className={clsx(
                        "text-base",
                        "dark:text-gray-0 text-gray-900",
                    )}
                >
                    {description}
                </div>
                <div className={clsx("flex gap-4", "items-center")}>
                    <img
                        src={img}
                        alt={name}
                        className={clsx("w-12 h-12 rounded-full")}
                    />
                    <div className={clsx("flex flex-col")}>
                        <div
                            className={clsx(
                                "text-sm",
                                "dark:text-gray-400 text-gray-600",
                            )}
                        >
                            {name}
                        </div>
                        <div
                            className={clsx(
                                "text-sm",
                                "dark:text-gray-400 text-gray-600",
                            )}
                        >
                            {title}
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

const testimonials = [
    {
        title: "CEO - Resend",
        name: "Zeno Rocha",
        link: "https://twitter.com/zenorocha",
        description:
            "I find CRUD boring, but Refine makes it fun for developers again!",
        img: "https://pbs.twimg.com/profile_images/1403788917862719493/Sh07Etuf_400x400.jpg",
    },
    {
        title: "Author of React Hook Form",
        name: "Beier Luo",
        link: "https://twitter.com/HookForm",
        description:
            "Refine perfectly aligns with the philosophy of React Hook Form, and they work seamlessly together.",
        img: "https://pbs.twimg.com/profile_images/1403788917862719493/Sh07Etuf_400x400.jpg",
    },
    {
        title: "Sr. Software Engineer at Atlassian",
        name: "Daniel Del Core",
        link: "https://twitter.com/danieldelcore",
        description:
            "Refine has codemod support for major version transitions, making it easy for users to integrate new versions into their existing codebases seamlessly.",
        img: "https://pbs.twimg.com/profile_images/1403788917862719493/Sh07Etuf_400x400.jpg",
    },
    {
        title: "Founder - Tremor",
        name: "Christopher Kindl",
        link: "https://twitter.com/kindlaar",
        description:
            "Refine has one of the most convenient developer experiences (DX), giving me superpowers when it comes to developing modern web apps with security and flexibility in mind.",
        img: "https://pbs.twimg.com/profile_images/1403788917862719493/Sh07Etuf_400x400.jpg",
    },
    {
        title: "CEO - Medusa",
        name: "Nicklas Gellner",
        link: "https://twitter.com/NicklasGellner",
        description:
            "Medusa and Refine is a match for all developers looking for a strong open-source foundation. Check out the Refine SWAG store for a great Medusa implementation!",
        img: "https://pbs.twimg.com/profile_images/1403788917862719493/Sh07Etuf_400x400.jpg",
    },
    {
        title: "CEO - cerbos.dev",
        name: "Emre Baran",
        link: "https://cerbos.dev/about",
        description:
            "No enterprise or development team want to be confined by the limitation of a framework. Refine is one of those rare frameworks that strikes the balance perfectly right. Low code, easy to use but when needed fully customizable with a perfect escape hatch.",
        img: "https://pbs.twimg.com/profile_images/1403788917862719493/Sh07Etuf_400x400.jpg",
    },
    {
        title: "Founder - Cohorence",
        name: "Zachary Zaro",
        link: "https://twitter.com/ZacharyZaro",
        description: "npm create refine-app@latest => Boom!",
        img: "https://pbs.twimg.com/profile_images/1403788917862719493/Sh07Etuf_400x400.jpg",
    },
    {
        title: "Daisy UI - Founder",
        name: "Pouya Saadeghi",
        link: "https://twitter.com/Saadeghi",
        description:
            "I really like how refine gives the freedom to choose different stacks for back-end, front-end, and even UI libraries.",
        img: "https://pbs.twimg.com/profile_images/1403788917862719493/Sh07Etuf_400x400.jpg",
    },
    {
        title: "Founder - Next UI",
        name: "Junior Garcia",
        link: "https://twitter.com/jrgarciadev",
        description:
            "In Refine's headless way, the flexibility of the UI is impressive. The implementation of NextUI in Refine demonstrates this.",
        img: "https://pbs.twimg.com/profile_images/1403788917862719493/Sh07Etuf_400x400.jpg",
    },
    {
        title: "Founder - JS Mastery",
        name: "Adrian",
        link: "https://twitter.com/jsmasterypro/status/1721977998436675703?s=20",
        description:
            "Refine has truly transformed the app development process, making it incredibly efficient and hassle-free. With Refine, you can focus on your app's core features, not on the time-consuming tools setup, allowing you to do things that matter the most.",
        img: "https://pbs.twimg.com/profile_images/1403788917862719493/Sh07Etuf_400x400.jpg",
    },
];
