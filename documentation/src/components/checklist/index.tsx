import React from "react";
import { useReward } from "react-rewards";

import { useCurrentTutorial } from "../../hooks/use-current-tutorial";
import { useTutorialChecklists } from "../../hooks/use-tutorial-checklists";
import clsx from "clsx";

const CheckMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-check-circle pointer-events-none"
        {...props}
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4 12 14.01l-3-3" />
    </svg>
);

type Props = React.PropsWithChildren<{}>;

const Checklist: React.FC<Props> = ({ children }) => {
    const mounted = React.useRef(false);
    const { id } = useCurrentTutorial();
    const [celebrated, setCelebrated] = React.useState(false);

    const { items } = useTutorialChecklists();
    const { reward } = useReward(`checklist-${id}`, "confetti", {
        angle: 90,
        elementCount: 120,
        startVelocity: 30,
        decay: 0.95,
        spread: 100,
        position: "absolute",
        lifetime: 150,
    });

    const tutorialChecks = items.find((item) => item.id === id);

    const allChecked = tutorialChecks?.checklist.every((item) => item.checked);

    React.useEffect(() => {
        setTimeout(() => {
            mounted.current = true;
        }, 1000);
    }, []);

    React.useEffect(() => {
        if (!celebrated && allChecked && mounted.current) {
            setCelebrated(true);
            reward();
        }
    }, [allChecked, celebrated]);

    return (
        <div
            className={clsx(
                "bg-refine-link bg-opacity-10 border-l-refine-link",
            )}
        >
            <div
                className={clsx(
                    "border-l-4",
                    "border-l-solid",
                    "border-l-inherit",
                    "rounded-tl-lg",
                    "rounded-bl-lg",
                    "p-4",
                    "flex flex-col",
                )}
            >
                <h3
                    className={clsx(
                        "font-semibold",
                        "mt-0",
                        "flex items-center",
                        "gap-3",
                        "dark:text-gray-300 text-gray-500",
                        "uppercase",
                        "text-lg",
                    )}
                >
                    <CheckMarkIcon className="w-7 h-7" /> Checklist
                </h3>
                <div>{children}</div>
                <div className="flex items-center justify-center">
                    <div id={`checklist-${id}`} />
                </div>
            </div>
        </div>
    );
};

export default Checklist;
