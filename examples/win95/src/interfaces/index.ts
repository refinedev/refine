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

export type IExendedMember = IMember & {
  rentals: IRental[];
};

export type ITMDBMovieResponse = {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Array<{ id: number; name: string }>;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string | null;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: Array<{
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      job: string;
    }>;
    crew: Array<{
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      job: string;
    }>;
  };
  videos: {
    results: Array<{
      name: string;
      key: string;
      site: string;
      type: string;
      id: string;
    }>;
  };
};
