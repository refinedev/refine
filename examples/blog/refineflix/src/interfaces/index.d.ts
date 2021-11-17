export interface IMovies {
    id: string;
    name: string;
    description: string;
    preload: string;
    director: string;
    stars: string;
    premiere: string;
    trailer: string;
    images: IFile[];
}
