import routerProvider from "@pankod/refine-react-router-v6";

const { Link } = routerProvider;

type ArticleListProps = {
    slug: string;
    author: string;
    image: string;
    title: string;
    description: string;
    createdAt: string;
    favCount: number;
    tagList?: string[];
    favArticle: (slug: string) => void;
    isItemFavorited: boolean;
    isItemLoading?: boolean;
};

export const ArticleList: React.FC<ArticleListProps> = ({
    slug,
    author,
    image,
    title,
    description,
    createdAt,
    favCount,
    tagList,
    favArticle,
    isItemFavorited,
    isItemLoading,
}) => {
    return (
        <div className="article-preview">
            <div className="article-meta">
                <Link to={`/profile/@${author}`}>
                    <img src={image} />
                </Link>
                <div className="info">
                    <Link to={`/profile/@${author}`} className="author">
                        {author}
                    </Link>
                    <span className="date">{createdAt}</span>
                </div>
                <button
                    className={`${
                        !isItemFavorited
                            ? "btn btn-outline-primary btn-sm pull-xs-right"
                            : "btn btn-primary btn-sm pull-xs-right"
                    } ${isItemLoading ? "disabled" : ""}`}
                    onClick={() => {
                        favArticle(slug);
                    }}
                >
                    <i className="ion-heart"></i> {favCount}
                </button>
            </div>
            <Link to={`/article/${slug}`} className="preview-link">
                <h1>{title}</h1>
                <p>{description}</p>
                <span>Read more...</span>
                <ul className="tag-list">
                    {tagList &&
                        tagList.map((tag, index) => {
                            return (
                                <li
                                    key={index}
                                    className="tag-default tag-pill tag-outline"
                                >
                                    {tag}
                                </li>
                            );
                        })}
                </ul>
            </Link>
        </div>
    );
};
