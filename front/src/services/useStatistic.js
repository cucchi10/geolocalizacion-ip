import { useMutation } from 'react-query';
import { get } from './ApiService';
import { API } from '../config/config';

const useStatistic = (onSuccess, onError) => {
  const getStatistic = async () => {
    const response = await get(`${API}`);
    return response.data;
  };
  const {
    mutate, isError, isLoading, error,
  } = useMutation(
    'getStatistic',
    () => getStatistic(),
    {
      onSuccess,
      onError,
    },
  );
  return {
    getStatistic: () => mutate(),
    isError,
    searchError: error,
    isLoading,
  };
};
export default useStatistic;
