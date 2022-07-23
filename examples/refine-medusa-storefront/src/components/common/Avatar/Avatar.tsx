import { useGetIdentity } from "@pankod/refine-core";
import { FC, useRef } from "react";

interface Props {
    className?: string;
    children?: any;
}

const Avatar: FC<Props> = ({}) => {
    const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const { data } = useGetIdentity();

    return (
        <div
            ref={ref}
            className="inline-block h-8 w-8 rounded-full border-2 border-primary hover:border-secondary focus:border-secondary transition-colors ease-linear"
        >
            {/* <img */}
        </div>
    );
};

export default Avatar;
