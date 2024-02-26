import Link from "next/link";

export type CategoryCardProps = {
  id: number;
  title: string;
  backgroundImg?: string;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  title,
  backgroundImg = "https://images.unsplash.com/photo-1595475207225-428b62bda831?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
}) => {
  return (
    <Link
      className="h-60 w-full overflow-hidden p-2 md:w-1/3"
      href={{
        pathname: "/[id]/[category]",
        query: { id, category: encodeURIComponent(title) },
      }}
    >
      <div
        className="flex h-full items-center justify-center rounded-lg bg-cover bg-center shadow-md transition-opacity duration-300 hover:opacity-95"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImg})`,
        }}
      >
        <div className="text-5xl font-extrabold uppercase text-white md:text-4xl lg:text-5xl">
          {title}
        </div>
      </div>
    </Link>
  );
};
