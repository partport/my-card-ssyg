import { SongsType, FaunaCreateSongType } from "./../../constants/songs";
import {
  FaunaCreateThemeType,
  ThemeCardType,
  ThemeType,
} from "@/constants/themes";
import { GraphQLClient, gql } from "graphql-request";

const CLIENT_SECRET =
  process.env.FAUNA_ADMIN_KEY || process.env.FAUNA_CLIENT_SECRET;
const FAUNA_GRAPHQL_BASE_URL = "https://graphql.fauna.com/graphql";

const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
  headers: {
    authorization: `Bearer ${CLIENT_SECRET}`,
  },
});

export const getAllThemes = async () => {
  const query = gql`
    query getAllThemes {
      allThemes(_size: 9999) {
        data {
          _id
          order
          name
          type
          cards
          length
          artist {
            name
          }
        }
      }
    }
  `;

  const {
    allThemes: { data },
  } = await graphQLClient.request(query);

  return data.map((item: any) => {
    return {
      _id: item._id,
      order: item.order,
      name: item.name,
      type: item.type,
      cards: item.cards,
      length: item.length,
      artist: item.artist.name,
    };
  });
};

export const createThemes = async (newTheme: FaunaCreateThemeType) => {
  const ThemesInput = {
    input: newTheme,
  };
  const mutation = gql`
    mutation createThemes($input: ThemesInput!) {
      createThemes(data: $input) {
        _id
        order
        name
        type
        artist {
          name
          _id
        }
        length
        cards
      }
    }
  `;

  try {
    const { createThemes } = await graphQLClient.request(mutation, ThemesInput);
    return createThemes;
  } catch (error) {
    const errorResponse = JSON.stringify(error, undefined, 2);
    console.error(errorResponse);

    return error;
  }
};

export const updateThemeCard = async (
  id: string,
  data: { order: number; name: string; cards: Array<string> }
) => {
  const ThemesInput = {
    id,
    data,
  };
  console.info(ThemesInput);
  const mutation = gql`
    mutation updateThemes($id: ID!, $data: ThemesInput!) {
      updateThemes(id: $id, data: $data) {
        name
        cards
        order
      }
    }
  `;

  try {
    const { updateThemes } = await graphQLClient.request(mutation, ThemesInput);
    return updateThemes;
  } catch (error) {
    const errorResponse = JSON.stringify(error, undefined, 2);
    console.error(errorResponse);

    return error;
  }
};

export const getAllGroups = async () => {
  const query = gql`
    query getAllGroups {
      allGroups(_size: 100) {
        data {
          _id
          name
          card_position
        }
      }
    }
  `;

  const {
    allGroups: { data },
  } = await graphQLClient.request(query);

  return data.map((item: any) => {
    return {
      _id: item._id,
      name: item.name,
      cardPosition: item.card_position,
    };
  });
};

export const listThemeByGroup = async (id: string) => {
  const groupId = {
    input: id,
  };
  const query = gql`
    query listThemeByGroup($input: String!) {
      listThemeByGroup(id: $input) {
        data {
          _id
          order
          name
          type
          cards
          length
          artist {
            name
          }
        }
      }
    }
  `;
  try {
    const {
      listThemeByGroup: { data },
    } = await graphQLClient.request(query, groupId);

    return data.map((item: any) => {
      return {
        _id: item._id,
        order: item.order,
        name: item.name,
        type: item.type,
        cards: item.cards,
        length: item.length,
        artist: item.artist.name,
      };
    });
  } catch (error) {
    const errorResponse = JSON.stringify(error, undefined, 2);
    console.error(errorResponse);

    return error;
  }
};

export const deleteThemeCard = async (id: string) => {
  const ThemesInput = {
    id,
  };

  const mutation = gql`
    mutation deleteThemeCard($id: ID!) {
      deleteThemes(id: $id) {
        _id
        name
        artist {
          name
        }
      }
    }
  `;

  try {
    const { deleteThemes } = await graphQLClient.request(mutation, ThemesInput);
    return deleteThemes;
  } catch (error) {
    const errorResponse = JSON.stringify(error, undefined, 2);
    console.error(errorResponse);

    return error;
  }
};

export const getAllSongs = async () => {
  const query = gql`
    query getAllSongs {
      allSongs(_size: 500) {
        data {
          _id
          title
          album
          track
          release_date
          length
          notes
          artist {
            name
          }
        }
      }
    }
  `;

  const {
    allSongs: { data },
  } = await graphQLClient.request(query);

  return data.map((item: any) => {
    return {
      _id: item._id,
      title: item.title,
      album: item.album,
      track: item.track,
      releaseDate: item.release_date,
      length: item.length,
      notes: item.notes,
      artist: item.artist.name,
    };
  });
};

export const createSongs = async (newSong: FaunaCreateSongType) => {
  const SongsInput = {
    input: Object.assign(newSong, {
      key: `${newSong.title} - ${newSong.album}`,
    }),
  };

  const mutation = gql`
    mutation createSongs($input: SongsInput!) {
      createSongs(data: $input) {
        _id
        key
        title
        album
        track
        release_date
        length
        notes
        artist {
          name
        }
      }
    }
  `;

  try {
    const { createSongs } = await graphQLClient.request(mutation, SongsInput);
    return createSongs;
  } catch (error) {
    const errorResponse = JSON.stringify(error, undefined, 2);
    console.error(errorResponse);

    return error;
  }
};

export const putEntry = async (
  path: string,
  payload: {
    status: "UPDATE" | "CREATE" | "DELETE";
    data:
      | Pick<ThemeType, "order" | "name" | "cards">
      | FaunaCreateThemeType
      | Pick<ThemeType, "_id">
      | FaunaCreateSongType;
  }
) => {
  return fetch(path, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
};
