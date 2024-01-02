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

export type DocSurveyDto = {
    response: number;
    entityId?: string;
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
