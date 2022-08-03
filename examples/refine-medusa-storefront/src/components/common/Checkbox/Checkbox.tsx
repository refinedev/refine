type CheckboxProps = {
    checked?: boolean;
    onChange?: () => void;
    label: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
    checked = false,
    onChange,
    label,
}) => {
    return (
        <button
            className="text-accent-7 flex items-center gap-x-2"
            role="checkbox"
            type="button"
            aria-checked={checked}
            onClick={onChange}
        >
            <div
                role="checkbox"
                aria-checked={checked}
                className="border-accent-2 flex h-5 w-5 items-center justify-center border"
            >
                {checked ? "✓" : null}
            </div>
            <span>{label}</span>
        </button>
    );
};

export default Checkbox;
