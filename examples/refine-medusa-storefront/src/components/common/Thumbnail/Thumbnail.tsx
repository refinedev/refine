import { Image as MedusaImage } from "@medusajs/medusa";
import { PlaceholderImage } from "@icons";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

type ThumbnailProps = {
    thumbnail?: string | null;
    images?: MedusaImage[] | null;
    size?: "small" | "medium" | "large" | "full";
};

const Thumbnail: React.FC<ThumbnailProps> = ({
    thumbnail,
    images,
    size = "small",
}) => {
    const initialImage = thumbnail || images?.[0]?.url;

    return (
        <div
            className={clsx("relative aspect-[29/34]", {
                "w-[180px]": size === "small",
                "w-[290px]": size === "medium",
                "w-[440px]": size === "large",
                "w-full": size === "full",
            })}
        >
            <ImageOrPlaceholder image={initialImage} size={size} />
        </div>
    );
};

const ImageOrPlaceholder = ({
    image,
    size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
    return image ? (
        <Image
            src={image}
            alt="Thumbnail"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="absolute inset-0"
            draggable={false}
        />
    ) : (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gray-100">
            <PlaceholderImage size={size === "small" ? 16 : 24} />
        </div>
    );
};

export default Thumbnail;
