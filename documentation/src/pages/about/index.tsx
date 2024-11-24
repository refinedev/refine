import Head from "@docusaurus/Head";
import { FooterRedditIcon as RedditIcon } from "@site/src/refine-theme/icons/footer-reddit";
import { BlogFooter } from "@site/src/refine-theme/blog-footer";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { Istanbul500Icon } from "@site/src/refine-theme/icons/500";
import { GithubIcon } from "@site/src/refine-theme/icons/github";
import { MailIcon } from "@site/src/refine-theme/icons/mail";
import { MarkerIcon } from "@site/src/refine-theme/icons/marker";
import { DiscordIcon, XIcon } from "@site/src/refine-theme/icons/popover";
import { YCombinatorCircleIcon } from "@site/src/refine-theme/icons/ycombinator-circle";
import { SenovoIcon } from "@site/src/refine-theme/icons/senovo";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { backedBy } from "../../assets/backed-by";
import { team } from "../../assets/team";
import { useColorMode } from "@docusaurus/theme-common";
import { CommonThemedImage } from "@site/src/refine-theme/common-themed-image";

const About: React.FC = () => {
  return (
    <>
      <Head title="About | Refine">
        <html lang="en" data-page="about" data-customized="true" />
      </Head>
      <div className="refine-prose">
        <CommonHeader hasSticky={true} />
        <Hero />
        <AboutUs />
        <Socials />
        <OurTeam />
        <BackedBy />
        <WeAreHere />
        <BlogFooter />
      </div>
    </>
  );
};

