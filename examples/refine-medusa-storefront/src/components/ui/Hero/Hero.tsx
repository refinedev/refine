import React, { FC } from "react";
import { Container } from "@components/ui";
import { ArrowRight } from "@components/icons";
import s from "./Hero.module.css";
import Link from "next/link";
interface HeroProps {
    className?: string;
    headline: string;
    description: string;
}

const Hero: FC<HeroProps> = ({ headline, description }) => {
    return (
        <div className="bg-accent-9 border-accent-2 border-b border-t">
            <Container>
                <div className={s.root}>
                    <h2 className={s.title}>{headline}</h2>
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
