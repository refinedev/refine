// import { ErrorMessage } from "@hookform/error-message";
import { ChevronDown } from "@icons";
import clsx from "clsx";
import {
    forwardRef,
    SelectHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { get } from "@pankod/refine-react-hook-form";

export type NativeSelectProps = {
    placeholder?: string;
    errors?: Record<string, unknown>;
    touched?: Record<string, unknown>;
} & SelectHTMLAttributes<HTMLSelectElement>;

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
    (
        {
            placeholder = "Select...",
            errors,
            touched,
            className,
            children,
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

        // const hasError = props.name
        //     ? get(errors, props.name) && get(touched, props.name)
        //     : false;

        useEffect(() => {
            if (innerRef.current && innerRef.current.value === "") {
                setIsPlaceholder(true);
            } else {
                setIsPlaceholder(false);
            }
        }, [innerRef.current?.value]);

        return (
            <div>
                <div
                    onFocus={() => innerRef.current?.focus()}
                    onBlur={() => innerRef.current?.blur()}
                    className={clsx(
                        "relative flex items-center text-base-regular border border-gray-200",
                        className,
                        {
                            "text-gray-500": isPlaceholder,
                        },
                    )}
                >
                    <select
                        ref={innerRef}
                        {...props}
                        className="appearance-none flex-1 bg-transparent border-none px-4 py-2.5 transition-colors duration-150 focus:border-gray-700 outline-none"
                    >
                        <option value="">{placeholder}</option>
                        {children}
                    </select>
                    <span className="absolute right-4 inset-y-0 flex items-center pointer-events-none">
                        <ChevronDown />
                    </span>
                </div>
                {/* {hasError && props.name && (
                    <ErrorMessage
                        errors={errors}
                        name={props.name}
                        render={({ message }) => {
                            return (
                                <div className="pt-1 pl-2 text-rose-500 text-xsmall-regular">
                                    <span>{message}</span>
                                </div>
                            );
                        }}
                    />
                )} */}
            </div>
        );
    },
);

NativeSelect.displayName = "NativeSelect";

export default NativeSelect;
