import { useBreadcrumb } from "@refinedev/core";
import { Link } from "react-router-dom";

export const Breadcrumb = () => {
    const { breadcrumbs } = useBreadcrumb();

    return (
        <ul style={{ display: "flex", gap: 24 }}>
            {breadcrumbs.map((breadcrumb) => {
                return (
                    <li key={`breadcrumb-${breadcrumb.label}`}>
                        {breadcrumb.href ? (
                            <Link
                                to={breadcrumb.href}
                                style={{ color: "blue" }}
                            >
                                {breadcrumb.label}
                            </Link>
                        ) : (
                            <span>{breadcrumb.label}</span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};
