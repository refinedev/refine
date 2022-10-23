import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useReward } from "react-rewards";

const LoveIcon = (props) => (
    <svg
        width={20}
        height={18}
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.435 1.464a5 5 0 0 0-7.071 0L9.95 2.88 8.536 1.465a5 5 0 1 0-7.072 7.07l8.486 8.486 7.07-7.071 1.415-1.414a5 5 0 0 0 0-7.072Z"
            fill="#FF1818"
        />
    </svg>
);

const DiscordIcon = (props) => (
    <svg
        width={24}
        height={19}
        viewBox="0 0 24 19"
        fill="#9696B4"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M17.712 19s-.74-.973-1.356-1.832c2.692-.837 3.72-2.692 3.72-2.692a11.39 11.39 0 0 1-2.364 1.335 12.61 12.61 0 0 1-2.98.972c-1.972.407-3.78.294-5.321-.022a16.074 16.074 0 0 1-3.02-.973 11.563 11.563 0 0 1-1.5-.769c-.062-.045-.124-.068-.186-.113a.287.287 0 0 1-.082-.068c-.37-.226-.575-.384-.575-.384s.986 1.81 3.596 2.669C7.027 17.983 6.267 19 6.267 19 1.726 18.842 0 15.562 0 15.562 0 8.279 2.959 2.375 2.959 2.375 5.918-.068 8.733 0 8.733 0l.205.272C5.24 1.448 3.534 3.235 3.534 3.235s.452-.272 1.213-.656C6.945 1.516 8.692 1.222 9.41 1.154c.123-.023.226-.045.35-.045a15.807 15.807 0 0 1 4.15-.046c1.952.25 4.048.882 6.185 2.172 0 0-1.623-1.697-5.117-2.873L15.268 0s2.815-.068 5.774 2.375c0 0 2.959 5.904 2.959 13.187 0 0-1.747 3.28-6.288 3.438ZM8.158 8.437c-1.172 0-2.096 1.131-2.096 2.51 0 1.38.945 2.511 2.096 2.511 1.17 0 2.095-1.13 2.095-2.51.021-1.38-.924-2.511-2.095-2.511Zm7.5 0c-1.172 0-2.096 1.131-2.096 2.51 0 1.38.945 2.511 2.096 2.511 1.17 0 2.095-1.13 2.095-2.51s-.924-2.511-2.095-2.511Z" />
    </svg>
);

const TwitterIcon = (props) => (
    <svg
        width={24}
        height={20}
        viewBox="0 0 24 20"
        fill="#9696B4"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 2.368a9.618 9.618 0 0 1-2.827.794A5.038 5.038 0 0 0 23.338.37a9.698 9.698 0 0 1-3.129 1.223A4.856 4.856 0 0 0 16.616 0c-2.718 0-4.922 2.26-4.922 5.049 0 .396.042.78.126 1.15C7.728 5.988 4.1 3.979 1.67.922a5.14 5.14 0 0 0-.666 2.54c0 1.751.87 3.297 2.19 4.203a4.834 4.834 0 0 1-2.23-.63v.062c0 2.447 1.697 4.488 3.951 4.95a4.693 4.693 0 0 1-1.297.178c-.317 0-.627-.03-.927-.09.626 2.006 2.444 3.466 4.599 3.505A9.722 9.722 0 0 1 0 17.733 13.708 13.708 0 0 0 7.548 20c9.058 0 14.01-7.692 14.01-14.365 0-.22-.005-.439-.013-.654.962-.712 1.797-1.6 2.455-2.613Z"
        />
    </svg>
);

const GithubIcon = (props) => (
    <svg
        width={22}
        height={22}
        viewBox="0 0 22 22"
        fill="#9696B4"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.053 0A10.904 10.904 0 0 0 3.89 2.685 11.34 11.34 0 0 0 .142 9.472a11.48 11.48 0 0 0 1.456 7.65 11.087 11.087 0 0 0 5.964 4.86c.556.103.752-.25.752-.547v-1.918C5.23 20.202 4.58 18 4.58 18a3.012 3.012 0 0 0-1.227-1.655c-.997-.692.081-.692.081-.692.35.05.683.18.975.382.293.202.536.469.713.78.15.278.352.523.595.721a2.312 2.312 0 0 0 2.618.221c.042-.57.283-1.105.678-1.509-2.454-.284-5.03-1.253-5.03-5.539a4.415 4.415 0 0 1 1.132-3.025A4.194 4.194 0 0 1 5.224 4.7s.928-.305 3.036 1.156c1.81-.508 3.72-.508 5.531 0 2.108-1.46 3.03-1.156 3.03-1.156.406.936.455 1.993.135 2.963a4.415 4.415 0 0 1 1.132 3.026c0 4.334-2.582 5.282-5.043 5.538.264.271.468.597.598.955.13.358.182.741.155 1.122V21.4c0 .367.196.65.759.54a11.093 11.093 0 0 0 5.88-4.878 11.481 11.481 0 0 0 1.419-7.6 11.34 11.34 0 0 0-3.71-6.746A10.907 10.907 0 0 0 11.053 0Z"
        />
    </svg>
);

const LinkedinIcon = (props) => (
    <svg
        width={19}
        height={19}
        viewBox="0 0 19 19"
        fill="#9696B4"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M18 0H.75A.75.75 0 0 0 0 .75V18c0 .415.335.75.75.75H18a.75.75 0 0 0 .75-.75V.75A.75.75 0 0 0 18 0ZM5.562 15.977H2.78V7.03h2.782v8.948ZM4.172 5.805a1.612 1.612 0 1 1 0-3.224 1.612 1.612 0 0 1 0 3.224Zm11.805 10.172h-2.78v-4.352c0-1.038-.018-2.372-1.445-2.372-1.447 0-1.67 1.13-1.67 2.297v4.427H7.306V7.03h2.668v1.223h.037c.37-.703 1.277-1.446 2.632-1.446 2.817 0 3.335 1.854 3.335 4.263v4.908Z"
        />
    </svg>
);

