export type UseCases = {
    route: string;
    thumbImgURL: string;
    title: string;
    description: string;
    companyDetails: {
        logo: string;
        title: string;
        user: {
            username: string;
            description: string;
            avatarURL: string;
        };
        message: string;
    };
    contents: {
        question: string;
        answer: string[];
    }[];
    assets: {
        type: string;
        url: string;
    }[];
};
