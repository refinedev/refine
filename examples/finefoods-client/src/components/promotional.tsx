import Link from "next/link";

export const Promotional: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 px-2 sm:px-0 md:flex-nowrap md:justify-between">
      <div className="flex flex-col gap-8">
        <div className=" text-white">
          <h1 className="text-5xl font-bold md:shrink-0 lg:text-7xl lg:leading-[64px]">
            Delight <br /> in every bite!
          </h1>
          <h3 className="text-3xl">
            Delivering happiness,{" "}
            <span className="underline underline-offset-4">on time</span>.
          </h3>
        </div>
        <Link
          href="/1/Starters"
          className="text-primary hover:border-primary w-max rounded-md border border-white bg-white py-2 px-4 text-xl font-bold transition-all duration-300 hover:bg-gray-100"
        >
          Explore Menu
        </Link>
      </div>
      <div>
        <img
          className="max-h-96 w-full"
          src="./images/plate.png"
          alt="Plate with pasta"
        />
      </div>
    </div>
  );
};
