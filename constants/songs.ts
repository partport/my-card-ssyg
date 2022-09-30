export type SongsType = {
  _id: string;
  title: string;
  artist: string;
  album: string;
  track: number;
  releaseDate: Date;
  length: number;
  notes: number;
};
export type SongsNewType = Omit<SongsType, '_id' | 'artist'> & {
  artist: string;
};

export type FaunaCreateSongType = Omit<
  SongsType,
  '_id' | 'artist' | 'releaseDate'
> & {
  artist: { connect: string };
  release_date: Date;
};
export type FaunaUpdateSongType = Omit<SongsType, 'artist' | 'releaseDate'> & {
  release_date: Date;
};

export const SONG_STATUS_MANAGE = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
} as const;

export type SongStatusType =
  typeof SONG_STATUS_MANAGE[keyof typeof SONG_STATUS_MANAGE];
