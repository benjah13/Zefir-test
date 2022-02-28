import React, { ChangeEvent, useState } from 'react';

import { useSaveUserMutation } from '../../../graphql/generated/graphql';
import handleError from '../../../utils/handle-error';
import handleSuccess from '../../../utils/handle-success';
import loader from '../../../assets/loading.gif';

type CreateUserFormProps = {
  setShowModal: (showModal: boolean) => void;
};

const CreateUserForm: React.FC<CreateUserFormProps> = ({ setShowModal }) => {
  const [userEmail, setUserEmail] = useState('@zefir.fr');
  const [userEmailError, setUserEmailError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  let startCall = 0;
  let endCall = 0;

  const reset = () => {
    setUserEmail('');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmailError(false);
    setUserEmail(e.target.value);
  };

  const [triggerMutation, { client }] = useSaveUserMutation({
    onCompleted: () => {
      endCall = performance.now();
      setDisabled(false);
      client.resetStore();
      reset();
      handleSuccess(`User has been created in ${Math.floor(endCall - startCall) / 1000} s`);
      setShowModal(false);
    },
    onError: (error) => {
      handleError(error);
      setDisabled(false);
    },
  });

  const handleValidate = () => {
    let error = false;
    if (userEmail === '') {
      error = true;
      setUserEmailError(true);
    }

    if (!error) {
      startCall = performance.now();
      setDisabled(true);
      triggerMutation({
        variables: {
          email: userEmail,
        },
      });
    }
  };

  return (
    <div className="w-full max-w-lg p-10">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3 mb-2 md:mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            html-for="grid-first-name"
          >
            User email
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
              userEmailError ? 'border-red-300 bg-red-100' : ''
            }`}
            id="grid-first-name"
            type="text"
            value={userEmail}
            placeholder="User email"
            onChange={handleEmailChange}
          />
          {userEmailError && <div className="text-red-500">Email is mandatory</div>}
        </div>
      </div>

      <button
        onClick={handleValidate}
        disabled={disabled}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Create the user
      </button>
      {disabled && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex justify-center items-center">
          <img src={loader} alt="loading" className="w-8" />
        </div>
      )}
    </div>
  );
};

export default CreateUserForm;
