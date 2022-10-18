import { FieldErrors } from "@pankod/refine-react-hook-form";

type ErrorProps = {
    errors: FieldErrors<Record<string, string>>;
};

export const ErrorList: React.FC<ErrorProps> = ({ errors }) => {
    return (
        <ul className="error-messages">
            {Object.keys(errors).map((key) => {
                if (key === "ref") return null;
                return (
                    <li key={key}>
                        <>
                            {key} {errors[key as any] /* eslint-disable-line */ } 
                        </>
                    </li>
                );
            })}
        </ul>
    );
};