const RedditIcon = (props) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 35 31"
        fill="#9696B4"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M34.417 15.935a3.67 3.67 0 0 0-6.213-2.64 17.968 17.968 0 0 0-9.814-3.113l1.672-7.863 5.46 1.162a2.621 2.621 0 1 0 .27-1.283L19.687.9a.655.655 0 0 0-.776.504l-1.867 8.775a18.022 18.022 0 0 0-9.96 3.11 3.669 3.669 0 1 0-4.038 5.992 7.237 7.237 0 0 0-.082 1.11c0 5.646 6.567 10.222 14.678 10.222 8.11 0 14.678-4.576 14.678-10.222 0-.37-.03-.738-.086-1.103a3.67 3.67 0 0 0 2.182-3.353ZM9.256 18.556a2.621 2.621 0 1 1 5.242 0 2.621 2.621 0 0 1-5.242 0Zm14.614 6.926c-1.788 1.782-5.216 1.926-6.224 1.926s-4.437-.14-6.223-1.926a.68.68 0 1 1 .961-.96c1.127 1.127 3.54 1.527 5.262 1.527 1.723 0 4.135-.4 5.265-1.528a.68.68 0 1 1 .96.961Zm-.46-4.305a2.621 2.621 0 1 1 0-5.242 2.621 2.621 0 0 1 0 5.242Z"
        />
    </svg>
);

export default function FooterLayout({
    style,
    links,
    logo,
    copyright,
    legalLinks,
    socialLinks,
}) {
    const { siteConfig } = useDocusaurusContext();
    const { customFields } = siteConfig;
    const { footerDescription } = customFields;
    const { reward: leftReward, isAnimating: leftIsAnimating } = useReward(
        "leftReward",
        "emoji",
        {
            emoji: ["🔥", "⭐", "❤️"],
            angle: 45,
            elementCount: 80,
            startVelocity: 45,
            decay: 0.95,
            lifetime: 150,
        },
    );
    const { reward: rightReward, isAnimating: rightIsAnimating } = useReward(
        "rightReward",
        "emoji",
        {
            emoji: ["💙", "💜", "🧡", "💖"],
            angle: 135,
            elementCount: 80,
            startVelocity: 45,
            decay: 0.95,
            lifetime: 150,
        },
    );

    return (
        <footer className="refine-footer px-4 md:px-6 pt-7 pb-24 lg:pt-10 lg:pb-24">
            <div className="max-w-6xl mx-auto flex flex-col gap-5">
                <div>{logo && <div>{logo}</div>}</div>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-20">
                    <div
                        className="flex-shrink-0 max-w-full lg:max-w-[280px] w-full font-montserrat text-xs text-[#9696B4] tracking-wide"
                        dangerouslySetInnerHTML={{ __html: footerDescription }}
                    />
                    <div className="flex-1">{links}</div>
                </div>
                <div className="h-2.5 border-0 border-b-2 w-full border-solid border-b-[#9696B4]" />
                <div className="flex flex-col-reverse gap-6 lg:gap-0 lg:flex-row">
                    <div className="flex-1">
                        <div className="flex items-center text-[#9696B4] text-[11px] sm:text-xs leading-[12px] font-montserrat justify-center lg:justify-start">
                            © {new Date().getFullYear()}, refine from Delaware to wherever
                            you&apos;re with{" "}
                            <LoveIcon
                                className="ml-2"
                                onClick={() => {
                                    leftReward();
                                    rightReward();
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row gap-6 sm:gap-0">
                        <div className="flex-[2] flex justify-center sm:justify-start lg:justify-end items-center gap-4 text-[#9696B4] text-xs h-[18px] font-montserrat">
                            {legalLinks?.items?.map?.((item, i) => (
                                <a
                                    key={i}
                                    href={item.to}
                                    className="text-[#9696B4]"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                        <div className="flex-[3] flex justify-center sm:justify-end items-center gap-3 text-[#9696B4] text-xs h-[18px] font-montserrat">
                            <span>Join us on</span>
                            {socialLinks?.items?.map?.((socialLink, i) => (
                                <a
                                    key={i}
                                    className="w-[22px] h-[22px]"
                                    href={socialLink.href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {socialLink.label === "github" && (
                                        <GithubIcon className="w-[22px] h-[22px] hover:fill-[#171515]" />
                                    )}
                                    {socialLink.label === "twitter" && (
                                        <TwitterIcon className="w-[22px] h-[22px] hover:fill-[#1DA1F2]" />
                                    )}
                                    {socialLink.label === "linkedin" && (
                                        <LinkedinIcon className="w-[22px] h-[22px] hover:fill-[#0077B5]" />
                                    )}
                                    {socialLink.label === "discord" && (
                                        <DiscordIcon className="w-[22px] h-[22px] hover:fill-[#5865F2]" />
                                    )}
                                    {socialLink.label === "reddit" && (
                                        <RedditIcon className="w-[22px] h-[22px] hover:fill-[#FF4300]" />
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <span
                className="fixed -left-10 bottom-[20vh] z-10 "
                id="leftReward"
            />
            <span
                className="fixed -right-10 bottom-[20vh] z-10 "
                id="rightReward"
            />
        </footer>
    );
}
