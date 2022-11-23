import cn from "clsx";

import { Cross, Plus, Minus } from "@components/icons";

import s from "./Quantity.module.css";

export interface QuantityProps {
    value: number;
    increase: () => void;
    decrease: () => void;
    handleRemove: React.MouseEventHandler<HTMLButtonElement>;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    max?: number;
}

export const Quantity: React.FC<QuantityProps> = ({
    value,
    increase,
    decrease,
    handleChange,
    handleRemove,
    max = 6,
}) => {
    return (
        <div className="flex h-9 flex-row">
            <button className={s.actions} onClick={handleRemove}>
                <Cross width={20} height={20} />
            </button>
            <label className="border-accent-2 ml-2 w-full border">
                <input
                    className={s.input}
                    onChange={
                        (e) =>
                            Number(e.target.value) < max + 1
                                ? handleChange(e)
                                : () => undefined // return empty object
                    }
                    value={value}
                    type="number"
                    max={max}
                    min="0"
                    readOnly
                />
            </label>
            <button
                type="button"
                onClick={decrease}
                className={s.actions}
                style={{ marginLeft: "-1px" }}
                disabled={value <= 1}
            >
                <Minus width={18} height={18} />
            </button>
            <button
                type="button"
                onClick={increase}
                className={cn(s.actions)}
                style={{ marginLeft: "-1px" }}
                disabled={value < 1 || value >= max}
                title={value < 1 || value >= max ? "Max quantity reached" : ""}
            >
                <Plus width={18} height={18} />
            </button>
        </div>
    );
};
