type ArticleListProps = {
    author: string;
    image: string;
    title: string;
    description: string;
    tagList?: string[];
};

export const ArticleList: React.FC<ArticleListProps> = ({
    author,
    image,
    title,
    description,
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
                    <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 32
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
