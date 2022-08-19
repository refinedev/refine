import React, { FC } from "react";
import { Container } from "@components/ui";
import { ArrowRight } from "@components/icons";
import s from "./Hero.module.css";
import Link from "next/link";
interface HeroProps {
    className?: string;
    description: string;
}

const Hero: FC<HeroProps> = ({ description }) => {
    return (
        <div className="bg-violet border-accent-2 border-b border-t">
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
                            href="/"
                            className="text-accent-0 w-max-content flex cursor-pointer items-center pt-3 font-bold hover:underline"
                        >
                            <>
                                Read it here
                                <ArrowRight
                                    width="20"
                                    heigh="20"
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

export default Hero;
