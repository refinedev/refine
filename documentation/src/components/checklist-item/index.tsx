import React from "react";
import { useCurrentTutorial } from "../../hooks/use-current-tutorial";
import { useTutorialChecklists } from "../../hooks/use-tutorial-checklists";

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
        <div className="mb-3 flex items-center gap-1 flex-wrap">
            <div className="flex-shrink-0 w-5 h-5">
                <button
                    type="button"
                    onClick={handleToggle}
                    className="w-5 h-5 p-0 appearance-none border border-solid rounded border-slate-300 bg-white flex justify-center items-center"
                >
                    {checked && (
                        <CheckIcon
                            width={16}
                            height={16}
                            className="text-sky-700"
                        />
                    )}
                </button>
            </div>
            <div className={checked ? "line-through" : ""}>{children}</div>
        </div>
    );
};

export default ChecklistItem;
