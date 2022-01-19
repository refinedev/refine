import { ChevronUpIcon, ChevronDownIcon } from "../components/icons";

type NumberInputProps = {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
};

export const NumberInput: React.FC<NumberInputProps> = ({
    value,
    setValue,
}) => {
    return (
        <div className="relative overflow-hidden">
            <input
                className="pl-2 py-2 border w-16 rounded-md h-full focus:outline-primary focus:border-primary transition-colors"
                value={value}
                onChange={(event) => {
                    setValue(Number(event.target.value));
                }}
            />
            <button className="border border-t-0 border-r-0 absolute right-0.5 top-0 h-1/2 hover:scale-95 transition-all active:bg-gray-50">
                <ChevronUpIcon
                    onClick={() => setValue((prev) => prev + 1)}
                    className="text-primary w-4 h-full"
                />
            </button>
            <button className="border border-b-0 border-r-0 absolute right-0.5 bottom-0 h-1/2 hover:scale-95 transition-all active:bg-gray-50">
                <ChevronDownIcon
                    onClick={() => setValue((prev) => prev - 1)}
                    className="text-primary w-4 h-full"
                />
            </button>
        </div>
    );
};
