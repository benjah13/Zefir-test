import { toast } from 'react-toastify';

const handleSuccess = (message: string): void => {
  toast.success(message);
};

export default handleSuccess;