const Hero = () => {
  return (
    <div
      className={clsx(
        "not-prose",
        "w-full",
        "landing-md:max-w-[740px]",
        "landing-sm:max-w-[640px]",
        "max-w-[544px]",
        "pt-0 landing-sm:pt-8 landing-lg:pt-20",
        "pb-8 landing-sm:pb-12 landing-md:pb-20 landing-lg:pb-[120px]",
        "text-center landing-md:text-start",
        "mx-auto",
      )}
    >
      <h1
        className={clsx(
          "font-semibold",
          "!mb-0",
          "text-gray-900 dark:text-gray-0",
          "text-[32px] leading-10",
        )}
      >
        We&apos;re helping organizations to build better web applications, in{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r text-gradient-to-r from-[#0FBDBD] to-[#26D97F]">
          less time
        </span>
        , with{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r text-gradient-to-r from-[#FF9933] to-[#FF4C4D]">
          fewer resources
        </span>
        .
      </h1>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className={clsx("max-w-[1120px]", "mx-auto w-full")}>
      <div
        className={clsx(
          "flex flex-col xl:flex-row",
          "gap-6 landing-sm:gap-12 xl:gap-16",
        )}
      >
        <div
          className={clsx(
            "not-prose",
            "mx-auto flex items-center justify-center",
            "w-full",
            "px-6 landing-sm:p-0",
            "max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[912px] landing-xl:max-w-[576px]",
          )}
        >
          <img
            className="rounded-[12px]"
            src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/about/images/about2.png"
            alt="Refine App"
          />
        </div>
        <div
          className={clsx(
            "mx-auto flex flex-col xl:justify-center",
            "w-full",
            "max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[912px] landing-xl:max-w-[480px]",
          )}
        >
          <div
            className={clsx(
              "not-prose",
              "px-6 sm:px-6 md:px-10 xl:px-0",
              "dark:text-gray-300 text-gray-600",
            )}
          >
            <p className="text-base mb-5">
              Shortly after its initial release on September 2021, Refine has
              gained attraction of open-source community and has become
              increasingly popular among web application frameworks.
            </p>
            <p className="text-base mb-5">
              With the aim of sustaining the growth and expanding the user base,
              the project was backed by prominent VC’s and angel investors on
              May 2022.
            </p>
            <p className="text-base mb-5">
              Today, the US-based company has an international team of 10+
              members leading the development of the open-core and building new
              products for the ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Socials = () => {
  return (
    <div
      className={clsx(
        "max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1120px]",
        "w-full",
        "mx-auto",
        "mt-8 landing-sm:mt-12 landing-md:mt-20",
        "pl-6 pr-6 landing-md:pr-0 landing-md:pl-10",
      )}
    >
      <div
        className={clsx(
          "w-full",
          "flex flex-col landing-md:flex-row",
          "items-end",
          "gap-6 landing-md:gap-10",
        )}
      >
        <div
          className={clsx(
            "flex-shrink-0",
            "landing-md:w-[382px] landing-lg:w-[508px]",
            "flex flex-col gap-6 lg:flex-row",
          )}
        >
          <div>
            <p className="mb-6 font-semibold text-gray-900 dark:text-white text-2xl">
              Open-source contributions have always been a major part of
              refine’s success.
            </p>

            <p className="mb-0 text-base text-gray-900 dark:text-gray-300">
              We are grateful for all contributors who are developing core
              features, making bug-fixes, building community extensions, writing
              documentation, reporting issues and giving their constructive
              feedback.
            </p>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <div
            className={clsx(
              "flex flex-col justify-center",
              "landing-sm:grid landing-sm:grid-cols-[repeat(2,276px)] landing-md:grid-cols-[repeat(2,204px)]",
              "gap-4 landing-lg:gap-6",
              "landing-lg:pl-8",
              "shrink-0",
              "w-full",
            )}
          >
            <SocialButton type="discord" />
            <SocialButton type="github" />
            <SocialButton type="reddit" />
            <SocialButton type="x" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialButton = (props: {
  type: "discord" | "github" | "reddit" | "x";
}) => {
  const { colorMode } = useColorMode();

  const variant = {
    discord: {
      icon: <DiscordIcon className="text-2xl" width="24px" height="24px" />,
      url: "https://discord.gg/refine",
      title: "Join our",
      label: "Discord Server",
      glowColor: "#5561E5",
      gradientDark:
        "linear-gradient(150deg,#626FF2 0%, rgba(48, 52, 80, 1) 40%)",
      gradientLight: "linear-gradient(150deg,#626FF2 0%, #DEE5ED 45%)",
    },
    github: {
      icon: (
        <GithubIcon
          className="text-2xl text-gray-900 dark:text-gray-0 flex-shrink-0"
          width="24px"
          height="24px"
        />
      ),
      url: "https://github.com/refinedev/refine",
      title: "Visit our",
      label: "GitHub Repo",
      glowColor: "#9A9CAA",
      gradientDark:
        "linear-gradient(150deg,#D6DADE 0%, rgba(48, 52, 80, 1) 30%)",
      gradientLight: "linear-gradient(150deg,#D7DADF 0%, #DEE5ED 45%)",
    },
    reddit: {
      icon: (
        <RedditIcon
          className="text-2xl"
          width="24px"
          height="24px"
          color="#FF4500"
        />
      ),
      url: "https://reddit.com/r/refine",
      title: "Follow us on",
      label: "Reddit",
      glowColor: "#A53D24",
      gradientDark:
        "linear-gradient(150deg,#FF4500 0%, rgba(48, 52, 80, 1) 40%)",
      gradientLight: "linear-gradient(150deg,#EF9273 0%, #DEE5ED 45%)",
    },
    x: {
      icon: <XIcon className="text-2xl" width="24px" height="24px" />,
      url: "https://x.com/refine_dev",
      title: "Follow us on",
      label: "X",
      glowColor: "#9A9CAA",
      gradientDark:
        "linear-gradient(150deg,#D6DADE 0%, rgba(48, 52, 80, 1) 30%)",
      gradientLight: "linear-gradient(150deg,#D7DADF 0%, #DEE5ED 45%)",
    },
  };

  return (
    <a
      target="_blank"
      href={variant[props.type].url}
      rel="noreferrer"
      className={clsx(
        "relative",
        "h-max w-full",
        "flex",
        "dark:bg-gray-900 bg-white",
        "no-underline hover:no-underline",
        "rounded-2xl",
        "overflow-hidden",
        "p-[1px]",
      )}
    >
      <div
        className={clsx(
          "z-[3]",
          "absolute",
          "inset-0 -left-[4px]",
          "w-[25%] h-[50%]",
          "border-l-2 border-t-2 border-solid",
          "blur-[12px]",
        )}
        style={{
          borderColor: variant[props.type].glowColor,
        }}
      />
      <div
        className={clsx("z-[1]", "absolute", "inset-0")}
        style={{
          background:
            colorMode === "dark"
              ? variant[props.type].gradientDark
              : variant[props.type].gradientLight,
        }}
      />
      <div
        className={clsx(
          "z-[2]",
          "w-full",
          "dark:bg-gray-900 bg-gray-0",
          "p-4 rounded-2xl",
          "flex flex-row",
          "justify-start",
          "gap-3",
        )}
      >
        <div>{variant[props.type].icon}</div>
        <div
          className={clsx(
            "text-xs md:text-base",
            "flex landing-md:flex-col",
            "items-center landing-md:items-start",
            "gap-1",
          )}
        >
          <div className="mb-0 text-gray-500 dark:text-gray-400">
            {variant[props.type].title}
          </div>
          <div className="text-gray-900 dark:text-gray-0 no-underline hover:no-underline">
            {variant[props.type].label}
          </div>
        </div>
      </div>
    </a>
  );
};

const OurTeam = () => {
  return (
    <div
      className={clsx(
        "not-prose",
        "landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
        "max-w-[514px]",
        "w-full mx-auto",
      )}
    >
      <h4
        className={clsx(
          "text-[32px] leading-10",
          "text-center text-gray-900 dark:text-white",
          "mt-12 landing-md:mt-20",
          "mb-0",
          "font-semibold",
        )}
      >
        Our Team
      </h4>

      <div
        className={clsx(
          "flex flex-wrap",
          "justify-center",
          "gap-8 landing-md:gap-10",
          "align-top",
          "not-prose",
        )}
      >
        {team.map(({ name, avatar, role1, linkedin }) => (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            key={name}
            className={clsx(
              "not-prose",
              "block",
              "flex justify-start flex-col text-center not-prose",
              "w-[150px] landing-md:w-[250px]",
              "hover:no-underline no-underline",
            )}
          >
            <img
              srcSet={`${avatar} 1500w`}
              src={avatar}
              alt={name}
              className="w-full m-0 mb-6"
            />
            <div
              className={clsx(
                "text-xs leading-4",
                "lg:text-base lg:leading-6",
                "text-gray-900 dark:text-gray-0 font-semibold",
              )}
            >
              {name}
            </div>
            <div
              className={clsx(
                "text-xs leading-4",
                "lg:text-base lg:leading-6",
                "text-gray-500 dark:text-gray-400",
              )}
            >
              {role1}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const BackedBy = () => {
  return (
    <div className={clsx("w-full mx-auto", "not-prose")}>
      <h4
        className={clsx(
          "text-[32px] leading-10",
          "text-center text-gray-900 dark:text-white",
          "mt-12 landing-md:mt-20",
          "mb-12",
          "font-semibold",
        )}
      >
        Backed by
      </h4>

      <div
        className={clsx(
          "flex justify-center items-center w-full gap-10",
          "flex-wrap",
          "px-6",
          "mb-12",
        )}
      >
        <div
          className={clsx("flex flex-col justify-center items-center gap-6")}
        >
          <div
            className={clsx(
              "flex justify-center items-center",
              "w-[144px] h-[144px]",
              "md:w-[192px] md:h-[192px]",
              "rounded-full",
              "bg-gray-900 dark:bg-gray-0",
              "shrink-0",
            )}
          >
            <Istanbul500Icon className="text-gray-0 dark:text-gray-700 h-auto w-[102px] md:w-[136px]" />
          </div>
          <span
            className={clsx(
              "text-xs md:text-base",
              "text-gray-900 dark:text-gray-0",
              "font-semibold",
            )}
          >
            500 Emerging Europe
          </span>
        </div>

        <div
          className={clsx("flex flex-col justify-center items-center gap-4")}
        >
          <div
            className={clsx(
              "flex justify-center items-center",
              "w-[144px] h-[144px]",
              "md:w-[192px] md:h-[192px]",
              "rounded-full",
              "bg-gray-900 dark:bg-gray-0",
              "shrink-0",
            )}
          >
            <YCombinatorCircleIcon />
          </div>
          <span
            className={clsx(
              "text-xs md:text-base",
              "text-gray-900 dark:text-gray-0",
              "font-semibold",
            )}
          >
            Y Combinator
          </span>
        </div>

        <div
          className={clsx("flex flex-col justify-center items-center gap-6")}
        >
          <div
            className={clsx(
              "flex justify-center items-center",
              "w-[144px] h-[144px]",
              "md:w-[192px] md:h-[192px]",
              "shrink-0",
            )}
          >
            <SenovoIcon />
          </div>
          <span
            className={clsx(
              "text-xs md:text-base",
              "text-gray-900 dark:text-gray-0",
              "font-semibold",
            )}
          >
            Senovo
          </span>
        </div>
      </div>

      <div
        className={clsx(
          "w-full mx-auto",
          "max-w-[456px] landing-sm:max-w-[720px] landing-lg:max-w-max",
          "flex flex-wrap",
          "px-4",
          "gap-x-8 landing-sm:gap-x-12 landing-md:gap-x-12",
          "gap-y-6",
          "align-top",
          "items-start justify-center",
        )}
      >
        {backedBy.map(({ name, avatar, role1, role2 }) => (
          <div
            key={name}
            className={clsx(
              "h-full",
              "flex justify-start flex-col text-center",
              "w-[120px] landing-sm:w-[160px]",
            )}
          >
            <CommonThemedImage
              className="w-full not-prose m-0 mb-6"
              srcDark={avatar.dark}
              srcLight={avatar.light}
              srcSetDark={`${avatar.dark} 1500w`}
              srcSetLight={`${avatar.light} 1500w`}
              alt={name}
            />
            <span
              className={clsx(
                "text-xs leading-4",
                "lg:text-base lg:leading-6",
                "text-gray-900 dark:text-gray-0 font-semibold",
              )}
            >
              {name}
            </span>
            <span
              className={clsx(
                "text-xs leading-4",
                "lg:text-base lg:leading-6",
                "text-gray-500 dark:text-gray-400",
              )}
            >
              {role1}
            </span>
            {role2 && (
              <span
                className={clsx(
                  "text-xs",
                  "landing-sm:text-sm",
                  "landing-lg:text-base",
                  "text-gray-500 dark:text-gray-400",
                )}
              >
                {role2}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const WeAreHere = () => {
  return (
    <div
      className={clsx(
        "px-6 py-12 landing-md:py-20",
        "mx-auto",
        "w-full",
        "not-prose",
      )}
    >
      <h4
        className={clsx(
          "text-[32px] leading-10",
          "text-center text-gray-900 dark:text-white",
          "mb-12 mt-0",
          "font-semibold",
        )}
      >
        We are Here
      </h4>

      <div
        className={clsx(
          "flex flex-col landing-lg:flex-row-reverse",
          "justify-center items-start landing-sm:items-center landing-lg:items-start ",
          "gap-6 landing-lg:gap-20",
        )}
      >
        <div className="max-w-[792px] w-full shrink-0">
          <Link to="https://goo.gl/maps/D4NZ5gn6VsWaRtXT6">
            <img
              className="m-0 p-0"
              src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/about/images/we-are-here.png"
              alt="Refine Office"
            />
          </Link>
        </div>
        <div
          className={clsx(
            "flex flex-col landing-sm:flex-row landing-lg:flex-col",
            "justify-start items-start",
            "gap-6 landing-sm:gap-10",
            "landing-lg:mt-8",
          )}
        >
          <div className="flex w-max items-center justify-center gap-6">
            <div
              className={clsx(
                "flex justify-center items-center",
                "w-[48px] h-[48px]",
                "rounded-full ",
                "bg-refine-red/20",
                "shrink-0",
              )}
            >
              <MarkerIcon className="text-refine-red" />
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              256 Chapman Road STE 105-4 <br />
              Newark, DE 19702
            </span>
          </div>
          <div className="flex justify-center items-center gap-6">
            <div
              className={clsx(
                "flex justify-center items-center",
                "w-[48px] h-[48px]",
                "rounded-full ",
                "dark:bg-refine-blue-alt/20 bg-refine-blue/20",
                "shrink-0",
              )}
            >
              <MailIcon className="dark:text-refine-blue-alt text-refine-blue" />
            </div>
            <a
              href="mailto:info@refine.dev"
              className="text-gray-600 dark:text-gray-400 hover:no-underline no-underline"
            >
              info@refine.dev
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AboutPage() {
  return (
    <CommonLayout>
      <About />
    </CommonLayout>
  );
}
