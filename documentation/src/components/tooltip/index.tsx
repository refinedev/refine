import React, { FC, PropsWithChildren, ReactNode } from "react";
import styles from "./styles.module.css";

type Props = {
    label?: ReactNode;
};

const Tooltip: FC<PropsWithChildren<Props>> = ({ label, children }) => {
    if (!label) return <>{children}</>;

    return (
        <div className={`${styles.tooltip} group`}>
            {children}
            <div className={`${styles.tooltipContainer} group-hover:visible`}>
                <span className={styles.tooltipContent}>{label}</span>
                <div className={styles.tooltipArrow} />
            </div>
        </div>
    );
};

export default Tooltip;
