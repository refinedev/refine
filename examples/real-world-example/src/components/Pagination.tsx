type PaginationProps = {
    total: number;
    current: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<PaginationProps> = ({
    total,
    current,
    setCurrent,
}) => {
    return (
        <nav>
            <ul className="pagination">
                {[...Array(total)].map((_, index) => {
                    return (
                        <li
                            key={index}
                            className={`page-item${
                                current !== index + 1 ? "" : " active"
                            }`}
                        >
                            {total > 1 && (
                                <button
                                    className="page-link"
                                    onClick={() => {
                                        setCurrent(index + 1);
                                    }}
                                >
                                    {index + 1}
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
