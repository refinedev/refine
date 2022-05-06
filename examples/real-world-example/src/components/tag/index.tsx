import routerProvider from "@pankod/refine-react-router-v6";

type TagProps = {
    tags: string[][] | undefined;
};

const { Link } = routerProvider;

export const Tag: React.FC<TagProps> = ({ tags }) => {
    return (
        <div className="col-md-3">
            <div className="sidebar">
                <p>Popular Tags</p>
                {!tags && <p>Loading tags...</p>}
                <div className="tag-list">
                    {tags?.map((item, index: number) => {
                        return (
                            <Link
                                key={index}
                                to="/"
                                className="tag-pill tag-default"
                            >
                                {item}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
