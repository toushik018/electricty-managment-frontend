import { IConsumer, UserRole, UserStatus } from "@/types/user/user";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
import { IMeta } from "@/types";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getAllConsumers: build.query<{ consumers: IConsumer[]; meta: IMeta }, Record<string, any>>({
            query: (arg) => ({
                url: '/consumers',
                method: 'GET',
                params: arg,
            }),
            transformResponse: (response: { data: IConsumer[]; meta: IMeta }) => {
                const { meta } = response;
                return {
                    consumers: response.data,
                    meta,
                };
            },
            providesTags: [tagTypes.consumers],
        }),

        createConsumer: build.mutation<IConsumer, Partial<IConsumer>>({
            query: (consumerData) => ({
                url: "/consumers/register",
                method: "POST",
                data: consumerData,
            }),
            invalidatesTags: [tagTypes.consumers],
        }),

        getMyProfile: build.query({
            query: () => ({
                url: "/profile/me",
                method: "GET",
            }),
            providesTags: [tagTypes.consumers],
        }),
        updateProfile: build.mutation({
            query: (data) => {
                return {
                    url: "/consumers/update",
                    method: "PUT",
                    data: data,
                };
            },
            invalidatesTags: [tagTypes.consumers],
        }),

        addConsumption: build.mutation<void, { consumerId: string; units: number }>({
            query: ({ consumerId, units }) => {
                return {
                    url: `/consumers/add-consumption`,
                    method: "POST",
                    data: { consumerId, units },
                }
            },
            invalidatesTags: [tagTypes.consumers],
        }),
        payBill: build.mutation({
            query: ({ amount }) => ({
                url: '/consumers/pay-bill',
                method: 'POST',
                data: { amount },
            }),
            invalidatesTags: [tagTypes.consumers],
        }),


        billCheck: build.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: [tagTypes.consumers],
        }),
        getStats: build.query({
            query: () => ({
                url: "/admin/stats",
                method: "GET",
            }),
            providesTags: [tagTypes.consumers],
        }),

        getMonthlyBill: build.query({
            query: () => ({
                url: '/consumers/monthly-bill',
                method: 'GET',
            }),
            providesTags: [tagTypes.consumers],
        }),

    }),
});

export const { useGetAllConsumersQuery,
    useGetMyProfileQuery,
    useUpdateProfileMutation,
    useAddConsumptionMutation,
    useGetStatsQuery,
    useGetMonthlyBillQuery,
    usePayBillMutation,
    useCreateConsumerMutation

} = userApi;
