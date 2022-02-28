import { toast } from 'react-toastify';

const handleError = (err: Error): void => {
  console.warn(err.message);
  toast.error(err.message);
};

export default handleError;
