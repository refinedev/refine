import styles from "./Search.module.css";

export const Search = ({
    onChange,
}: {
    onChange: React.ChangeEventHandler;
}) => {
    return (
        <input
            className={styles.search}
            type="text"
            onChange={onChange}
            placeholder="Search by the title ..."
        />
    );
};
