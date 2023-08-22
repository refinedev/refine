import { useBreadcrumb } from "@refinedev/core";
import { Link } from "react-router-dom";

export const Breadcrumb = () => {
    const { breadcrumbs } = useBreadcrumb();

    return (
        <div className="text-sm breadcrumbs">
            <ul>
                {breadcrumbs?.map((breadcrumb) => {
                    return (
                        <li key={`breadcrumb-${breadcrumb?.label}`}>
                            <span className="mx-2">{breadcrumb?.icon}</span>
                            {breadcrumb?.href ? (
                                <Link to={breadcrumb?.href}>
                                    {breadcrumb?.label}
                                </Link>
                            ) : (
                                <span>{breadcrumb?.label}</span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
