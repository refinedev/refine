import React from "react";
import { RefineIcon } from "./refine-icon";

export const Loading: React.FC<{ loading?: boolean }> = ({ loading }) => {
    const [loadingDuration] = React.useState(550);
    const [settled, setSettled] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setSettled(true);
        }, loadingDuration * 2);
    }, [loadingDuration]);

    if (settled) {
        return null;
    }

    return (
        <div
            className="refine-loading__overlay"
            style={{
                animationIterationCount: loading ? 0 : 1,
                animationDuration: `${loadingDuration}ms`,
                animationDelay: `${loadingDuration}ms`,
            }}
        >
            <div style={{ height: "40px" }}>
                <RefineIcon />
            </div>
            <div className="refine-loading__progress">
                <div
                    className="refine-loading__progress-bar"
                    style={{
                        animationIterationCount: loading ? 0 : 1,
                        animationDuration: `${loadingDuration}ms`,
                    }}
                />
            </div>
        </div>
    );
};
