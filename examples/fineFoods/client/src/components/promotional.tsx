import Link from "next/link";

export const Promotional: React.FC = () => {
    return (
        <div className="flex gap-4 flex-wrap md:flex-nowrap items-center justify-center md:justify-between px-2 sm:px-0">
            <div className="flex flex-col gap-8">
                <div className=" text-white">
                    <h1 className="text-5xl md:shrink-0 lg:text-7xl font-bold lg:leading-[64px]">
                        Delight <br /> in every bite!
                    </h1>
                    <h3 className="text-3xl">
                        Delivering happiness,{" "}
                        <span className="underline underline-offset-4">
                            on time
                        </span>
                        .
                    </h3>
                </div>
                <Link href="/1/Starters">
                    <a className="w-48 bg-white hover:bg-gray-100 text-primary text-xl font-bold py-2 px-4 border border-white hover:border-primary rounded-md transition-all duration-300">
                        Explore Menu
                    </a>
                </Link>
            </div>
            <div>
                <img
                    className="w-full max-h-96"
                    src="./images/plate.png"
                    alt="Plate with pasta"
                />
            </div>
        </div>
    );
};
