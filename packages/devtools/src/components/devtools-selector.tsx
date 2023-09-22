import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "src/utilities/use-selector";
import { SelectorButtonIcon } from "./icons/selector-button";
import { SelectorBox } from "./selector-box";
import { SelectorHint } from "./selector-hint";

type Props = {
    onSelectorOpen: () => void;
    onHighlight: (name: string) => void;
    groupHover?: boolean;
};

export const DevtoolsSelector = ({
    onSelectorOpen,
    onHighlight,
    groupHover,
}: Props) => {
    const [active, setActive] = React.useState(false);
    const [hover, setHover] = React.useState(false);
    const { rect, name } = useSelector(active);

    const [selectorBoxRoot, setSelectorBoxRoot] =
        React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        if (!selectorBoxRoot) {
            const element = document.createElement("div");
            element.id = "selector-box-root";

            document.body.appendChild(element);

            setSelectorBoxRoot(element);
        }
    }, []);

    React.useEffect(() => {
        if (active) {
            document.body.style.cursor = "crosshair";
        } else {
            document.body.style.cursor = "default";
        }
    }, [active]);

    React.useEffect(() => {
        const onMouseClick = (e: MouseEvent) => {
            if (!active) return;
            if (!name) return;

            e?.preventDefault();
            e?.stopPropagation();
            e.stopImmediatePropagation();
            onHighlight(name);
            setActive(false);
        };

        if (active) {
            document.addEventListener("click", onMouseClick, {
                capture: true,
            });

            return () => {
                document.removeEventListener("click", onMouseClick, {
                    capture: true,
                });
            };
        }

        return () => 0;
    }, [name, onHighlight, active]);

    React.useEffect(() => {
        if (active) {
            onSelectorOpen();
        }
    }, [active, onSelectorOpen]);

    return (
        <div
            style={{
                position: "absolute",
                left: "calc((100px - ((100% - 42px) / 2)) + 7px)",
                top: "calc((100% - 28px) / 2)",
                transform: groupHover ? "translateX(0)" : "translateX(-40px)",
                transitionDuration: "0.2s",
                transitionProperty: "transform,opacity",
                transitionTimingFunction: "ease-in-out",
                pointerEvents: groupHover ? "auto" : "none",
                height: 28,
                width: 28,
            }}
        >
            <div
                role="button"
                title="Element Selector"
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    (document?.activeElement as HTMLElement)?.blur();
                    setActive((active) => !active);
                }}
                style={{
                    width: 28,
                    height: 28,
                    border: "none",
                    background: "none",
                    outline: "none",
                    margin: 0,
                    padding: 0,
                    cursor: "pointer",
                    transform: `scale(${hover ? 1.05 : 1})`,
                    transitionProperty: "transform,opacity",
                    transitionTimingFunction: "ease-in-out",
                    transitionDuration: "0.1s",
                    opacity: groupHover ? 1 : 0,
                }}
            >
                <SelectorButtonIcon
                    width={28}
                    height={28}
                    style={{ pointerEvents: "none" }}
                />
            </div>
            <SelectorHint active={active} groupHover={groupHover} />
            {active &&
                selectorBoxRoot &&
                createPortal(
                    <SelectorBox {...rect} name={name} />,
                    selectorBoxRoot,
                )}
        </div>
    );
};
