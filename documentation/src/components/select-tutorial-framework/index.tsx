import React from "react";
import {
    PreferredUIPackage,
    availableUIPackages,
} from "../../context/TutorialUIPackageContext/index";
import { useTutorialUIPackage } from "../../hooks/use-tutorial-ui-package";
import styles from "./styles.module.css";
import clsx from "clsx";

type CardProps = {
    iconPath: string;
    title?: string;
    selected?: boolean;
    onClick?: () => void;
};

const Card = ({ iconPath, title, selected, onClick }: CardProps) => (
    <button
        type="button"
        onClick={onClick}
        className={clsx(styles.card, selected && styles.cardSelected)}
    >
        <img
            className={!selected ? styles.cardGray : undefined}
            src={iconPath}
            alt={title}
            width="100%"
            height="100%"
        />
        {title && <span>{title}</span>}
    </button>
);

const icons: Record<PreferredUIPackage, string> = {
    headless: "/img/tutorial-cards/headless-icon.svg",
    antd: "/img/tutorial-cards/antd-icon.svg",
    mui: "/img/tutorial-cards/mui-icon.svg",
    mantine: "/img/tutorial-cards/mantine-icon.svg",
    "chakra-ui": "/img/tutorial-cards/chakra-icon.svg",
};

const names: Record<PreferredUIPackage, string> = {
    headless: "Headless",
    antd: "Ant Design",
    mui: "Material UI",
    mantine: "Mantine",
    "chakra-ui": "Chakra UI",
};

export const SelectTutorialFramework = ({ small }) => {
    const { preferred, setPreferred } = useTutorialUIPackage();

    return (
        <div>
            <div className={clsx(styles.cards, small && styles.cardsSmall)}>
                {availableUIPackages.map((uiPackage) => (
                    <Card
                        key={uiPackage}
                        title={small ? undefined : names[uiPackage]}
                        iconPath={icons[uiPackage]}
                        selected={preferred === uiPackage}
                        onClick={() => setPreferred(uiPackage)}
                    />
                ))}
            </div>
        </div>
    );
};
