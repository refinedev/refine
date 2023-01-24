import { ITitle } from "src/interfaces";

export const Title: React.FC<ITitle> = ({ title, language }) => {
    const appTitle = "Refine 🚀";

    const getPageTitle = (currentPageTitle: string, languageFlag: string) =>
        `${currentPageTitle} — ${appTitle} — ${languageFlag}`;

    return <title>{getPageTitle(title, language)}</title>;
};
