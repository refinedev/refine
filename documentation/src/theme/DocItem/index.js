import React from "react";
import { HtmlClassNameProvider } from "@docusaurus/theme-common";
import { DocProvider } from "@docusaurus/theme-common/internal";
import DocItemMetadata from "@theme/DocItem/Metadata";
import DocItemLayout from "@theme/DocItem/Layout";
import { TutorialUIPackageProvider } from "../../context/TutorialUIPackageContext/index";
import { TutorialChecklistProvider } from "../../context/TutorialChecklistContext";
export default function DocItem(props) {
    const docHtmlClassName = `docs-doc-id-${props.content.metadata.unversionedId}`;
    const MDXComponent = props.content;
    return (
        <DocProvider content={props.content}>
            <TutorialUIPackageProvider>
                <TutorialChecklistProvider>
                    <HtmlClassNameProvider className={docHtmlClassName}>
                        <DocItemMetadata />
                        <DocItemLayout>
                            <MDXComponent />
                        </DocItemLayout>
                    </HtmlClassNameProvider>
                </TutorialChecklistProvider>
            </TutorialUIPackageProvider>
        </DocProvider>
    );
}
