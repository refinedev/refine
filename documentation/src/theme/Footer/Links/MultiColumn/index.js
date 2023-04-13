import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import LinkItem from "@theme/Footer/LinkItem";
import React from "react";

function ColumnLinkItem({ item }) {
    return item.html ? (
        <li
            className="footer__item"
            // Developer provided the HTML, so assume it's safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: item.html }}
        />
    ) : (
        <li key={item.href ?? item.to} className="footer__item">
            <LinkItem item={item} className="text-[#000]" />
        </li>
    );
}
function Column({ column }) {
    return (
        <div className="text-[#000] text-xs leading-[24px] font-montserrat">
            <div className="mb-1 font-extrabold tracking-wide">
                {column.title}
            </div>
            <ul className="footer__items clean-list">
                {column.items.map((item, i) => (
                    <ColumnLinkItem key={i} item={item} />
                ))}
            </ul>
        </div>
    );
}
export default function FooterLinksMultiColumn({ columns }) {
    const { siteConfig } = useDocusaurusContext();
    const { customFields } = siteConfig;
    const { contactTitle, contactDescription, contactEmail } = customFields;

    return (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-[750px] lg:mr-0 place-content-center lg:place-content-end gap-4">
            {columns.map((column, i) => (
                <Column key={i} column={column} />
            ))}
            <div className="text-[#000] text-xs leading-[24px] font-montserrat col-span-3 md:col-span-1 lg:col-span-2 max-w-[216px]">
                <div className="mb-1 font-extrabold tracking-wide">
                    {contactTitle}
                </div>
                <div>
                    {contactDescription.map((item, i) => (
                        <div key={i} className="leading-[18px]">
                            {item}
                        </div>
                    ))}
                </div>
                <div className="mt-2">
                    <a
                        className="text-[#000] no-underline"
                        href={`mailto:${contactEmail}`}
                    >
                        {contactEmail}
                    </a>
                </div>
            </div>
        </div>
    );
}
