import { useMutation } from 'react-query';
import { post } from './ApiService';
import { API } from '../config/config';

const UseIpInfo = (onSuccess, onError) => {
  const searchIp = async (ip) => {
    const response = await post(`${API}/ip`, {
      body: {
        ip,
      },
    });
    return response.data;
  };
  const {
    mutate, isError, isLoading, error,
  } = useMutation(
    'searchIp',
    (ip) => searchIp(ip),
    {
      onSuccess,
      onError,
    },
  );
  return {
    searchIp: (ip) => mutate(ip),
    isError,
    searchError: error,
    isLoading,
  };
};
export default UseIpInfo;
