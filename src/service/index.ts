import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FullUser, User } from "./types";
import { cacher } from "../rtkQueryCacheUtils";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/"
  }),
  // global configuration for the api
  keepUnusedDataFor: 30,
  tagTypes: [...cacher.defaultTags, "User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], number>({
      query: (count) => `users?_start=0&_end=${count}`,
      providesTags: cacher.providesList("User"),
      // configuration for an individual endpoint, overriding the api setting
      keepUnusedDataFor: 5,
      transformResponse: (response: FullUser[]) => {
        const simpleUsers: User[] = response.map(({ id, name }) => ({
          id,
          name
        }));
        return simpleUsers;
      }
    })
  })
});

export const { useGetUsersQuery } = api;
