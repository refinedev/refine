import Link from "@docusaurus/Link";
import { motion, MotionValue, useTransform } from "framer-motion";
import React, { FC } from "react";
import { TWBreakpoints } from "../../../hooks/use-tw-breakpoints";

import { BackendIcons } from "../icons";
import { HeaderMobile } from "./header";

const backendItems = [
    {
        name: "Nestjs",
        Icon: BackendIcons.Nestjs,
        AltIcon: BackendIcons.NestjsAlt,
    },
    {
        name: "Airtable",
        Icon: BackendIcons.Airtable,
        AltIcon: BackendIcons.AirtableAlt,
    },
    {
        name: "Strapi",
        Icon: BackendIcons.Strapi,
        AltIcon: BackendIcons.StrapiAlt,
    },
    {
        name: "Supabase",
        Icon: BackendIcons.Supabase,
        AltIcon: BackendIcons.SupabaseAlt,
    },
    {
        name: "Hasura",
        Icon: BackendIcons.Hasura,
        AltIcon: BackendIcons.HasuraAlt,
    },
    {
        name: "Nhost",
        Icon: BackendIcons.Nhost,
        AltIcon: BackendIcons.NhostAlt,
    },
    {
        name: "Appwrite",
        Icon: BackendIcons.Appwrite,
        AltIcon: BackendIcons.AppwriteAlt,
    },
    {
        name: "Medusa",
        Icon: BackendIcons.Medusa,
        AltIcon: BackendIcons.MedusaAlt,
    },
    {
        name: "Firebase",
        Icon: BackendIcons.Firebase,
        AltIcon: BackendIcons.FirebaseAlt,
    },
    {
        name: "Directus",
        Icon: BackendIcons.Directus,
        AltIcon: BackendIcons.DirectusAlt,
    },
    {
        name: "Altogic",
        Icon: BackendIcons.Altogic,
        AltIcon: BackendIcons.AltogicAlt,
    },
    {
        name: "Node",
        Icon: BackendIcons.Node,
        AltIcon: BackendIcons.NodeAlt,
    },
    {
        name: "Python",
        Icon: BackendIcons.Python,
        AltIcon: BackendIcons.PythonAlt,
    },
    {
        name: "Json",
        Icon: BackendIcons.Json,
        AltIcon: BackendIcons.JsonAlt,
    },
    {
        name: "GraphQL",
        Icon: BackendIcons.Graphql,
        AltIcon: BackendIcons.GraphqlAlt,
    },
];

interface Props {
    scrollYProgress: MotionValue<number>;
    twBreakpoints: TWBreakpoints;
}

const OnBackend: FC<Props> = ({ scrollYProgress, twBreakpoints }) => {
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.4, 0.5],
        [0, 0, 1, 0],
    );

    return (
        <motion.div
            className="lg:snap-start flex flex-col items-center justify-center h-auto lg:h-screen pt-0 lg:pt-[11rem]"
            style={twBreakpoints.lg ? { opacity } : {}}
            whileInView={
                twBreakpoints.lg
                    ? {}
                    : {
                          opacity: 1,
                      }
            }
        >
            {!twBreakpoints.lg && <HeaderMobile>On Backend</HeaderMobile>}
            <div className="flex flex-col-reverse items-center justify-center w-full h-full max-w-screen-xl gap-8 md:flex-col md:gap-16">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 w-[calc(100vw-32px)] lg:max-w-5xl sm:w-full px-4 -mx-4 sm:mx-0 gap-4 lg:gap-6">
                    {backendItems.map(({ name, Icon, AltIcon }, index) => (
                        <motion.div
                            key={name}
                            style={{
                                boxShadow:
                                    "6px 8px 16px 0 rgba(42, 42, 66, 0.4)",
                            }}
                            viewport={{
                                margin: "30px",
                            }}
                            whileInView={
                                twBreakpoints.lg
                                    ? undefined
                                    : {
                                          opacity: [0, 1],
                                          scale: [0, 1],
                                      }
                            }
                            className={`group relative w-full h-10 md:h-20 lg:h-[65px] bg-white rounded-[10px] ${
                                index === backendItems.length - 1
                                    ? "col-span-2 max-w-[50%] sm:max-w-none sm:col-span-1 mx-auto sm:mx-0"
                                    : ""
                            } ${name === "Python" ? "pt-1.5" : "pt-0"}`}
                        >
                            <div className="flex items-center justify-center w-full h-full transition-all duration-300 scale-100 opacity-100 group-hover:opacity-0 group-hover:scale-0">
                                <AltIcon className="scale-50 lg:scale-75" />
                            </div>
                            <div
                                className={`opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 absolute left-0 ${
                                    name === "Python" ? "top-1" : "top-0"
                                } w-full h-full flex justify-center items-center`}
                            >
                                <Icon className="scale-50 lg:scale-75" />
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="font-montserrat text-base 2xl:text-xl leading-4 md:leading-8 font-medium text-[#2A2A42] text-center max-w-[860px]">
                    <p className="mb-0">
                        <strong className="font-bold">refine</strong> connects
                        to any custom{" "}
                        <strong className="font-bold">REST</strong> or{" "}
                        <strong className="font-bold">GraphQL</strong> API.
                    </p>
                    <p className="mb-0">
                        It also includes ready-made integrations for{" "}
                        <strong className="font-bold">30+</strong> popular
                        backend services.{" "}
                        <Link
                            className="no-underline text-[#1890FF] visited:text-[#1890FF]"
                            to="/integrations"
                        >
                            (SEE ALL)
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default OnBackend;
