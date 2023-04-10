import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
  IAuthorizeResponse,
  IBalanceResponse,
  IJackpotResponse,
  ISpinResponse,
  IUserData,
  IUserDataResponse
} from "../../models";

const fortuneApi = createApi({
  reducerPath : "fortuneApi",
  baseQuery : fetchBaseQuery({
    baseUrl : "http://localhost:3001/",
    credentials: "same-origin",
  }),
  endpoints : (builder) => ({
    authorize : builder.mutation<IAuthorizeResponse, IUserDataResponse>({
      query : (data) => ({
        url : "v1/users/authorize",
        method : "POST",
        body : {
          ...data
        }
      })
    }),
    spin : builder.mutation<ISpinResponse, IUserData>({
      query : (data) => ({
        url : "v1/wheel/spin",
        method : "POST",
        body : {
          ...data
        }
      })
    }),
    fetchBalance : builder.query<IBalanceResponse, IUserData>({
      query : (data) => ({
        url : "v1/users/balance",
        method : "POST",
        body : {
          ...data
        }
      })
    }),
    fetchJackpot : builder.query<IJackpotResponse, void>({
      query : () => ({
        url : "v1/wheel/jackpot",
        method : "GET",
      })
    })
  })
})

export const { useAuthorizeMutation, useSpinMutation, useFetchBalanceQuery, useFetchJackpotQuery } = fortuneApi

export default fortuneApi