import * as Types from "@/interfaces";

export type ContactShowQueryVariables = Types.Exact<{
    id: Types.Scalars["ID"]["input"];
}>;

export type ContactShowQuery = {
    contact: {
        id: string;
        name: string;
        email: string;
        jobTitle?: string | null;
        phone?: string | null;
        timezone?: string | null;
        stage: Types.ContactStage;
        status: Types.ContactStatus;
        avatarUrl?: string | null;
        company: { id: string; name: string; avatarUrl?: string | null };
        salesOwner: { id: string; name: string; avatarUrl?: string | null };
    };
};
