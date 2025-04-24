import Head from "@docusaurus/Head";
import { BlogFooter } from "@site/src/refine-theme/blog-footer";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <CommonLayout>
      <Head title="Terms of Service | Refine">
        <html data-page="terms_of_service" data-customized="true" />
      </Head>
      <div className="refine-prose">
        <CommonHeader hasSticky={true} />

        <div className="flex-1 flex flex-col pt-8 lg:pt-16 pb-32 max-w-[800px] w-full mx-auto px-2">
          <h1>Terms of Service</h1>
          <p>Last Updated: April 21, 2025</p>
          <p>
            {`These Terms of Service ("Terms") are a legal agreement between you ("you" or "User") and Refine Development Inc. ("RefineAI," "we," or "us"). These Terms govern your use of RefineAI and any related sites, services, and applications offered by RefineAI (collectively, the "Services"). By using the Services, you agree to these Terms and our Privacy Policy.`}
          </p>
          <h2>{"1. Use of the Services"}</h2>
          <p>
            {
              "Subject to these Terms, RefineAI grants you a limited, non-exclusive, non-transferable license to access and use the Services. You must comply with all applicable laws, rules, and regulations."
            }
          </p>
          <p>{"You may not:"}</p>
          <ul className="mt-0">
            <li>
              {
                "Reverse engineer, copy, modify, or create derivative works based on the Services."
              }
            </li>
            <li>
              {
                "Use the Services for any unlawful, harmful, or abusive purpose."
              }
            </li>
            <li>{"Use the Services to compete with RefineAI."}</li>
            <li>{"Share your account or allow unauthorized use."}</li>
          </ul>
          <h2>{"2. Ownership and Intellectual Property"}</h2>
          <p>
            {
              "We retain all rights, title, and interest in and to the Services, including all intellectual property rights. Except for the limited license granted to you, these Terms do not convey any right or interest in or to RefineAI’s content or technology."
            }
          </p>
          <p>
            {
              "You own all rights to any content, code, or applications you independently create using the Services, except for underlying AI models, platform software, and other proprietary technologies of RefineAI."
            }
          </p>
          <h2>{"3. AI-Generated Output"}</h2>
          <p>{`Our platform may generate code, text, or other output based on your inputs ("AI Output"). You are solely responsible for reviewing and validating all AI Output before using it. RefineAI makes no warranties as to the accuracy, completeness, or suitability of any AI Output.`}</p>
          <h2>{"4. Account Security"}</h2>
          <p>
            {
              "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Notify us immediately of any unauthorized use or breach of security."
            }
          </p>
          <h2>{"5. Fees and Payment"}</h2>
          <p>
            {
              "Some parts of the Services may be offered for a fee. All fees are non-refundable unless otherwise stated. You authorize us to charge your payment method on a recurring basis."
            }
          </p>
          <p>
            {
              "We may change pricing or subscription plans at any time with prior notice."
            }
          </p>
          <h2>{"6. Termination"}</h2>
          <p>
            {
              "We may suspend or terminate your access to the Services at any time for any reason, including violation of these Terms. Upon termination, your right to use the Services will cease immediately."
            }
          </p>
          <h2>{"7. Disclaimers"}</h2>
          <p>{`THE SERVICES AND AI OUTPUT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, REFINEAI DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.`}</p>
          <h2>{"8. Limitation of Liability"}</h2>
          <p>
            {
              "TO THE MAXIMUM EXTENT PERMITTED BY LAW, REFINE DEVELOPMENT INC., ITS AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, OR AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR USE, ARISING OUT OF OR RELATED TO THE SERVICES OR THESE TERMS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES."
            }
          </p>
          <p>
            {
              "OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE SERVICES SHALL NOT EXCEED THE GREATER OF: (A) AMOUNTS PAID BY YOU TO REFINEAI IN THE TWELVE MONTHS PRECEDING THE CLAIM; OR (B) $50."
            }
          </p>
          <h2>{"9. Indemnification"}</h2>
          <p>
            {
              "You agree to indemnify, defend, and hold harmless RefineAI and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of your use of the Services, your content, your violation of these Terms, or your violation of any rights of another."
            }
          </p>
          <h2>{"10. Governing Law"}</h2>
          <p>
            {
              "These Terms are governed by the laws of the State of California, without regard to its conflict of law principles. Any legal action must be brought in the state or federal courts located in Contra Costa County, California."
            }
          </p>
          <h2>{"11. Modifications"}</h2>
          <p>
            {
              "We may revise these Terms at any time. Changes will be effective when posted on our site. Your continued use of the Services after any changes constitutes your acceptance of the revised Terms."
            }
          </p>
          <h2>{"12. Contact Us"}</h2>
          <p>
            {"If you have any questions about these Terms, contact us at:"}{" "}
            <a href="mailto:info@refine.dev">info@refine.dev</a>
          </p>
        </div>
        <BlogFooter />
      </div>
    </CommonLayout>
  );
};

export default TermsOfService;
