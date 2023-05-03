export interface IDocumentTitleContext {
    title: string;
    updateTitle: (title: string, pathname: string, priority?: 0 | 1) => void;
}
