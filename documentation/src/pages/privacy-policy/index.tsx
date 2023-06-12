import React from "react";
import Head from "@docusaurus/Head";
import { BlogFooter } from "@site/src/refine-theme/blog-footer";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import clsx from "clsx";

const PrivacyPolicy: React.FC = () => {
    return (
        <CommonLayout>
            <Head title="Privacy Policy | refine">
                <html data-page="privacy_policy" data-customized="true" />
            </Head>
            <div className="refine-prose">
                <CommonHeader hasSticky={true} />
                <div
                    className={clsx(
                        "xl:max-w-[944px] xl:py-16",
                        "lg:max-w-[912px] lg:py-10",
                        "md:max-w-[624px] md:pb-6 pt-6",
                        "sm:max-w-[480px]",
                        "max-w-[328px]",
                        "w-full mx-auto",
                    )}
                >
                    <h1>Privacy Policy</h1>
                    <p>
                        Pankod built the refine as an Open Source software. This
                        SERVICE is provided by Pankod at no cost and is intended
                        for use as is.
                    </p>

                    <p>
                        This page is used to inform visitors regarding our
                        policies with the collection, use, and disclosure of
                        Personal Information if anyone decided to use our
                        Service.
                    </p>

                    <p>
                        If you choose to use our Service, then you agree to the
                        collection and use of information in relation to this
                        policy. The Personal Information that we collect is used
                        for providing and improving the Service. We will not use
                        or share your information with anyone except as
                        described in this Privacy Policy.
                    </p>

                    <p>
                        The terms used in this Privacy Policy have the same
                        meanings as in our Terms and Conditions, which is
                        accessible at refine unless otherwise defined in this
                        Privacy Policy.
                    </p>

                    <h3>Information Collection and Use</h3>

                    <p>
                        For a better experience, while using our Service, we may
                        require you to provide us with certain personally
                        identifiable information. The information that we
                        request will be retained by us and used as described in
                        this privacy policy.
                    </p>

                    <h3>Service Providers</h3>

                    <p>
                        We may employ third-party companies and individuals due
                        to the following reasons:
                    </p>

                    <ul>
                        <li>To facilitate our Service;</li>
                        <li>To provide the Service on our behalf;</li>
                        <li>To perform Service-related services; or</li>
                        <li>
                            To assist us in analyzing how our Service is used.
                        </li>
                    </ul>

                    <p>
                        We want to inform users of this Service that these third
                        parties have access to your Personal Information. The
                        reason is to perform the tasks assigned to them on our
                        behalf. However, they are obligated not to disclose or
                        use the information for any other purpose.
                    </p>

                    <h3>Security</h3>

                    <p>
                        We value your trust in providing us your Personal
                        Information, thus we are striving to use commercially
                        acceptable means of protecting it. But remember that no
                        method of transmission over the internet, or method of
                        electronic storage is 100% secure and reliable, and we
                        cannot guarantee its absolute security.
                    </p>

                    <h3>Links to Other Sites</h3>

                    <p>
                        This Service may contain links to other sites. If you
                        click on a third-party link, you will be directed to
                        that site. Note that these external sites are not
                        operated by us. Therefore, we strongly advise you to
                        review the Privacy Policy of these websites. We have no
                        control over and assume no responsibility for the
                        content, privacy policies, or practices of any
                        third-party sites or services.
                    </p>

                    <h3>Children’s Privacy</h3>

                    <p>
                        These Services do not address anyone under the age of
                        13. We do not knowingly collect personally identifiable
                        information from children under 13 years of age. In the
                        case we discover that a child under 13 has provided us
                        with personal information, we immediately delete this
                        from our servers. If you are a parent or guardian and
                        you are aware that your child has provided us with
                        personal information, please contact us so that we will
                        be able to do necessary actions.
                    </p>

                    <h3>Changes to This Privacy Policy</h3>

                    <p>
                        We may update our Privacy Policy from time to time.
                        Thus, you are advised to review this page periodically
                        for any changes. We will notify you of any changes by
                        posting the new Privacy Policy on this page. <br />
                        This policy is effective as of 2021-11-05
                    </p>

                    <h3>Contact Us</h3>

                    <p>
                        If you have any questions or suggestions about our
                        Privacy Policy, do not hesitate to contact us at
                        <a className="ml-1" href="mailto:info@refine.dev">
                            info@refine.dev
                        </a>
                        .
                    </p>
                </div>
                <BlogFooter />
            </div>
        </CommonLayout>
    );
};

export default PrivacyPolicy;
