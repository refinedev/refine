import React from "react";
import { useReward } from "react-rewards";

import { useCurrentTutorial } from "../../hooks/use-current-tutorial";
import { useTutorialChecklists } from "../../hooks/use-tutorial-checklists";

const CheckMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-check-circle"
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
        <div className="rounded px-6 py-5 bg-sky-100 mb-7">
            <h3 className="text-2xl font-bold text-sky-600 mb-4 flex items-center flex-wrap gap-2">
                <CheckMarkIcon className="w-7 h-7" /> Checklist
            </h3>
            <div>{children}</div>
            <div className="flex items-center justify-center">
                <div id={`checklist-${id}`} />
            </div>
        </div>
    );
};

export default Checklist;
