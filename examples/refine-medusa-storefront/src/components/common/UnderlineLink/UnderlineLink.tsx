import { ArrowRight } from "@icons";
import Link from "next/link";

type UnderlineLinkProps = {
    href: string;
    children?: React.ReactNode;
};

const UnderlineLink: React.FC<UnderlineLinkProps> = ({
    href,
    children,
}: UnderlineLinkProps) => {
    return (
        <div className="flex items-start">
            <Link href={href}>
                <a className="flex items-center text-large-regular border-b border-current gap-x-4 py-2 transition-all duration-300 group hover:pl-4 hover:pr-1">
                    <span>{children}</span>
                    <ArrowRight
                        size={20}
                        className="transition-all group-hover:ml-2 duration-300"
                    />
                </a>
            </Link>
        </div>
    );
};

export default UnderlineLink;
