export const hasPermission = (
    permissions: string[],
    action: string,
): boolean => {
    return !!permissions.find((i) => i === action || i === "*");
};
