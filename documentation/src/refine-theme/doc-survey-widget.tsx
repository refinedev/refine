import clsx from "clsx";
import React, { SVGProps, useState } from "react";
import { useLocation } from "@docusaurus/router";
import { EmojiCryingFace } from "./icons/emoji-crying-face";
import { EmojiSadFace } from "./icons/emoji-sad-face";
import { EmojiNeutralFace } from "./icons/emoji-neutral-face";
import { EmojiSlightlySimilingFace } from "./icons/emoji-slightly-smiling-face";
import { EmojiStarStructFace } from "./icons/emoji-star-struct-face";

type Props = {
    className?: string;
};

// users can submit rating(numbers displaying as a emoji) feedback and besides that they can also submit optional text feedback
// if they submit rating feedback, we show the text feedback input
// after they submit text feedback, we show a thank you message
export const DocSurveyWidget = ({ className }: Props) => {
    const location = useLocation();
    // users can change their rating feedback, so we need to keep track of the survey response
    const [survey, setSurvey] = useState<DocSurveyResponse | null>(null);
    // if the user submits rating feedback, we show the text feedback input
    const [isSurveyTextVisible, setIsSurveyTextVisible] = useState(false);
    // if the user submits text feedback, we show a thank you message
    const [isFinished, setIsFinished] = useState(false);
    // the user can change their rating feedback, so we need to keep track of the selected option
    const [selectedOption, setSelectedOption] = useState<SurveyOption | null>(
        null,
    );

    const handleSurveyOptionClick = async (option: SurveyOption) => {
        setSelectedOption(option);
        setIsSurveyTextVisible(true);

        if (survey) {
            const data = await updateSurvey({
                surveyId: survey.id,
                body: { response: option },
            });
            if (!data) return;
            setSurvey(data);
        } else {
            const data = await createSurvey({
                body: {
                    response: option,
                    entityId: location.pathname,
                },
            });
            if (!data) return;
            setSurvey(data);
        }
    };

    const handleSurveyTextSubmit = async (text: string) => {
        if (text.trim() === "") {
            return;
        }

        const data = await updateSurvey({
            surveyId: survey.id,
            body: { response: selectedOption },
        });
        if (!data) return;

        setSurvey(data);
        // when the user submits text feedback, we show a thank you message
        setIsFinished(true);

        // reset the survey after N seconds so that the user can submit another survey
        setTimeout(() => {
            setSelectedOption(null);
            setSurvey(null);
            setIsFinished(false);
            setIsSurveyTextVisible(false);
        }, 3000);
    };

    return (
        <div
            className={clsx(
                "w-full max-w-[432px]",
                "flex flex-col",
                "p-4",
                "dark:bg-gray-800",
                "bg-gray-100",
                "border dark:border-gray-700 border-transparent",
                "rounded-[28px]",
                (isSurveyTextVisible || isFinished) && "h-[240px]",
                !isSurveyTextVisible && !isFinished && "h-[56px]",
                "transition-all duration-200 ease-in-out",
                "overflow-hidden",
                className,
            )}
        >
            {isFinished ? (
                <SurveyFinished selectedOption={selectedOption} />
            ) : (
                <>
                    <SurveyOptions
                        className={clsx("sm:pl-4")}
                        options={surveyOptions}
                        selectedOption={selectedOption}
                        onOptionClick={handleSurveyOptionClick}
                    />
                    {isSurveyTextVisible && (
                        <SurveyText
                            className={clsx(
                                "w-full",
                                "mt-4",
                                isSurveyTextVisible && "h-[128px] block",
                                !isSurveyTextVisible && "h-[0px] hidden",
                                "transition-all duration-200 ease-in-out",
                            )}
                            onSubmit={handleSurveyTextSubmit}
                        />
                    )}
                </>
            )}
        </div>
    );
};

