import { AxiosError } from "axios";
import { KeyboardEvent, ReactNode } from "react";

export type Element = React.JSX.Element;

export type Children = {
  children: ReactNode;
};

export type TKeyUp = KeyboardEvent<HTMLInputElement>;

export type TCommonOutput<T> = {
  data: {
    items: T;
  };
  loading: boolean;
  error: AxiosError<string, string> | null;
};

export type TParams = {
  _page?: number;
  _limit?: number;
  q?: string;
};
