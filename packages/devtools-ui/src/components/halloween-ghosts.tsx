import React from "react";
import clsx from "clsx";
import useIsInViewport from "use-is-in-viewport";

/**
 * Original code for this component is forked from https://codepen.io/Calleb/pen/WNJBmej
 * Thanks to the original author for the awesome work!
 */

export const HalloweenGhosts = () => {
    const ran = React.useRef(false);
    const element = React.useRef<HTMLDivElement | null>(null);
    const [isInViewport, targetRef] = useIsInViewport({ threshold: 50 });
    const [loaded, setLoaded] = React.useState(false);

    const callback = React.useCallback(() => {
        const wrapper = document.querySelector("#re-devtools-ui-layout");
        const randomBrio = (window as any).gsap.utils.random(3, 6, 1, true);

        for (let i = 0; i < 30; i++) {
            const ghost = element.current?.childNodes[0].cloneNode(
                true,
            ) as HTMLElement | null;

            if (ghost) wrapper?.append(ghost);

            const brio = randomBrio();

            (window as any).gsap.to(ghost, {
                repeat: 1,
                yoyo: true,
                repeatDelay: 5,
                keyframes: {
                    y: [100, ...Array(brio).fill("random(800, 50)")],
                    "0%": { opacity: 0, filter: "blur(10px)" },
                    "10%": {
                        opacity: "random(0.2, 0.7)",
                        filter: "blur(0px)",
                    },
                    "90%": {
                        opacity: "random(0.2, 0.7)",
                    },
                    "100%": {
                        opacity: 0,
                    },
                },
                x: window.innerWidth,
                duration: 4,
                delay: "random(0, 5)",
                ease: "none",
                scale: "random(0.1, 0.5)",
                rotation: "random(-20, 20)",
            });
        }
    }, []);

    React.useEffect(() => {
        const isElementAlreadyLoaded = document.querySelector(
            "#halloween-ghosts-script",
        );
        if (isElementAlreadyLoaded) return;
        const script = document.createElement("script");
        script.id = "halloween-ghosts-script";
        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";

        script.onload = () => {
            setLoaded(true);
        };

        element.current?.insertAdjacentElement("afterend", script);
    }, []);

    React.useEffect(() => {
        if (!loaded) return;
        if (!isInViewport) return;
        if (ran.current) return;
        callback();
        ran.current = true;
    }, [loaded, isInViewport, callback]);

    return (
        <>
            <div
                id="halloween-ghost-template"
                className={clsx(
                    "re-w-0 re-h-0",
                    "re-opacity-0",
                    "re-fixed",
                    "re-bottom-0",
                    "re-right-0",
                )}
                ref={(ref) => {
                    element.current = ref;
                    targetRef(ref);
                }}
            >
                <div
                    className={clsx(
                        "halloween-ghost",
                        "re-fixed",
                        "re-z-[999999]",
                        "re-w-[100px]",
                        "re-h-[100px]",
                        "re-opacity-0",
                        "re-blur-0",
                        "re-select-none",
                        "re-pointer-events-none",
                        "re-will-change-[transform,opacity,filter]",
                    )}
                >
                    <svg
                        className="halloween-ghost-svg re-w-full re-h-auto"
                        viewBox="0 0 50 50"
                    >
                        <path
                            fill="url(#halloween-ghosts-gradient)"
                            d="M46.4,29.6C41.2,15,34.2,2,24.6,1.9C15.1,2,8.1,15,2.9,29.6C-2,44.5,5.4,47.8,24.6,47.7C43.9,47.8,51.3,44.5,46.4,29.6z M19.5,26.3c-1.9,0-3.4-2.4-3.4-5.4s1.5-5.4,3.4-5.4c1.9,0,3.4,2.4,3.4,5.4S21.4,26.3,19.5,26.3z M29.8,26.3c-1.9,0-3.4-2.4-3.4-5.4 s1.5-5.4,3.4-5.4s3.4,2.4,3.4,5.4S31.6,26.3,29.8,26.3z"
                        />
                    </svg>
                </div>
            </div>
            <svg className="re-w-0 re-h-0 fixed left-0 top-0">
                <linearGradient
                    id="halloween-ghosts-gradient"
                    gradientUnits="userSpaceOnUse"
                    x1="25"
                    y1="2"
                    x2="25"
                    y2="50"
                >
                    <stop
                        offset="0"
                        style={{
                            stopColor: "#FFFFFF",
                            stopOpacity: 0.5,
                        }}
                    />
                    <stop
                        offset="1"
                        style={{
                            stopColor: "#FFFFFF",
                            stopOpacity: 0,
                        }}
                    />
                </linearGradient>
            </svg>
        </>
    );
};
