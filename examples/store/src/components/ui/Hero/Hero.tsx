import Link from "next/link";

import { Container } from "@components/ui";
import { ArrowRight } from "@components/icons";

import s from "./Hero.module.css";

interface HeroProps {
    className?: string;
    description: string;
}

export const Hero: React.FC<HeroProps> = ({ description }) => {
    return (
        <div className="bg-blue">
            <Container>
                <div className={s.root}>
                    <div className={s.headline}>
                        <div className={s.bold}>
                            <div className={s.regularTop}>
                                SHOW YOUR SUPPORT
                            </div>
                            proudly
                            <div className={s.regularBottom}>
                                IN A FANCY & STYLISH WAY
                            </div>
                        </div>
                    </div>
                    <div className={s.description}>
                        <p>{description}</p>
                        <Link
                            href="/search"
                            className="text-accent-0 w-max-content flex cursor-pointer items-center pt-3 font-bold hover:underline"
                        >
                            <>
                                SEE ALL
                                <ArrowRight
                                    width="20"
                                    height="20"
                                    className="ml-1"
                                />
                            </>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};
