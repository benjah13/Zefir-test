import { gql } from '@apollo/client';

const GET_ALL_USERS_QUERY = gql`
  query getAll{
	users{id, email, fib, anagrams}
 }
`;

export default GET_ALL_USERS_QUERY;