const SurveyOptions = (props: {
    className?: string;
    options: {
        value: SurveyOption;
        icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }[];
    selectedOption: SurveyOption | null;
    onOptionClick: (option: SurveyOption) => void;
}) => {
    const hasSelectedOption = !!props.selectedOption;

    return (
        <div
            className={clsx(
                "w-full",
                "flex",
                "items-center justify-between",
                "gap-2",
                props.className,
            )}
        >
            <div
                className={clsx("dark:text-gray-300 text-gray-600", "text-sm")}
            >
                Was this helpful?
            </div>
            <div className={clsx("flex", "items-center", "gap-3")}>
                {props.options.map(({ value, icon: Icon }) => {
                    const isSelected = props.selectedOption === value;

                    return (
                        <button
                            key={value}
                            onClick={() => props.onOptionClick(value)}
                        >
                            <Icon
                                className={clsx(
                                    "flex-shrink-0",
                                    isSelected && "mix-blend-normal",
                                    isSelected && "scale-[1.33]",
                                    !isSelected && "mix-blend-luminosity",
                                    !isSelected &&
                                        hasSelectedOption &&
                                        "opacity-50",
                                    "transition-all duration-200 ease-in-out",
                                )}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const SurveyText = (props: {
    className?: string;
    onSubmit: (text: string) => void;
}) => {
    const [text, setText] = useState("");
    return (
        <form
            className={clsx(
                "w-full",
                "h-full",
                "flex",
                "flex-col",
                props.className,
            )}
            onSubmit={(e) => {
                e.preventDefault();
                props.onSubmit(text);
            }}
        >
            <textarea
                name="survey-text"
                required
                className={clsx(
                    "w-full",
                    "h-32",
                    "p-4",
                    "text-sm",
                    "dark:placeholder-gray-500 placeholder-gray-400",
                    "dark:text-gray-500 text-gray-400",
                    "dark:bg-gray-900 bg-white",
                    "border",
                    "dark:border-gray-700",
                    "border-gray-300",
                    "rounded-lg",
                    "resize-none",
                )}
                placeholder="Your emoji tells us how you feel. If you have any additional thoughts or suggestions, we'd love to hear them!"
                value={text}
                onChange={(e) => {
                    setText(e.currentTarget.value);
                }}
            />
            <div
                className={clsx("flex", "items-center", "justify-end", "mt-2")}
            >
                <button
                    type="submit"
                    className={clsx(
                        "w-20 h-8",
                        "text-xs",
                        "text-white ",
                        "bg-gray-600",
                        "border",
                        "border-transparent",
                        "rounded-full",
                    )}
                >
                    Send
                </button>
            </div>
        </form>
    );
};

const SurveyFinished = (props: {
    className?: string;
    selectedOption: SurveyOption | null;
}) => {
    const option = surveyOptions.find(
        (option) => option.value === props.selectedOption,
    );
    const OptionIcon = option?.icon;

    return (
        <div
            className={clsx(
                "flex",
                "flex-col",
                "items-center",
                "justify-center",
                "h-full",
                "dark:text-white text-gray-800",
                props.className,
            )}
        >
            {OptionIcon && <OptionIcon className={clsx("block", "w-8 h-8")} />}
            <div className={clsx("mt-6")}>Thank you!</div>
            <div className={clsx("mt-1")}>Your feedback has been recieved.</div>
        </div>
    );
};

const createSurvey = async ({ body }: { body: DocSurveyCreateDto }) => {
    const response = await fetch(
        "https://develop.cloud.refine.dev/.refine/surveys/documentation-pages-survey/responses",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    );

    if (!response.ok) {
        return null;
    }

    const data: DocSurveyResponse = await response.json();
    return data;
};

const updateSurvey = async ({
    surveyId,
    body,
}: {
    surveyId?: string;
    body: DocSurveyUpdateDto;
}) => {
    const response = await fetch(
        `https://develop.cloud.refine.dev/.refine/surveys/documentation-pages-survey/responses/${surveyId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    );

    if (!response.ok) {
        return null;
    }

    const data: DocSurveyResponse = await response.json();
    return data;
};

const surveyOptions: {
    value: SurveyOption;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}[] = [
    {
        value: 1,
        icon: (props: SVGProps<SVGSVGElement>) => (
            <EmojiCryingFace {...props} />
        ),
    },
    {
        value: 2,
        icon: (props: SVGProps<SVGSVGElement>) => <EmojiSadFace {...props} />,
    },
    {
        value: 3,
        icon: (props: SVGProps<SVGSVGElement>) => (
            <EmojiNeutralFace {...props} />
        ),
    },
    {
        value: 4,
        icon: (props: SVGProps<SVGSVGElement>) => (
            <EmojiSlightlySimilingFace {...props} />
        ),
    },
    {
        value: 5,
        icon: (props: SVGProps<SVGSVGElement>) => (
            <EmojiStarStructFace {...props} />
        ),
    },
];

export type SurveyOption = 1 | 2 | 3 | 4 | 5;

export type Survey = {
    id: string;
    name: string;
    slug: string;
    options: SurveyOption[];
    source: string;
    entityType: string;
    surveyType: string;
    createdAt: string;
    updatedAt: string;
};

export type IDocSurveyContext = {
    survey: Survey;
};

export type DocSurveyCreateDto = {
    response: number;
    entityId: string;
    responseText?: string;
    metaData?: SurveyMetaData;
};

export type DocSurveyUpdateDto = {
    response: number;
    responseText?: string;
    metaData?: SurveyMetaData;
};

export type DocSurveyResponse = {
    response: number;
    entityId: string;
    survey: Survey;
    responseText?: string | null;
    metaData: SurveyMetaData;
    id: string;
    createdAt: string;
    updatedAt: string;
};

export type SurveyMetaData = Record<string, any>;
