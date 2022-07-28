import { ChevronUpIcon, ChevronDownIcon } from "@components";

type NumberInputProps = {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
};

export const NumberInput: React.FC<NumberInputProps> = ({
    value,
    setValue,
}) => {
    return (
        <div className="relative flex items-center overflow-hidden">
            <button
                className="h-full rounded-tl-md rounded-bl-md border p-2 transition-all hover:bg-gray-50 active:bg-gray-50"
                onClick={() =>
                    setValue((prev) => {
                        if (prev > 0) {
                            return prev - 1;
                        }
                        return 0;
                    })
                }
            >
                <ChevronDownIcon className="text-primary h-4 w-4" />
            </button>
            <input
                className="focus:outline-primary focus:border-primary h-full w-8 border p-2 transition-colors"
                value={value}
                onChange={(event) => {
                    const parseNumber = Number(event.target.value);

                    if (parseNumber >= 0) {
                        setValue(Number(event.target.value));
                    }
                }}
            />
            <button
                className="h-full rounded-tr-md rounded-br-md border p-2 transition-all hover:bg-gray-50 active:bg-gray-50"
                onClick={() =>
                    setValue((prev) => {
                        if (prev >= 0) {
                            return prev + 1;
                        }
                        return 0;
                    })
                }
            >
                <ChevronUpIcon className="text-primary h-4 w-4" />
            </button>
        </div>
    );
};
