import { gql } from "@apollo/client";

export const GET_2019_DATA = gql`
  query Posts {
    allPosts {
      id
      title
      body
      createdAt
      author {
        id
        firstName
      }
    }
  }
`;
