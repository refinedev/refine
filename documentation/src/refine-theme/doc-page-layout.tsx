import clsx from "clsx";
import React from "react";
import Head from "@docusaurus/Head";

import { CommonFooter } from "./common-footer";
import { DocHeader } from "./doc-header";
import { DocSidebar } from "./doc-sidebar";

type Props = React.PropsWithChildren<{}>;

export const DocPageLayout = ({ children }: Props) => {
    return (
        <>
            <DocHeader />
            <Head>
                <script
                    async={true}
                    src="https://widget.kapa.ai/kapa-widget.bundle.js"
                    data-website-id="fa91d75a-5c82-4272-a893-a21d92245578"
                    data-project-logo="https://refine.ams3.cdn.digitaloceanspaces.com/assets/refine-ai-bot-logo.png"
                    data-project-name="Refine"
                    data-project-color="#303450"
                    data-modal-image="https://refine.ams3.cdn.digitaloceanspaces.com/assets/refine-white-icon.png"
                    data-modal-header-bg-color="#303450"
                    data-modal-title-color="#ffffff"
                    data-button-border-radius="100%"
                    data-button-text-font-size="0px"
                    data-button-text-color="#303450"
                    data-button-bg-color="transparent"
                    data-button-text=""
                    data-button-box-shadow="none"
                    data-button-image-height="60px"
                    data-button-image-width="60px"
                    data-modal-title=""
                />
            </Head>
            <div
                className={clsx(
                    "flex items-start justify-start",
                    "w-full flex-1",
                    // "max-w-[1664px]",
                    "mx-auto",
                )}
            >
                <DocSidebar />
                {children}
            </div>
            <CommonFooter />
        </>
    );
};
