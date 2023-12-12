import * as Types from "@/interfaces";

export type RefreshTokenMutationVariables = Types.Exact<{
    refreshToken: Types.Scalars["String"]["input"];
}>;

export type RefreshTokenMutation = {
    refreshToken: { accessToken: string; refreshToken: string };
};
