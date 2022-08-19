import { IconProps } from "src/types/icon";

export const Bag: React.FC<IconProps> = ({ ...props }) => {
    return (
        <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            stroke="currentColor"
            {...props}
        >
            <path
                d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1 5H19"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
