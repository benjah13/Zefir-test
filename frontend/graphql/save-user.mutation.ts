import { gql } from '@apollo/client';

const SAVE_USER_MUTATION = gql`
  mutation saveUser(
    $email: String!
  ) {
    saveUser(input: { email: $email }) {
      success
    }
  }
`;

export default SAVE_USER_MUTATION;
