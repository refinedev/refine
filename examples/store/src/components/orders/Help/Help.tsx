import Link from "next/link";

export const Help: React.FC = () => {
    return (
        <div>
            <h2 className="text-base-semi">Need help?</h2>
            <div className="text-base-regular my-2">
                <ul className="flex flex-col gap-y-2">
                    <li>
                        <Link href="mailto:info@refine.dev">
                            <a>Contact</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="mailto:info@refine.dev">
                            <a>Returns & Exchanges</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
