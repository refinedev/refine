import React from "react";
import { useReward } from "react-rewards";
import clsx from "clsx";

import { useCurrentTutorial } from "../../hooks/use-current-tutorial";
import { useTutorialChecklists } from "../../hooks/use-tutorial-checklists";
import { CheckListIcon } from "@site/src/refine-theme/icons/check-list";

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
                "rounded-lg",
                "border-l-gray-400 dark:border-l-gray-600",
                "dark:bg-gray-800 bg-gray-50",
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
                <div className="border-b border-gray-200 dark:border-gray-600">
                    <div
                        className={clsx(
                            "not-prose",
                            "mt-0 mb-3",
                            "flex items-center",
                            "gap-2",
                        )}
                    >
                        <CheckListIcon className="w-4 h-4" />
                        <h3
                            className={clsx(
                                "m-0 p-0",
                                "font-semibold",
                                "dark:text-gray-300 text-gray-500",
                                "uppercase",
                                "text-base leading-6",
                            )}
                        >
                            Checklist
                        </h3>
                    </div>
                </div>
                <div>{children}</div>
                <div className="flex items-center justify-center">
                    <div id={`checklist-${id}`} />
                </div>
            </div>
        </div>
    );
};

export default Checklist;
