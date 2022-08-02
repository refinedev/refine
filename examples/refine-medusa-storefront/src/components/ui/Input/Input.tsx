import cn from "clsx";
import s from "./Input.module.css";
import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input: React.FC<InputProps> = (props) => {
    const { className, children, ...rest } = props;

    const rootClassName = cn(s.root, {}, className);

    return (
        <label>
            <input
                className={rootClassName}
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
