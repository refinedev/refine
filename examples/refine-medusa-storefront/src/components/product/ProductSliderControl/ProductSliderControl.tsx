import { FC, MouseEventHandler, memo } from "react";
import cn from "clsx";
import s from "./ProductSliderControl.module.css";
import { ArrowLeft, ArrowRight } from "@components/icons";

interface ProductSliderControl {
    onPrev: MouseEventHandler<HTMLButtonElement>;
    onNext: MouseEventHandler<HTMLButtonElement>;
}

const ProductSliderControl: FC<ProductSliderControl> = ({ onPrev, onNext }) => (
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

export default memo(ProductSliderControl);
