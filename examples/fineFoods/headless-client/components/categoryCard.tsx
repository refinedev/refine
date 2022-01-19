import Link from "next/link";

export type CategoryCardProps = {
    id: string;
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
            href={{
                pathname: "/[id]/[category]",
                query: { id, category: encodeURIComponent(title) },
            }}
        >
            <a className="w-full md:w-1/3 h-60 overflow-hidden p-2">
                <div
                    className="flex items-center justify-center bg-cover bg-center h-full rounded-lg shadow-md hover:opacity-95 transition-opacity duration-300"
                    style={{
                        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImg})`,
                    }}
                >
                    <div className="text-white text-5xl md:text-4xl lg:text-5xl font-extrabold uppercase">
                        {title}
                    </div>
                </div>
            </a>
        </Link>
    );
};
