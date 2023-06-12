import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const socialApi = createApi({
  reducerPath: "socialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${window.location.hostname}:5001/`,
  }),
  endpoints: (builder) => ({
    getSocialData: builder.query<any, number>({
      query: (page: number) => `/post?page=${page}`,
    }),
    getFeed: builder.query<any, string>({
      query: (_id: string) => `/post/${_id}`,
    }),
  }),
});

export const { useGetSocialDataQuery, useGetFeedQuery } = socialApi;
