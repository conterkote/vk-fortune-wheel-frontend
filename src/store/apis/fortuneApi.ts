import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
  IAuthorizeResponse,
  IBalanceResponse,
  IJackpotResponse,
  ISpinResponse,
  IUserData,
  IUserDataResponse, IWinner
} from "../../models";

export function isWinnerMessage(message : IWinner | IWinner[]): message is IWinner {
  if (typeof message === 'object' && message) {
    return Object(message).hasOwnProperty('first_name')
  } else return false
}

const fortuneApi = createApi({
  reducerPath : "fortuneApi",
  baseQuery : fetchBaseQuery({
    baseUrl : "https://vk-backend.onrender.com/",
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
    fetchWinners : builder.query<IWinner[] | IWinner, void>({
      query : () => ({
        url : "v1/winners/latest",
        method : "GET",
      }),
      async onCacheEntryAdded(arg, {updateCachedData, cacheDataLoaded, cacheEntryRemoved}) {
        const ws = new WebSocket('ws://localhost:3001/winners')
        try {
          await cacheDataLoaded;
          ws.onopen = () => {
            console.log('webSocket is opened')
          }

          const listener = (e: MessageEvent) => {
            console.log(e)
            const parsedData: IWinner = JSON.parse(e.data);
            if (isWinnerMessage(parsedData)) {
              updateCachedData(() => {
                return parsedData
              })
            }
          }
          ws.addEventListener('message', listener)
        } catch (e) {
          console.warn('WebSocket', e)
        }
        await cacheEntryRemoved;
        ws.close()
      }
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

export const { useAuthorizeMutation, useFetchWinnersQuery, useFetchBalanceQuery, useFetchJackpotQuery } = fortuneApi

export default fortuneApi