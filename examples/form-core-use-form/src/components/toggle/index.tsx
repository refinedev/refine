import { FC } from "react";

interface Props {
    checkedLabel?: string;
    uncheckedLabel?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const Toggle: FC<Props> = ({
    checked,
    checkedLabel,
    uncheckedLabel,
    onChange,
}) => {
    return (
        <div>
            <div className="relative mr-2 inline-block w-10 select-none align-middle transition duration-200 ease-in">
                <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className={`absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 bg-white ${
                        checked ? "right-0 border-green-400" : ""
                    }`}
                />
                <label
                    htmlFor="toggle"
                    className={`block h-6 cursor-pointer overflow-hidden rounded-full bg-gray-300 ${
                        checked ? "bg-green-400" : ""
                    }`}
                ></label>
            </div>
            <label htmlFor="toggle" className="text-xs text-gray-700">
                {checked ? checkedLabel : uncheckedLabel}
            </label>
        </div>
    );
};
