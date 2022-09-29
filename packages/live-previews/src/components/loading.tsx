import React from "react";
import {
    RefineSmallIconInner,
    RefineSmallIconOuter,
} from "./refine-small-icon";

export const Loading: React.FC<{ loading?: boolean }> = ({ loading }) => {
    return (
        <div
            className="refine-loading__overlay"
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                animationIterationCount: loading ? 0 : 1,
                animationDuration: `200ms`,
            }}
        >
            <div
                className="refine-loading__spinner"
                style={{ height: "50px", position: "relative" }}
            >
                <RefineSmallIconOuter />
                <RefineSmallIconInner
                    className="refine-loading__spinner-inner"
                    style={{ position: "absolute", left: 0, top: 0 }}
                />
            </div>
        </div>
    );
};
