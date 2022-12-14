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

    const imgBase =
        image ??
        "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/generic_banner.png";

    const imgUrl = imgBase.startsWith("http")
        ? imgBase
        : `https://refine.ams3.cdn.digitaloceanspaces.com/website/static${
              imgBase.startsWith("/") ? imgBase : `/${imgBase}`
          }`;

    return (
        <div className="banner-container">
            <div className="banner-header">
                {title ?? "Does your CRUD app need server state management?"}
            </div>

            {renderDescription}
            <div>
                <a href="https://github.com/refinedev/refine" target="_blank">
                    <img src={imgUrl} alt="refine blog logo" />
                </a>
            </div>
            <br />
        </div>
    );
};

export default PromotionBanner;
