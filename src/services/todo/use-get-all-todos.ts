import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "../../utility/server";
import { TParams } from "../../types/global";
import { IOutput } from "../../types/todo";

type TUseGetTodosQuery = {
  todos: IOutput["data"]["items"] | undefined;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isFetched: boolean;
  refetch: () => Promise<unknown>;
};

const getAllTodos = (params?: TParams) =>
  api.get("/todos", {
    params,
  });

export const useGetTodosQuery = (params?: TParams): TUseGetTodosQuery => {
  const { isError, isLoading, data, isSuccess, refetch, isFetched } = useQuery<
    AxiosResponse<IOutput["data"]["items"]>
  >({
    queryKey: ["todos"],
    queryFn: () => getAllTodos(params),
  });

  return {
    todos: data?.data,
    isError,
    isLoading,
    isSuccess,
    isFetched,
    refetch,
  };
};

export default useGetTodosQuery;
