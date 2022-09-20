import { ThemeCardType } from '@/constants/themes';
import themes_db from './json/themes.json';
import groups_db from './json/groups.json';
import songs_db from './json/songs.json';

const getAllThemes = () => {
  return themes_db.map(({ _id, order, name, type, cards, length, artist }) => {
    return {
      _id,
      name,
      order,
      type: type as ThemeCardType,
      cards,
      length,
      artist,
    };
  });
};

const findThemeByGroupId = (id: string) => {
  const group = groups_db.find((x) => x._id === id);
  return getAllThemes().filter(({ artist }) => artist === group?.name);
};

export const themesDB = {
  getAllThemes,
  findThemeByGroupId,
};

export const groupDB = {
  getAll: () => groups_db,
};

export const songDB = {
  getAll: () =>
    songs_db.map((item) => {
      const artistId = groups_db.find((x) => x.name === item.artist)?._id;
      return {
        artist: item.artist,
        artist_connect: artistId,
        title: item.title,
        album: item.album,
        track: parseInt(item.track),
        release_date: item.release_date,
        length: parseInt(item.length) | 0,
        notes: parseInt(item.notes) | 0,
      };
    }),
};
