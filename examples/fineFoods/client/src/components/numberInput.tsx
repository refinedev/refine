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
        <div className="relative overflow-hidden">
            <input
                className="focus:outline-primary focus:border-primary h-full w-16 rounded-md border py-2 pl-2 transition-colors"
                value={value}
                onChange={(event) => {
                    const parseNumber = Number(event.target.value);

                    if (parseNumber >= 0) {
                        setValue(Number(event.target.value));
                    }
                }}
            />
            <button className="absolute right-0.5 top-0 h-1/2 border border-t-0 border-r-0 transition-all hover:scale-95 active:bg-gray-50">
                <ChevronUpIcon
                    onClick={() =>
                        setValue((prev) => {
                            if (prev >= 0) {
                                return prev + 1;
                            }
                            return 0;
                        })
                    }
                    className="text-primary h-full w-4"
                />
            </button>
            <button className="absolute right-0.5 bottom-0 h-1/2 border border-b-0 border-r-0 transition-all hover:scale-95 active:bg-gray-50">
                <ChevronDownIcon
                    onClick={() =>
                        setValue((prev) => {
                            if (prev > 0) {
                                return prev - 1;
                            }
                            return 0;
                        })
                    }
                    className="text-primary h-full w-4"
                />
            </button>
        </div>
    );
};
