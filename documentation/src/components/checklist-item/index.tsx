import React from "react";
import { useCurrentTutorial } from "../../hooks/use-current-tutorial";
import { useTutorialChecklists } from "../../hooks/use-tutorial-checklists";
import clsx from "clsx";

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-check"
        {...props}
    >
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

type Props = React.PropsWithChildren<{ id: string }>;

const ChecklistItem: React.FC<Props> = ({ children, id: checkId }) => {
    const { id } = useCurrentTutorial();

    const { items, toggle } = useTutorialChecklists();

    const tutorialChecks = items.find((item) => item.id === id);

    const checked = tutorialChecks?.checklist.find(
        (item) => item.id === checkId,
    )?.checked;

    const handleToggle = () => {
        toggle(id, checkId);
    };

    return (
        <label
            className={clsx(
                "mt-4",
                "flex",
                "items-start",
                "flex-nowrap",
                "gap-2",
                "cursor-pointer",
            )}
        >
            <div className="flex-shrink-0 w-5 h-5 mt-[4px]">
                <button
                    type="button"
                    onClick={handleToggle}
                    className="checklist-item__button"
                >
                    {checked && (
                        <CheckIcon
                            width={16}
                            height={16}
                            className="checklist-item__icon"
                        />
                    )}
                </button>
            </div>
            <div
                className={clsx(
                    checked && "line-through dark:text-gray-400 text-gray-500",
                    !checked && "text-gray-900 dark:text-gray-0",
                )}
            >
                {children}
            </div>
        </label>
    );
};

export default ChecklistItem;
