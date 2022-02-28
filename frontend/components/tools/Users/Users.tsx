import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UserCard from './UserCard';
import CreateUserForm from './CreateUserForm';
import Modal from '../Modal';
import { useGetAllQuery } from '../../../graphql/generated/graphql';

const Users: React.FC = () => {
  const { data, loading } = useGetAllQuery({
    variables: {},
    onError: (e) => toast.error(e.message),
  });

  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const displayTable = () => {
    if (data && data.users) {
      return data.users.length === 0 ? (
        <div className="px-6 text-lg">No users to display</div>
      ) : (
        data.users.map((user) => <UserCard user={user} />)
      );
    }
  };
  return (
    <>
      <div className="flex mt-10 mb-10 items-center justify-end mr-4 ">
        <button
          className=" bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowCreateUserModal(true)}
        >
          Create a user
        </button>
      </div>
      {loading && <p>...Loading...</p>}

      <div className="items-center flex justify-between bg-white p-6 m-2 rounded-lg shadow-lg">
        <p className="text-gray-800 text-lg md:text-2xl font-bold w-[30%]">EMAIL</p>
        <p className="text-gray-700 text-lg md:text-2xl font-bold w-[10%]">FIBONACCI</p>
        <p className="text-gray-700 text-lg md:text-2xl font-bold w-[60%] flex justify-end">ANAGRAMS</p>
      </div>
      {displayTable()}

      {showCreateUserModal ? (
        <Modal setShowModal={setShowCreateUserModal} modalTitle="Create a user">
          <CreateUserForm setShowModal={setShowCreateUserModal} />
        </Modal>
      ) : null}
    </>
  );
};

export default Users;
