export type IVideoTitle = {
  id: number;
  created_at: string;
  tmdb_id: number;
  poster_path: string;
  trailer_key: string;
  title: string;
  genres: Array<string>;
  year: number;
  duration_minutes: number;
  director: string;
  cast: Array<string>;
  overview: string;
};
