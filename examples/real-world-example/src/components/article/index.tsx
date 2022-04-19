type ArticleListProps = {
    author: string;
    image: string;
    title: string;
    description: string;
    createdAt: string;
    favCount: number;
    tagList?: string[];
};

export const ArticleList: React.FC<ArticleListProps> = ({
    author,
    image,
    title,
    description,
    createdAt,
    favCount,
    tagList,
}) => {
    return (
        <div className="article-preview">
            <div className="article-meta">
                <a href="">
                    <img src={image} />
                </a>
                <div className="info">
                    <a href="" className="author">
                        {author}
                    </a>
                    <span className="date">{createdAt}</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> {favCount}
                </button>
            </div>
            <a href="" className="preview-link">
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
            </a>
        </div>
    );
};
