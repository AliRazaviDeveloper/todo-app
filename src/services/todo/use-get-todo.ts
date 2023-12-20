import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "../../utility/server";

const getTodo = (id: string) => api.get(`/todos/${id}`);

export const useGetTodoQuery = (id: string) => {
  const { isError, isLoading, data, isSuccess } = useQuery<AxiosResponse<any>>({
    queryKey: ["get-todos", id],
    queryFn: () => getTodo(id),
    enabled: !!id,
  });

  return {
    data: data?.data,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useGetTodoQuery;
