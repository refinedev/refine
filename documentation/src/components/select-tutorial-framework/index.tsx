import React from "react";
import {
    PreferredUIPackage,
    availableUIPackages,
} from "../../context/TutorialUIPackageContext/index";
import { useTutorialUIPackage } from "../../hooks/use-tutorial-ui-package";
import styles from "./styles.module.css";
import clsx from "clsx";

type CardProps = {
    name: string;
    title?: string;
    selected?: boolean;
    onClick?: () => void;
};

const coloredIconUrl =
    "https://refine.ams3.digitaloceanspaces.com/website/static/icons/colored/ui-framework-";

const grayscaleIconUrl =
    "https://refine.ams3.digitaloceanspaces.com/website/static/icons/grayscale/ui-framework-";

const Card = ({ name, title, selected, onClick }: CardProps) => (
    <button
        type="button"
        onClick={onClick}
        className={clsx(
            "rounded-lg",
            "p-4",
            "flex flex-col",
            "justify-between",
            "items-center",
            "gap-3",
            "shadow-lg",
            "border-2 dark:border-gray-700 border-gray-200",
            selected && "dark:border-refine-blue border-refine-blue",
        )}
    >
        <img
            className="max-w-[48px] mt-2 mb-2"
            src={`${selected ? coloredIconUrl : grayscaleIconUrl}${name}.svg`}
            alt={title}
            width="100%"
            height="100%"
        />
        {title && (
            <span
                className={clsx(
                    "text-gray-500",
                    "dark:text-gray-600",
                    selected && "text-gray-900 dark:text-gray-0",
                )}
            >
                {title}
            </span>
        )}
    </button>
);

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
                        name={uiPackage}
                        selected={preferred === uiPackage}
                        onClick={() => setPreferred(uiPackage)}
                    />
                ))}
            </div>
        </div>
    );
};
