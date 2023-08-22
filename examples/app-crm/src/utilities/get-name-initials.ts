export const getNameInitials = ({
    name,
    count = 2,
}: {
    name: string;
    count?: number;
}) => {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");
    const filtered = initials.replace(/[^a-zA-Z]/g, "");
    return filtered.slice(0, count).toUpperCase();
};
