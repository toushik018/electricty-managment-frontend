import { ApiResponse, ResetPasswordResponse } from '@/types/response/response';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        changePassword: build.mutation({
            query: (data) => ({
                url: "/consumers/change-password",
                method: 'POST',
                contentType: 'application/json',
                data: data,
            }),
            invalidatesTags: [tagTypes.consumers],
        }),
     
    }),
});

export const {
    useChangePasswordMutation,
} = authApi;