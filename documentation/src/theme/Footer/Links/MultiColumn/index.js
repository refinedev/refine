import React from "react";
import LinkItem from "@theme/Footer/LinkItem";
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
            <LinkItem item={item} className="text-[#9696B4]" />
        </li>
    );
}
function Column({ column }) {
    return (
        <div className="text-[#9696B4] text-xs leading-[24px] font-montserrat">
            <div className="font-extrabold mb-1 tracking-wide">
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
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-auto lg:grid-flow-col max-w-[460px] ml-auto mr-auto lg:mr-0 place-content-center lg:place-content-end gap-4">
            {columns.map((column, i) => (
                <Column key={i} column={column} />
            ))}
        </div>
    );
}
