import { gql } from "@apollo/client";

export default {
  Queries: {},
  Mutation: {
    createUsername: gql`
      mutation createUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
  Subscription: {},
};
