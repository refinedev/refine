/* eslint-disable react/jsx-no-target-blank */
import React from "react";

const PromotionBanner = ({ image, title, description }) => {
    const renderDescription = description ?? (
        <div>
            Meet the headless, React-based solution to build sleek <b>CRUD</b>{" "}
            applications. With refine, you can be confident that your codebase
            will always stay clean and boilerplate-free.
            <br />
            <br />
            Try{" "}
            <a href="https://github.com/refinedev/refine" target="_blank">
                refine
            </a>{" "}
            to rapidly build your next <b>CRUD</b> project, whether {"it's"} an
            admin panel, dashboard, internal tool or storefront.
        </div>
    );

    return (
        <div className="banner-container">
            <div className="banner-header">
                {title ?? "Does your CRUD app need server state management?"}
            </div>

            {renderDescription}
            <div>
                <a href="https://github.com/refinedev/refine" target="_blank">
                    <img
                        src={image ?? "/img/generic_banner.png"}
                        alt="refine blog logo"
                    />
                </a>
            </div>
            <br />
        </div>
    );
};

export default PromotionBanner;
