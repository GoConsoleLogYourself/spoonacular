import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBook } from "../../models/IBook";
import { IBookInfo } from "../../models/IBookInfo";

const API_KEY = "47d1d48e56ca49db9c7c07f56d52d390";
interface IResponse {
  available: number;
  number: number;
  offset: number;
  books: IBook[][];
}

export const booksService = createApi({
  reducerPath: "booksService",
  tagTypes: ["books"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.bigbookapi.com/",
  }),
  endpoints: builder => ({
    getBooks: builder.query<
      IResponse,
      { query: string; number: number; offset: number }
    >({
      query: ({ query, number, offset }) =>
        `search-books?query=${query}&number=${number}&offset=${offset}&api-key=${API_KEY}`,
      providesTags: result =>
        result
          ? [
              ...result.books.flat().map((book: IBook) => ({
                type: "books" as const,
                id: book.id?.toString(),
              })),
              { type: "books", id: "LIST" },
            ]
          : [{ type: "books", id: "LIST" }],
    }),
    getBookInfo: builder.query<IBookInfo, number>({
      query: id => `${id}?api-key=${API_KEY}`,
      providesTags: result =>
        result
          ? [
              { type: "books" as const, id: result.id },
              { type: "books", id: "LIST" },
            ]
          : [{ type: "books", id: "LIST" }],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookInfoQuery } = booksService;
