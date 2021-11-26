export type FeedBackCardTypes = {
    icon: React.ReactNode;
    type: string;
};

export type FeedBackType = "idea" | "issue" | "other" | "archive";

export interface IFeedback {
    id: string;
    description: string;
    page: string;
    user: string;
    type: FeedBackType;
    created_at: Date;
}

export interface IFeedbackFilterVariables {
    type: FeedBackType;
}
