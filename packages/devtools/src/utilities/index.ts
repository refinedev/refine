import { Placement } from "src/interfaces/placement";

export const getPanelToggleTransforms = (visible: boolean) => {
    return visible ? "scaleX(1) translateY(0)" : `scaleX(0) translateY(25vw)`;
};

export const SIZE = 50;
export const BUFFER = 10;

const PREFERRED_DEFAULT_WIDTH = 800;
const PREFERRED_DEFAULT_HEIGHT = 520;

export const MIN_PANEL_WIDTH = 640;
export const MIN_PANEL_HEIGHT = 360;

const verticalCenterTransform = `translateY(calc((100vh - ${SIZE}px) / 2))`;
const horizontalCenterTransform = `translateX(calc((100vw - ${
    SIZE * 2
}px) / 2))`;
const rightAlignTransform = `translateX(calc((100vw - ${SIZE}px) - ${BUFFER}px))`;
const leftAlignTransform = `translateX(${BUFFER}px)`;
const topAlignTransform = `translateY(${BUFFER}px)`;
const bottomAlignTransform = `translateY(calc((100vh - ${SIZE}px) - ${0}px))`;

export const getPinTransform = (placement: Placement) => {
    switch (placement) {
        case "left":
            return `${leftAlignTransform} ${verticalCenterTransform}`;
        case "right":
            return `${rightAlignTransform} ${verticalCenterTransform}`;
        case "top":
            return `${topAlignTransform} ${horizontalCenterTransform}`;
        default:
        case "bottom":
            return `${bottomAlignTransform} ${horizontalCenterTransform}`;
    }
};

export const getPinButtonTransform = (hover?: boolean) => {
    return `translateY(${hover ? "0" : "50%"})`;
};

export const getPanelPosition = (placement: Placement) => {
    switch (placement) {
        case "left":
            return {
                left: `calc(${SIZE}px + ${BUFFER}px)`,
                top: "50%",
                transform: "translateY(-50%)",
            };
        case "right":
            return {
                right: `calc(${SIZE}px + ${BUFFER}px)`,
                top: "50%",
                transform: "translateY(-50%)",
            };
        case "top":
            return {
                left: "50%",
                top: `calc(${SIZE}px + ${BUFFER}px)`,
                transform: "translateX(-50%)",
            };
        default:
        case "bottom":
            return {
                left: "50%",
                bottom: `calc(${SIZE}px + ${BUFFER}px)`,
                transform: "translateX(-50%)",
            };
    }
};

export const getMaxPanelWidth = (placement: Placement) => {
    switch (placement) {
        case "left":
        case "right":
            return -BUFFER - SIZE - BUFFER + window.innerWidth - BUFFER;
        case "top":
        case "bottom":
            return -BUFFER + window.innerWidth - BUFFER;
    }
};

export const getMaxPanelHeight = (placement: Placement) => {
    switch (placement) {
        case "left":
        case "right":
            return -BUFFER + window.innerHeight - BUFFER;
        case "top":
        case "bottom":
            return -BUFFER - SIZE - BUFFER + window.innerHeight - BUFFER;
    }
};

export const getDefaultPanelSize = (
    placement: Placement,
    preferredSize: { width: number; height: number } = {
        width: PREFERRED_DEFAULT_WIDTH,
        height: PREFERRED_DEFAULT_HEIGHT,
    },
): { width: number; height: number } => {
    const maxPanelWidth = getMaxPanelWidth(placement);
    const maxPanelHeight = getMaxPanelHeight(placement);

    const width = Math.min(maxPanelWidth, preferredSize.width);
    const height = Math.min(maxPanelHeight, preferredSize.height);

    return {
        width: width,
        height: height,
    };
};
