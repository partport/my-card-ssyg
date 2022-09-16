import {
  FaunaCreateThemeType,
  ThemeCardType,
  ThemeType,
} from "@/constants/theme";
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
  // data.map((x) => {
  //   console.log({
  //     _id: x._id,
  //     order: x.order,
  //     name: x.name,
  //     type: x.type,
  //     cards: x.card as ThemeCardType,
  //     length: x.length,
  //     artist: x.artist,
  //   });
  // });
  return data;
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
  console.log(ThemesInput);
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

  return data;
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

    return data;
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

export const putEntry = async (
  path: string,
  payload: {
    status: "UPDATE" | "CREATE" | "DELETE";
    data:
      | Pick<ThemeType, "order" | "name" | "cards">
      | FaunaCreateThemeType
      | Pick<ThemeType, "_id">;
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