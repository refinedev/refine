import { MouseEventHandler } from "react";
import cn from "clsx";

import { ArrowLeft, ArrowRight } from "@components/icons";

import s from "./ProductSliderControl.module.css";

interface ProductSliderControl {
    onPrev: MouseEventHandler<HTMLButtonElement>;
    onNext: MouseEventHandler<HTMLButtonElement>;
}

export const ProductSliderControl: React.FC<ProductSliderControl> = ({
    onPrev,
    onNext,
}) => (
    <div className={s.control}>
        <button
            className={cn(s.leftControl)}
            onClick={onPrev}
            aria-label="Previous Product Image"
        >
            <ArrowLeft />
        </button>
        <button
            className={cn(s.rightControl)}
            onClick={onNext}
            aria-label="Next Product Image"
        >
            <ArrowRight />
        </button>
    </div>
);
