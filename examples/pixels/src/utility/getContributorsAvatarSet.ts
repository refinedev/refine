import { Pixel } from "types/pixel";

export const getContributorsAvatarSet = (pixels: Pixel[] | undefined) => {
    const contributorsAvatar: any = pixels?.map(
        (pixel: Pixel) => pixel?.users?.avatar_url,
    );
    const contributorsAvatarSet = new Set(contributorsAvatar);

    return [...contributorsAvatarSet];
};
