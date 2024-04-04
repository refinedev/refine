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

export type ITape = {
  id: number;
  created_at: string;
  title_id: number;
  available: boolean;
};

export type IRental = {
  id: number;
  member_id: number;
  period: number;
  created_at: string;
  start_at: string;
  expected_return_at: string;
  returned_at: string | null;
  title_id: number;
  tape_id: number;
};

export type IMember = {
  id: number;
  deposit: number;
  created_at: string;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  photo_url?: string;
};

export type IExtendedVideoTitle = IVideoTitle & {
  tapes: ITape[];
  rentals: IRental[];
};
