type ErrorProps = {
    errors: {}[];
};

export const ErrorList: React.FC<ErrorProps> = ({ errors }) => {
    return (
        <ul className="error-messages">
            {Object.keys(errors).map((key) => {
                if (key === "ref") return null;
                return (
                    <li key={key}>
                        {console.log("here is key!")}
                        {key} {errors[key as any]}
                    </li>
                );
            })}
        </ul>
    );
};
