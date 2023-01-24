import { gql } from "@apollo/client";

export const GET_2019_DATA = gql`
  query getPostsByYear {
    allPosts(count: 100) {
      createdAt
      id
    }
  }
`;
