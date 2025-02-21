import axios from 'axios';

const axiosPublic = axios.create({
    baseURL:import.meta.env.VITE_baseUrl,
  });
const useAxiosPublic = () => {
  console.log(import.meta.env.VITE_baseUrl)
  return axiosPublic;
}

export default useAxiosPublic;