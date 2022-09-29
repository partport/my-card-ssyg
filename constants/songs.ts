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
export type SongsNewType = Omit<SongsType, "_id" | "artist"> & {
  artist: string;
};

export type FaunaCreateSongType = Omit<
  SongsType,
  "_id" | "artist" | "releaseDate"
> & {
  artist: { connect: string };
  release_date: Date;
};
