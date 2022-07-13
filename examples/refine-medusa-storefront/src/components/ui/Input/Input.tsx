import cn from "clsx";
import s from "./Input.module.css";
import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    onChange?: (...args: any[]) => any;
}

const Input: React.FC<InputProps> = (props) => {
    const { className, children, onChange, ...rest } = props;

    const rootClassName = cn(s.root, {}, className);

    const handleOnChange = (e: any) => {
        if (onChange) {
            onChange(e.target.value);
        }
        return null;
    };

    return (
        <label>
            <input
                className={rootClassName}
                onChange={handleOnChange}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                {...rest}
            />
        </label>
    );
};

export default Input;
