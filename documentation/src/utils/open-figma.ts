export const openFigma = () => {
    return window
        .open(
            "https://www.figma.com/file/y8lhTyumAN0zYI5nKKLoLN/refine.dev-brand-assets",
            "_blank",
        )
        ?.focus();
};
