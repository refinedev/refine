import Link from "next/link";
import React from "react";

const Help: React.FC = () => {
    return (
        <div>
            <h2 className="text-base-semi">Need help?</h2>
            <div className="text-base-regular my-2">
                <ul className="flex flex-col gap-y-2">
                    <li>
                        <Link href="/contact">
                            <a>Contact</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <a>Returns & Exchanges</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Help;
