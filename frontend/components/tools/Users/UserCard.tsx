import React from 'react';
import { UserType } from '../../../graphql/generated/graphql';

type UserCardProps = {
  user: UserType;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const anagrams = user.anagrams !== '' ? JSON.parse(user.anagrams) : {};
  return (
    <div className="items-center flex justify-between bg-white p-6 m-2 rounded-lg shadow-lg" key={user.id}>
      <p className="text-lg md:text-2xl font-bold mb-2 text-gray-800 w-[30%]">{user.email}</p>
      <p className="text-gray-700 text-lg md:text-2xl w-[10%]">{user.fib}</p>
      <div className="flex flex-row gap-4 flex-wrap justify-end w-[60%]">
        {Object.keys(anagrams).map((anagram) => (
          <div key={anagram}>
            {anagram}
            <span className="badge mb-3 bg-red-800 rounded-full px-2 py-1 text-center object-right-top text-white text-sm ml-1">
              {anagrams[anagram]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
