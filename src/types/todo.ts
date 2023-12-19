import { AxiosError, AxiosResponse } from "axios";
export enum STATUS_TODO {
  PENDING = "PENDING",
  DOING = "DOING",
  COMPLETE = "COMPLETE",
}
export interface ITodos {
  id: number;
  date: string;
  title: string;
  description: string;
  status: STATUS_TODO;
}
type TResponseModel = {
  items?: ITodos[];
  page: number;
  per_page: number;
  total: number;
};

export interface IOutput {
  data: TResponseModel;
  loading: boolean;
  error: AxiosError<string, string> | null;
}

export type TResponse = AxiosResponse<TResponseModel, ITodos>;

export interface IDeleteOutput {
  data: TResponseModel;
  loading: boolean;
  error: AxiosError<string, string> | null;
}
