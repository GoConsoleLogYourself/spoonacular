import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRecipe } from "../../models/IRecipe";
import { IRecipeInfo } from "../../models/IRecipeInfo";

const API_KEY = "39a4940325db42e88d0c8419b6794656";
interface IResponse {
  totalResults: number;
  number: number;
  offset: number;
}
interface IRecipeResponse extends IResponse {
  results: IRecipe[];
}

export const recipesService = createApi({
  reducerPath: "recipesService",
  tagTypes: ["recipes"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spoonacular.com/recipes",
  }),
  endpoints: builder => ({
    getRecipes: builder.query<
      IRecipeResponse,
      { query: string; number: number; offset: number }
    >({
      query: ({ query, number, offset }) =>
        `/complexSearch?query=${query}&number=${number}&offset=${offset}&apiKey=${API_KEY}`,
      extraOptions: {
        maxRetries: 3,
      },
      providesTags: result =>
        result && result.results.length > 0
          ? [
              ...result.results.map(({ id }) => ({
                type: "recipes" as const,
                id,
              })),
              { type: "recipes", id: "LIST" },
            ]
          : [{ type: "recipes", id: "LIST" }],
    }),
    getRecipeInfo: builder.query<IRecipeInfo, number>({
      query: id => `/${id}/information?apiKey=${API_KEY}`,
      providesTags: result =>
        result
          ? [
              { type: "recipes" as const, id: result.id },
              { type: "recipes", id: "LIST" },
            ]
          : [{ type: "recipes", id: "LIST" }],
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeInfoQuery } = recipesService;
