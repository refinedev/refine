import { ErrorMessage } from "@hookform/error-message";
import cn from "clsx";
import {
    forwardRef,
    SelectHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { get } from "react-hook-form";

import s from "./NativeSelect.module.css";

export type NativeSelectProps = {
    placeholder?: string;
    errors?: Record<string, unknown>;
    touched?: Record<string, unknown>;
    label: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
    (
        {
            placeholder = "Select...",
            errors,
            label,
            touched,
            className,
            children,
            required,
            ...props
        },
        ref,
    ) => {
        const innerRef = useRef<HTMLSelectElement>(null);
        const [isPlaceholder, setIsPlaceholder] = useState(false);

        useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
            ref,
            () => innerRef.current,
        );

        const hasError = props.name
            ? get(errors, props.name) && get(touched, props.name)
            : false;

        useEffect(() => {
            if (innerRef.current && innerRef.current.value === "") {
                setIsPlaceholder(true);
            } else {
                setIsPlaceholder(false);
            }
        }, [innerRef.current?.value]);

        return (
            <div
                onFocus={() => innerRef.current?.focus()}
                onBlur={() => innerRef.current?.blur()}
                className={cn(s.fieldset, className, {
                    "text-gray-500": isPlaceholder,
                })}
            >
                <label
                    htmlFor={props.name}
                    onClick={() => innerRef.current?.focus()}
                    className={cn(s.label, {
                        "!text-rose-500": hasError,
                    })}
                >
                    {label}
                    {required && <span className="text-rose-500">*</span>}
                </label>
                <select
                    ref={innerRef}
                    className={cn(s.select, {
                        "!border-rose-500 focus:!border-rose-500": hasError,
                    })}
                    {...props}
                >
                    <option value="">{placeholder}</option>
                    {children}
                </select>
                {hasError && props.name && (
                    <ErrorMessage
                        errors={errors}
                        name={props.name}
                        render={({ message }) => {
                            return (
                                <div className="pt-1 text-xs text-rose-500">
                                    <span>{message}</span>
                                </div>
                            );
                        }}
                    />
                )}
            </div>
        );
    },
);

NativeSelect.displayName = "NativeSelect";
