type PaginationProps = {
    total: number | undefined;
    pageSize: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<PaginationProps> = ({
    total,
    pageSize,
    setCurrent,
}) => {
    return (
        <nav>
            <ul className="pagination">
                {[...Array(total ? Math.ceil(total / pageSize) : 1)].map(
                    (_, index) => {
                        return (
                            <li key={index} className="page-item">
                                <button
                                    className="page-link"
                                    onClick={() => {
                                        setCurrent(index + 1);
                                    }}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        );
                    },
                )}
            </ul>
        </nav>
    );
};
